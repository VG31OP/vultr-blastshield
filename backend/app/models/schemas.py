"""Data models and schemas for Vultr BlastShield."""
from enum import Enum
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field
import time


class TaskType(str, Enum):
    DATA_ANALYSIS = "data_analysis"
    CODE_EXECUTION = "code_execution"
    SELF_HEALING = "self_healing"
    CONTAINMENT_ATTACK = "containment_attack"
    BROWSER_AUTOMATION = "browser_automation"


class StepType(str, Enum):
    THOUGHT = "thought"
    PLAN = "plan"
    SECURITY_CHECK = "security_check"
    CODE_GENERATION = "code_generation"
    SANDBOX_DISPATCH = "sandbox_dispatch"
    EXECUTION_OUTPUT = "execution_output"
    SELF_HEALING = "self_healing"
    CONTAINMENT_ALERT = "containment_alert"
    ARTIFACT = "artifact"
    FINAL_ANSWER = "final_answer"


class Severity(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class SecurityViolation(BaseModel):
    rule: str
    description: str
    severity: Severity = Severity.HIGH
    blocked_payload: Optional[str] = None
    timestamp: float = Field(default_factory=time.time)


class ContainmentMetrics(BaseModel):
    cpu_percent: float = 0.0
    memory_used_mb: float = 0.0
    memory_limit_mb: float = 256.0
    execution_time_sec: float = 0.0
    timeout_limit_sec: float = 10.0
    secrets_exposed_count: int = 0
    network_calls_blocked: int = 0
    filesystem_escapes_blocked: int = 0
    sandbox_type: str = "isolated_subprocess"  # "docker" or "isolated_subprocess"
    ephemeral_id: str = ""
    sandbox_destroyed: bool = True


class ExecutionStep(BaseModel):
    step_index: int
    step_type: StepType
    title: str
    content: str
    status: str = "completed"  # pending, running, completed, blocked, failed
    timestamp: float = Field(default_factory=time.time)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class Artifact(BaseModel):
    type: str  # "image/png", "text/csv", "application/json", "text/markdown"
    title: str
    filename: str
    content_base64: Optional[str] = None
    data: Optional[Any] = None


class ExecutionRequest(BaseModel):
    prompt: str
    task_type: TaskType = TaskType.DATA_ANALYSIS
    dataset_name: Optional[str] = "ecommerce_sales.csv"
    custom_code: Optional[str] = None
    attack_vector: Optional[str] = None


class ExecutionResult(BaseModel):
    session_id: str
    success: bool
    status: str
    steps: List[ExecutionStep] = []
    metrics: ContainmentMetrics
    violations: List[SecurityViolation] = []
    artifacts: List[Artifact] = []
    summary: str = ""

