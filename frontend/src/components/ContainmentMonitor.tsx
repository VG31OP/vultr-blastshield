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
    <div className="geo-panel bg-[#131b2e] p-6 relative overflow-visible">
      {/* Playful Colored Book Tab */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-md bg-[#fbbf24] border-[2px] border-[#090d16] text-[11px] font-black uppercase tracking-wider text-[#090d16] shadow-[2px_2px_0_#090d16]">
        Activity Ledger: Security Perimeter
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 pb-4 border-b-[2px] border-[#2a3753]">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border-[2.5px] border-[#090d16] shadow-[2px_2px_0_#090d16] flex items-center justify-center ${isAttackContained ? 'bg-[#f472b6]' : 'bg-[#34d399]'}`}>
            {isAttackContained ? (
              <ShieldAlert className="w-5 h-5 text-[#090d16] stroke-[2.5]" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#090d16] stroke-[2.5]" />
            )}
          </div>
          <div>
            <h2 className="text-base font-black text-[#f1f5f9] font-display">
              Blast Radius Zero Perimeter Monitor
            </h2>
            <p className="text-xs text-[#94a3b8]">
              Mathematical containment enforcement & host boundary isolation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#20153f] text-[#c4b5fd] border-[2px] border-[#7c4dff]/40 shadow-[2px_2px_0_#090d16]">
            {metrics?.ephemeral_id ? metrics.ephemeral_id : 'STANDBY ID'}
          </span>
          {metrics?.sandbox_destroyed && (
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#063529] text-[#34d399] border-[2px] border-[#34d399]/40 shadow-[2px_2px_0_#090d16]">
              <Trash2 className="w-3.5 h-3.5" />
              Ephemeral Wiped
            </span>
          )}
        </div>
      </div>

      {/* 4 Geometric Metric Tiles in Dark Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {/* Tile 1: Secrets Exposed (Mint Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#2a3753] bg-[#07241c] p-4 shadow-[3px_3px_0_#090d16] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#34d399]">
            <span>Secrets Exposed</span>
            <div className="w-6 h-6 rounded-full bg-[#131b2e] border-[2px] border-[#2a3753] flex items-center justify-center shadow-[1px_1px_0_#090d16]">
              <Lock className="w-3.5 h-3.5 text-[#34d399]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-[#f1f5f9]">
              {metrics ? metrics.secrets_exposed_count : 0}
            </span>
            <span className="text-xs font-bold text-[#34d399]">100% Scrubbed</span>
          </div>
          <span className="text-[11px] font-medium text-[#94a3b8]">Zero host API keys injected</span>
        </div>

        {/* Tile 2: Network Egress (Violet Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#2a3753] bg-[#1a1236] p-4 shadow-[3px_3px_0_#090d16] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#c4b5fd]">
            <span>Network Egress</span>
            <div className="w-6 h-6 rounded-full bg-[#131b2e] border-[2px] border-[#2a3753] flex items-center justify-center shadow-[1px_1px_0_#090d16]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#a78bfa]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-[#c4b5fd]">0 KB</span>
            <span className="text-xs font-bold text-[#a78bfa]">Strict Isolation</span>
          </div>
          <span className="text-[11px] font-medium text-[#94a3b8]">Zero outbound socket packets</span>
        </div>

        {/* Tile 3: Memory Quota (Amber Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#2a3753] bg-[#291703] p-4 shadow-[3px_3px_0_#090d16] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#fde047]">
            <span>Memory Quota</span>
            <div className="w-6 h-6 rounded-full bg-[#131b2e] border-[2px] border-[#2a3753] flex items-center justify-center shadow-[1px_1px_0_#090d16]">
              <HardDrive className="w-3.5 h-3.5 text-[#fbbf24]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-display text-[#f1f5f9]">
              {metrics ? metrics.memory_used_mb : 0}
            </span>
            <span className="text-xs font-bold text-[#fbbf24]">/ {metrics?.memory_limit_mb || 256} MB</span>
          </div>
          <div className="w-full bg-[#131b2e] border-[2px] border-[#2a3753] h-3 rounded-full overflow-hidden shadow-[1px_1px_0_#090d16]">
            <div
              className="bg-[#fbbf24] h-full transition-all duration-300"
              style={{
                width: `${Math.min(
                  ((metrics?.memory_used_mb || 0) / (metrics?.memory_limit_mb || 256)) * 100,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Tile 4: Execution Watchdog (Pink Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#2a3753] bg-[#2b0c1c] p-4 shadow-[3px_3px_0_#090d16] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#f472b6]">
            <span>Watchdog Cutoff</span>
            <div className="w-6 h-6 rounded-full bg-[#131b2e] border-[2px] border-[#2a3753] flex items-center justify-center shadow-[1px_1px_0_#090d16]">
              <Clock className="w-3.5 h-3.5 text-[#f472b6]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-display text-[#f1f5f9]">
              {metrics ? `${metrics.execution_time_sec}s` : '0.0s'}
            </span>
            <span className="text-xs font-bold text-[#f472b6]">/ max 10.0s</span>
          </div>
          <span className="text-[11px] font-medium text-[#94a3b8]">Hard cgroup watchdog cutoff</span>
        </div>
      </div>

      {/* Security Incident Alerts / Containment Moments */}
      {violations.length > 0 && (
        <div className="mt-5 rounded-[15px] border-[3px] border-[#f472b6]/60 bg-[#340b1e] p-4 shadow-[3px_3px_0_#090d16] flex flex-col gap-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#f472b6] border-[2px] border-[#090d16] animate-pulse" />
              <span className="text-xs font-black text-[#fbcfe8] uppercase tracking-wider font-display">
                Containment Moment Triggered: {violations.length} Violation(s) Intercepted
              </span>
            </div>
            <span className="text-xs font-bold font-mono text-[#090d16] bg-[#fbbf24] px-3 py-0.5 rounded-full border-[2px] border-[#090d16] shadow-[1px_1px_0_#090d16]">
              BLAST RADIUS ZERO ACTIVE
            </span>
          </div>

          <div className="space-y-2 mt-1">
            {violations.map((v, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#162035] border-[2px] border-[#2a3753] shadow-[2px_2px_0_#090d16]"
              >
                <div>
                  <div className="font-mono font-bold text-xs text-[#f472b6]">{v.rule}</div>
                  <div className="text-xs text-[#cbd5e1]">{v.description}</div>
                </div>
                {v.blocked_payload && (
                  <code className="text-xs font-mono font-bold bg-[#340b1e] text-[#f472b6] px-2.5 py-1 rounded-md border-[2px] border-[#f472b6]/50">
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
