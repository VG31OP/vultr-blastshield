import type { ExecutionResult, Scenario, SystemHealth } from '../types';

const API_BASE = '/api';

export async function fetchHealth(): Promise<SystemHealth> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Failed to fetch system health');
  return res.json();
}

export async function fetchScenarios(): Promise<Scenario[]> {
  const res = await fetch(`${API_BASE}/scenarios`);
  if (!res.ok) throw new Error('Failed to fetch containment scenarios');
  return res.json();
}

export async function executeTask(payload: {
  prompt: string;
  task_type?: string;
  dataset_name?: string;
  custom_code?: string;
  attack_vector?: string;
}): Promise<ExecutionResult> {
  const res = await fetch(`${API_BASE}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Execution request failed' }));
    throw new Error(err.detail || 'Execution request failed');
  }
  return res.json();
}
