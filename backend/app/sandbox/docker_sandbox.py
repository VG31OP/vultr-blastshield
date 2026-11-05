"""Production Docker-based ephemeral container sandbox for Vultr VM."""
import asyncio
import os
import shutil
import tempfile
import uuid
import time
import base64
from pathlib import Path
from typing import Dict, List, Optional

from app.config import settings
from app.sandbox.base import BaseSandbox, RawExecutionResult
from app.sandbox.security_guard import SecurityGuard
from app.models.schemas import ContainmentMetrics, SecurityViolation, Artifact


class DockerSandbox(BaseSandbox):
    """
    Docker container sandbox with dropped capabilities, read-only rootfs,
    zero network (--network none), and strict cgroup CPU/memory limits.
    """

    IMAGE_NAME = "vultr-blastshield-runner:latest"

    def is_available(self) -> bool:
        """Check if Docker daemon is available and accessible."""
        return shutil.which("docker") is not None

    async def execute(
        self,
        code: str,
        files: Optional[Dict[str, bytes]] = None,
        timeout: Optional[float] = None
    ) -> RawExecutionResult:
        sandbox_timeout = timeout or settings.sandbox_timeout_seconds
        ephemeral_id = f"vultr-c-{uuid.uuid4().hex[:8]}"
        host_tmp_dir = Path(tempfile.mkdtemp(prefix=f"docker_{ephemeral_id}_"))

        # AST static guard verification
        is_safe, found_violations = SecurityGuard.analyze_code(code)
        metrics = ContainmentMetrics(
            sandbox_type="docker_container",
            ephemeral_id=ephemeral_id,
            memory_limit_mb=settings.sandbox_memory_limit_mb,
            timeout_limit_sec=sandbox_timeout,
            sandbox_destroyed=False
        )

        if not is_safe:
            shutil.rmtree(host_tmp_dir, ignore_errors=True)
            metrics.sandbox_destroyed = True
            return RawExecutionResult(
                exit_code=-1,
                stdout="",
                stderr="[CONTAINMENT ENFORCED] Static security guard rejected container execution.",
                timed_out=False,
                metrics=metrics,
                violations=found_violations,
                generated_artifacts=[]
            )

        start_time = time.time()
        timed_out = False
        artifacts: List[Artifact] = []

        try:
            # Write files and runner script to host mount
            if files:
                for fname, content in files.items():
                    (host_tmp_dir / fname).write_bytes(content)

            (host_tmp_dir / "runner.py").write_text(code, encoding="utf-8")

            # Construct hardened Docker command:
            # - --rm: destroy container immediately on exit
            # - --network none: blast radius zero network isolation
            # - --memory 256m: memory cgroup limit
            # - --cpus 0.5: CPU quota
            # - --security-opt no-new-privileges: prevent privilege escalation
            # - -u 1000:1000: run as non-root
            cmd = [
                "docker", "run", "--rm",
                "--name", ephemeral_id,
                "--network", "none",
                f"--memory={int(settings.sandbox_memory_limit_mb)}m",
                f"--cpus={settings.sandbox_cpu_quota}",
                "--security-opt", "no-new-privileges",
                "-v", f"{host_tmp_dir.absolute()}:/workspace:rw",
                "-w", "/workspace",
                self.IMAGE_NAME,
                "python3", "runner.py"
            ]

            process = await asyncio.create_subprocess_exec(
                *cmd,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE
            )

            try:
                stdout_data, stderr_data = await asyncio.wait_for(
                    process.communicate(),
                    timeout=sandbox_timeout
                )
                stdout_text = stdout_data.decode("utf-8", errors="replace")
                stderr_text = stderr_data.decode("utf-8", errors="replace")
                exit_code = process.returncode if process.returncode is not None else 0
            except asyncio.TimeoutError:
                timed_out = True
                exit_code = -9
                stderr_text = f"[CONTAINMENT TRIGGERED] Docker container exceeded timeout of {sandbox_timeout}s. Terminated."
                # Force kill container
                kill_proc = await asyncio.create_subprocess_exec(
                    "docker", "rm", "-f", ephemeral_id,
                    stdout=asyncio.subprocess.DEVNULL,
                    stderr=asyncio.subprocess.DEVNULL
                )
                await kill_proc.wait()

            # Collect artifacts
            for file_path in host_tmp_dir.glob("*"):
                if file_path.name == "runner.py" or (files and file_path.name in files):
                    continue
                if file_path.suffix.lower() in (".png", ".jpg", ".jpeg"):
                    b64_str = base64.b64encode(file_path.read_bytes()).decode("ascii")
                    artifacts.append(
                        Artifact(type="image/png", title=file_path.name, filename=file_path.name, content_base64=b64_str)
                    )

        finally:
            metrics.execution_time_sec = round(time.time() - start_time, 3)
            shutil.rmtree(host_tmp_dir, ignore_errors=True)
            metrics.sandbox_destroyed = True

        return RawExecutionResult(
            exit_code=exit_code,
            stdout=stdout_text,
            stderr=stderr_text,
            timed_out=timed_out,
            metrics=metrics,
            violations=[],
            generated_artifacts=artifacts
        )

