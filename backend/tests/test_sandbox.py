"""Unit tests for Blast Radius Zero sandbox containment policies."""
import pytest
import asyncio
from app.sandbox.security_guard import SecurityGuard
from app.sandbox.secure_subprocess import SecureSubprocessSandbox
from app.models.schemas import Severity


def test_security_guard_blocks_socket():
    code = "import socket\ns = socket.socket()"
    is_safe, violations = SecurityGuard.analyze_code(code)
    assert not is_safe
    assert any(v.rule == "UNAUTHORIZED_MODULE" for v in violations)


def test_security_guard_blocks_os_environ():
    code = "import os\nval = os.environ.get('VULTR_INFERENCE_API_KEY')"
    is_safe, violations = SecurityGuard.analyze_code(code)
    assert not is_safe
    assert any(v.rule == "SECRET_HYGIENE_VIOLATION" for v in violations)


def test_security_guard_blocks_path_traversal():
    code = "with open('../../.env', 'r') as f: print(f.read())"
    is_safe, violations = SecurityGuard.analyze_code(code)
    assert not is_safe
    assert any(v.rule == "FILESYSTEM_CONTAINMENT" for v in violations)


def test_security_guard_allows_safe_code():
    code = """
import math
data = [1, 2, 3, 4, 5]
avg = sum(data) / len(data)
print(f"Computed average: {avg}")
"""
    is_safe, violations = SecurityGuard.analyze_code(code)
    assert is_safe
    assert len(violations) == 0


@pytest.mark.asyncio
async def test_sandbox_executes_safe_code():
    sandbox = SecureSubprocessSandbox()
    code = "print('Hello from isolated Vultr sandbox!')"
    result = await sandbox.execute(code=code)
    assert result.exit_code == 0
    assert "Hello from isolated Vultr sandbox!" in result.stdout
    assert result.metrics.sandbox_destroyed is True


@pytest.mark.asyncio
async def test_sandbox_kills_runaway_loop():
    sandbox = SecureSubprocessSandbox()
    code = "import time\nwhile True:\n    pass"
    # Test with very short timeout for fast unit testing
    result = await sandbox.execute(code=code, timeout=1.5)
    assert result.timed_out is True
    assert result.exit_code == -9
    assert result.metrics.sandbox_destroyed is True
