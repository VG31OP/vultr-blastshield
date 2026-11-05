import React from 'react';
import { Shield, Cpu, Server, Lock, Info } from 'lucide-react';
import type { SystemHealth } from '../types';

interface HeaderProps {
  health: SystemHealth | null;
  onOpenArchitecture: () => void;
}

export const Header: React.FC<HeaderProps> = ({ health, onOpenArchitecture }) => {
  return (
    <header className="border-b-[3px] border-[#252b3a] bg-[#fffdf5] px-6 py-5 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Brand & Geometric Assembly */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            {/* Playful Geometric shape cluster */}
            <div className="w-12 h-12 rounded-[14px] bg-[#6434df] border-[3px] border-[#252b3a] shadow-[3px_3px_0_#252b3a] flex items-center justify-center -rotate-2">
              <Shield className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#ffd05b] border-[2px] border-[#252b3a] shadow-[1px_1px_0_#252b3a]" />
            <div className="absolute -bottom-1 -left-2 w-4 h-4 bg-[#ff78c5] border-[2px] border-[#252b3a] rotate-12" />
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl font-black tracking-tight text-[#253044] font-display">
                Vultr BlastShield
              </h1>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#9bf1cd] text-[#252b3a] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
                Track 1: Blast Radius Zero
              </span>
            </div>
            <p className="text-xs font-medium text-[#4a5568] mt-0.5 font-reading">
              Autonomous Agent Control Plane with Ephemeral Sandboxes on Vultr
            </p>
          </div>
        </div>

        {/* Live Indicators & Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Inference Status Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border-[2.5px] border-[#252b3a] shadow-[2px_2px_0_#252b3a] text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff78c5] border border-[#252b3a]" />
            <div className="flex items-center gap-1.5 font-medium text-[#253044]">
              <Cpu className="w-3.5 h-3.5 text-[#6434df]" />
              <span className="font-bold text-[#6434df]">
                {health?.vultr_inference.model || 'Llama 3.3 70B'}
              </span>
            </div>
          </div>

          {/* Sandbox Status Badge */}
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#e9fff5] border-[2.5px] border-[#252b3a] shadow-[2px_2px_0_#252b3a] text-xs">
            <div className="w-2.5 h-2.5 rounded-full bg-[#9bf1cd] border border-[#252b3a]" />
            <div className="flex items-center gap-1 font-semibold text-[#253044]">
              <Server className="w-3.5 h-3.5 text-[#253044]" />
              <span>{health?.sandbox.active_backend || 'Isolated Subprocess'}</span>
              <Lock className="w-3 h-3 text-[#253044] ml-0.5" />
            </div>
          </div>

          {/* Architecture Blueprint Button */}
          <button
            onClick={onOpenArchitecture}
            className="geo-btn-secondary px-4 py-1.5 text-xs font-bold flex items-center gap-1.5"
          >
            <Info className="w-4 h-4 text-[#6434df]" />
            <span>Architecture</span>
          </button>
        </div>
      </div>
    </header>
  );
};
