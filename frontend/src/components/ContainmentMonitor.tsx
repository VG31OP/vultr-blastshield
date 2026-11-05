import React from 'react';
import { ShieldCheck, ShieldAlert, HardDrive, Clock, Lock, Trash2 } from 'lucide-react';
import type { ContainmentMetrics, SecurityViolation } from '../types';

interface ContainmentMonitorProps {
  metrics: ContainmentMetrics | null;
  violations: SecurityViolation[];
  status: string;
}

export const ContainmentMonitor: React.FC<ContainmentMonitorProps> = ({
  metrics,
  violations,
  status,
}) => {
  const isAttackContained = status === 'contained' || violations.length > 0;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isAttackContained ? (
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          )}
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
            Blast Radius Zero Perimeter Monitor
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            {metrics?.ephemeral_id ? metrics.ephemeral_id : 'STANDBY'}
          </span>
          {metrics?.sandbox_destroyed && (
            <span className="flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
              <Trash2 className="w-3 h-3 text-emerald-400" />
              Ephemeral Wiped
            </span>
          )}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1: Secrets Exposed */}
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Secrets Exposed</span>
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-emerald-400">
              {metrics ? metrics.secrets_exposed_count : 0}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">/ 100% Scrubbed</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Zero host keys injected</span>
        </div>

        {/* Metric 2: Network Isolation */}
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Network Egress</span>
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-cyan-400">0 KB</span>
            <span className="text-[10px] text-slate-500 font-medium">Blocked</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Zero outbound connections</span>
        </div>

        {/* Metric 3: Memory Limit */}
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Memory Quota</span>
            <HardDrive className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-blue-300">
              {metrics ? metrics.memory_used_mb : 0}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">/ {metrics?.memory_limit_mb || 256} MB</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  ((metrics?.memory_used_mb || 0) / (metrics?.memory_limit_mb || 256)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Metric 4: Execution Watchdog */}
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/70 p-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Watchdog Cutoff</span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-xl font-bold font-mono text-purple-300">
              {metrics ? `${metrics.execution_time_sec}s` : '0.0s'}
            </span>
            <span className="text-[10px] text-slate-500 font-medium">/ max 10.0s</span>
          </div>
          <span className="text-[10px] text-slate-400 mt-1">Hard timeout enforced</span>
        </div>
      </div>

      {/* Security Incident Alerts / Containment Moments */}
      {violations.length > 0 && (
        <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span className="text-xs font-semibold text-red-300 uppercase tracking-wider">
                Containment Moment Triggered: {violations.length} Violation(s) Intercepted
              </span>
            </div>
            <span className="text-[11px] font-mono text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/50">
              BLAST RADIUS ZERO DEFENSE ACTIVE
            </span>
          </div>

          <div className="space-y-1.5 mt-1">
            {violations.map((v, i) => (
              <div
                key={i}
                className="flex items-start justify-between text-xs p-2 rounded bg-slate-950/60 border border-red-900/40"
              >
                <div>
                  <div className="font-mono font-semibold text-red-300">{v.rule}</div>
                  <div className="text-slate-300 text-[11px]">{v.description}</div>
                </div>
                {v.blocked_payload && (
                  <code className="text-[10px] font-mono bg-red-950 text-red-400 px-1.5 py-0.5 rounded border border-red-900/60">
                    {v.blocked_payload}
                  </code>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
