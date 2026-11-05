export type TaskType = 
  | 'data_analysis'
  | 'code_execution'
  | 'self_healing'
  | 'containment_attack'
  | 'browser_automation';

export type StepType = 
  | 'thought'
  | 'plan'
  | 'security_check'
  | 'code_generation'
  | 'sandbox_dispatch'
  | 'execution_output'
  | 'self_healing'
  | 'containment_alert'
  | 'artifact'
  | 'final_answer';

export interface SecurityViolation {
  rule: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blocked_payload?: string;
  timestamp: number;
}

export interface ContainmentMetrics {
  cpu_percent: number;
  memory_used_mb: number;
  memory_limit_mb: number;
  execution_time_sec: number;
  timeout_limit_sec: number;
  secrets_exposed_count: number;
  network_calls_blocked: number;
  filesystem_escapes_blocked: number;
  sandbox_type: string;
  ephemeral_id: string;
  sandbox_destroyed: boolean;
}

export interface ExecutionStep {
  step_index: number;
  step_type: StepType;
  title: string;
  content: string;
  status: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface Artifact {
  type: string;
  title: string;
  filename: string;
  content_base64?: string;
  data?: any;
}

export interface ExecutionResult {
  session_id: string;
  success: boolean;
  status: string;
  steps: ExecutionStep[];
  metrics: ContainmentMetrics;
  violations: SecurityViolation[];
  artifacts: Artifact[];
  summary: string;
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  attack_type: string;
  expected_defense: string;
}

export interface SystemHealth {
  status: string;
  service: string;
  vultr_inference: {
    endpoint: string;
    model: string;
    connected: boolean;
    mode: string;
  };
  sandbox: {
    active_backend: string;
    memory_limit_mb: number;
    timeout_seconds: number;
    cpu_quota: number;
    network_isolation: string;
    containment_policy: string;
  };
}
