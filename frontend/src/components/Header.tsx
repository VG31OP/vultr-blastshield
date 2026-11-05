import React from 'react';
import { Shield, Cpu, Server, Lock, Info } from 'lucide-react';
import type { SystemHealth } from '../types';

interface HeaderProps {
  health: SystemHealth | null;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({ health, onOpenArchitecture }) => {
  return (
    <header className="border-b-[3px] border-[#2a3753] bg-[#0f1423]/95 backdrop-blur px-6 py-5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Brand & Geometric Assembly */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Playful Geometric shape cluster in Dark Mode */}
            <div className="w-12 h-12 rounded-[14px] bg-[#7c4dff] border-[3px] border-[#090d16] shadow-[3px_3px_0_#090d16] flex items-center justify-center -rotate-2">
              <Shield className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#fbbf24] border-[2px] border-[#090d16] shadow-[1px_1px_0_#090d16]" />
            <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-[#f472b6] border-[2px] border-[#090d16] rotate-12" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-black tracking-tight text-[#f1f5f9] font-display">
                Vultr BlastShield
              </h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#34d399]/20 text-[#34d399] border-[2px] border-[#34d399] shadow-[2px_2px_0_#090d16]">
                Track 1: Blast Radius Zero
              </span>
            </div>
            <p className="text-xs font-medium text-[#94a3b8] mt-0.5 font-reading">
              Autonomous Agent Control Plane with Ephemeral Sandboxes on Vultr
            </p>
          </div>
        </div>

        {/* Live Indicators & Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Inference Status Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#162035] border-[2.5px] border-[#2a3753] shadow-[2px_2px_0_#090d16] text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f472b6] border border-[#090d16] animate-pulse" />
            <div className="flex items-center gap-1.5 font-medium text-[#f1f5f9]">
              <Cpu className="w-3.5 h-3.5 text-[#a78bfa]" />
              <span className="font-bold text-[#a78bfa]">
                {health?.vultr_inference.model || 'Llama 3.3 70B'}
              </span>
            </div>
          </div>

          {/* Sandbox Status Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0e2722] border-[2.5px] border-[#34d399]/50 shadow-[2px_2px_0_#090d16] text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#34d399] border border-[#090d16]" />
            <div className="flex items-center gap-1 font-semibold text-[#34d399]">
              <Server className="w-3.5 h-3.5" />
              <span>{health?.sandbox.active_backend || 'Isolated Subprocess'}</span>
              <Lock className="w-3 h-3 ml-0.5" />
            </div>
          </div>

          {/* Architecture Blueprint Button */}
          <button
            onClick={onOpenArchitecture}
            className="geo-btn-secondary px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Info className="w-4 h-4 text-[#a78bfa]" />
            <span>Architecture</span>
          </button>
        </div>
      </div>
    </header>
  );
};
