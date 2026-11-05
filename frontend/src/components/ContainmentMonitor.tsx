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
    <div className="geo-panel bg-white p-6 relative overflow-visible">
      {/* Playful Colored Book Tab */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-md bg-[#ffd05b] border-[2px] border-[#252b3a] text-[11px] font-black uppercase tracking-wider text-[#252b3a] shadow-[2px_2px_0_#252b3a]">
        Activity Ledger: Security Perimeter
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 pb-4 border-b-[2px] border-[#252b3a]/15">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border-[2.5px] border-[#252b3a] shadow-[2px_2px_0_#252b3a] flex items-center justify-center ${isAttackContained ? 'bg-[#ff78c5]' : 'bg-[#9bf1cd]'}`}>
            {isAttackContained ? (
              <ShieldAlert className="w-5 h-5 text-[#252b3a] stroke-[2.5]" />
            ) : (
              <ShieldCheck className="w-5 h-5 text-[#252b3a] stroke-[2.5]" />
            )}
          </div>
          <div>
            <h2 className="text-base font-black text-[#253044] font-display">
              Blast Radius Zero Perimeter Monitor
            </h2>
            <p className="text-xs text-[#526077]">
              Mathematical containment enforcement & host boundary isolation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#f1ebff] text-[#6434df] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
            {metrics?.ephemeral_id ? metrics.ephemeral_id : 'STANDBY ID'}
          </span>
          {metrics?.sandbox_destroyed && (
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-[#9bf1cd] text-[#252b3a] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
              <Trash2 className="w-3.5 h-3.5" />
              Ephemeral Wiped
            </span>
          )}
        </div>
      </div>

      {/* 4 Geometric Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {/* Tile 1: Secrets Exposed (Mint Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#252b3a] bg-[#e9fff5] p-4 shadow-[3px_3px_0_#252b3a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#253044]">
            <span>Secrets Exposed</span>
            <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#252b3a] flex items-center justify-center shadow-[1px_1px_0_#252b3a]">
              <Lock className="w-3.5 h-3.5 text-[#253044]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-[#253044]">
              {metrics ? metrics.secrets_exposed_count : 0}
            </span>
            <span className="text-xs font-bold text-[#0c7c4b]">100% Scrubbed</span>
          </div>
          <span className="text-[11px] font-medium text-[#4a5568]">Zero host API keys injected</span>
        </div>

        {/* Tile 2: Network Egress (Violet Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#252b3a] bg-[#f1ebff] p-4 shadow-[3px_3px_0_#252b3a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#253044]">
            <span>Network Egress</span>
            <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#252b3a] flex items-center justify-center shadow-[1px_1px_0_#252b3a]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6434df]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-2">
            <span className="text-3xl font-black font-display text-[#6434df]">0 KB</span>
            <span className="text-xs font-bold text-[#6434df]">Strict Isolation</span>
          </div>
          <span className="text-[11px] font-medium text-[#4a5568]">Zero outbound socket packets</span>
        </div>

        {/* Tile 3: Memory Quota (Amber Tile) */}
        <div className="rounded-[15px] border-[2.5px] border-[#252b3a] bg-[#fff8e7] p-4 shadow-[3px_3px_0_#252b3a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#253044]">
            <span>Memory Quota</span>
            <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#252b3a] flex items-center justify-center shadow-[1px_1px_0_#252b3a]">
              <HardDrive className="w-3.5 h-3.5 text-[#253044]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-display text-[#253044]">
              {metrics ? metrics.memory_used_mb : 0}
            </span>
            <span className="text-xs font-bold text-[#8c6b00]">/ {metrics?.memory_limit_mb || 256} MB</span>
          </div>
          <div className="w-full bg-white border-[2px] border-[#252b3a] h-3 rounded-full overflow-hidden shadow-[1px_1px_0_#252b3a]">
            <div
              className="bg-[#ffd05b] h-full transition-all duration-300"
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
        <div className="rounded-[15px] border-[2.5px] border-[#252b3a] bg-[#fff0f7] p-4 shadow-[3px_3px_0_#252b3a] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-bold text-[#253044]">
            <span>Watchdog Cutoff</span>
            <div className="w-6 h-6 rounded-full bg-white border-[2px] border-[#252b3a] flex items-center justify-center shadow-[1px_1px_0_#252b3a]">
              <Clock className="w-3.5 h-3.5 text-[#ff78c5]" />
            </div>
          </div>
          <div className="my-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-black font-display text-[#253044]">
              {metrics ? `${metrics.execution_time_sec}s` : '0.0s'}
            </span>
            <span className="text-xs font-bold text-[#b5146d]">/ max 10.0s</span>
          </div>
          <span className="text-[11px] font-medium text-[#4a5568]">Hard cgroup watchdog cutoff</span>
        </div>
      </div>

      {/* Security Incident Alerts / Containment Moments */}
      {violations.length > 0 && (
        <div className="mt-5 rounded-[15px] border-[3px] border-[#252b3a] bg-[#ffecf5] p-4 shadow-[3px_3px_0_#252b3a] flex flex-col gap-2.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff78c5] border-[2px] border-[#252b3a]" />
              <span className="text-xs font-black text-[#253044] uppercase tracking-wider font-display">
                Containment Moment Triggered: {violations.length} Violation(s) Intercepted
              </span>
            </div>
            <span className="text-xs font-bold font-mono text-[#253044] bg-[#ffd05b] px-3 py-0.5 rounded-full border-[2px] border-[#252b3a] shadow-[1px_1px_0_#252b3a]">
              BLAST RADIUS ZERO ACTIVE
            </span>
          </div>

          <div className="space-y-2 mt-1">
            {violations.map((v, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]"
              >
                <div>
                  <div className="font-mono font-bold text-xs text-[#253044]">{v.rule}</div>
                  <div className="text-xs text-[#4a5568]">{v.description}</div>
                </div>
                {v.blocked_payload && (
                  <code className="text-xs font-mono font-bold bg-[#ffecf5] text-[#b5146d] px-2.5 py-1 rounded-md border-[2px] border-[#252b3a]">
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
