"""Base sandbox abstraction for Vultr BlastShield."""
from abc import ABC, abstractmethod
from typing import Dict, List, Optional
from pydantic import BaseModel
from app.models.schemas import ContainmentMetrics, SecurityViolation, Artifact


class RawExecutionResult(BaseModel):
    exit_code: int
    stdout: str
    stderr: str
    timed_out: bool = False
    metrics: ContainmentMetrics
    violations: List[SecurityViolation] = []
    generated_artifacts: List[Artifact] = []


class BaseSandbox(ABC):
    """Abstract base class for all sandboxes."""

    @abstractmethod
    async def execute(
        self,
        code: str,
        files: Optional[Dict[str, bytes]] = None,
        timeout: Optional[float] = None
    ) -> RawExecutionResult:
        """Execute code in an isolated container or restricted subprocess."""
        pass

    @abstractmethod
    def is_available(self) -> bool:
        """Check if this sandbox provider is available in the current environment."""
        pass

