import React from 'react';
import { Shield, Cpu, Server, Lock, Info } from 'lucide-react';
import type { SystemHealth } from '../types';

interface HeaderProps {
  health: SystemHealth | null;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({ health, onOpenArchitecture }) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                Vultr BlastShield
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60 uppercase tracking-wider">
                Track 1: Blast Radius Zero
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Autonomous Agent Control Plane with Ephemeral Sandboxes on Vultr
            </p>
          </div>
        </div>

        {/* Live Indicators & Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Vultr Inference Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] leading-tight">Inference Engine</span>
              <span className="font-mono text-cyan-300 font-medium leading-tight">
                {health?.vultr_inference.model || 'Vultr Serverless Inference'}
              </span>
            </div>
            <span className={`w-2 h-2 rounded-full ml-1 ${health?.vultr_inference.connected ? 'bg-emerald-400' : 'bg-cyan-400 animate-pulse'}`} />
          </div>

          {/* Sandbox Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
            <Server className="w-4 h-4 text-blue-400" />
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] leading-tight">Containment Host</span>
              <span className="font-mono text-blue-300 font-medium leading-tight">
                {health?.sandbox.active_backend || 'Isolated Subprocess'} (0-Egress)
              </span>
            </div>
            <Lock className="w-3.5 h-3.5 text-emerald-400 ml-1" />
          </div>

          {/* Architecture Button */}
          <button
            onClick={onOpenArchitecture}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-medium transition cursor-pointer"
          >
            <Info className="w-4 h-4" />
            <span>Architecture</span>
          </button>
        </div>
      </div>
    </header>
  );
};
