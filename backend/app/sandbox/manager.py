"""Sandbox manager selecting between Docker and isolated subprocess."""
from app.config import settings
from app.sandbox.base import BaseSandbox
from app.sandbox.docker_sandbox import DockerSandbox
from app.sandbox.secure_subprocess import SecureSubprocessSandbox


class SandboxManager:
    """Selects and provides the active sandbox implementation."""

    _instance: BaseSandbox = None

    @classmethod
    def get_sandbox(cls) -> BaseSandbox:
        if cls._instance is not None:
            return cls._instance

        backend_mode = settings.sandbox_backend.lower()

        if backend_mode == "docker":
            cls._instance = DockerSandbox()
        elif backend_mode == "subprocess":
            cls._instance = SecureSubprocessSandbox()
        else:
            # Auto-detect: if Docker is available use it, else use secure subprocess
            docker_sb = DockerSandbox()
            if docker_sb.is_available():
                cls._instance = docker_sb
            else:
                cls._instance = SecureSubprocessSandbox()

        return cls._instance
