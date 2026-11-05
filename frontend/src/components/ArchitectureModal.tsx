import React from 'react';
import { X, Shield, Server, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
          <div className="p-3 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              Vultr BlastShield Architecture & Containment Blueprint
            </h2>
            <p className="text-xs text-slate-400">
              LabLab.ai Vultr Hackathon — Track 1: Blast Radius Zero Specifications
            </p>
          </div>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
              1. End-to-End System Flow
            </h3>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/90 font-mono text-xs text-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold">
                <span>[User Prompt]</span>
                <span>➔</span>
                <span>[Vultr Cloud VM Control Layer]</span>
                <span>➔</span>
                <span>[Vultr Serverless Inference]</span>
              </div>
              <div className="pl-6 text-slate-400">
                • Vultr Serverless Inference API: <code className="text-slate-200">https://api.vultrinference.com/v1</code><br />
                • Model: <code className="text-slate-200">llama-3.3-70b-instruct</code> (OpenAI SDK-compatible)<br />
                • ReAct Planning Loop generates executable Python code blocks
              </div>

              <div className="flex items-center gap-2 text-blue-300 font-bold">
                <span>[AST Security Sentinel]</span>
                <span>➔</span>
                <span>[Pre-Execution Policy Filter]</span>
              </div>
              <div className="pl-6 text-slate-400">
                • Static Abstract Syntax Tree (AST) inspection for dangerous imports (<code className="text-slate-200">socket</code>, <code className="text-slate-200">urllib</code>, <code className="text-slate-200">subprocess</code>)<br />
                • Blocks <code className="text-slate-200">os.environ</code> inspection to eliminate secret exfiltration risks
              </div>

              <div className="flex items-center gap-2 text-purple-300 font-bold">
                <span>[Ephemeral Sandbox Runner]</span>
                <span>➔</span>
                <span>[Verified Stdout & PNG Artifacts]</span>
              </div>
              <div className="pl-6 text-slate-400">
                • Strict resource limits: 256MB RAM cap, 0.5 CPU quota, 10s watchdog timeout<br />
                • Zero network egress: Outbound sockets disabled<br />
                • Non-root unprivileged sandbox execution<br />
                • Instant lifecycle destruction: Wiped immediately after execution completes
              </div>
            </div>
          </div>

          {/* 4 Containment Pillars */}
          <div>
            <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-3">
              2. The 4 Blast Radius Zero Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Process Isolation</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Sandbox runs in isolated ephemeral environments. Host OS, production databases, and main web app runtime are physically segregated.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Secret Hygiene</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Zero host API keys, Vultr credentials, or environment secrets are injected into the sandbox workspace. AST Sentinel catches environment probing.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Resource Bounds</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Hard cgroup caps (256MB RAM, 0.5 CPU) and asynchronous watchdog timers terminate runaway memory or CPU infinite loops within 10.0s.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Lifecycle Discipline</span>
                </div>
                <p className="text-slate-400 text-xs">
                  Containers and workspaces are strictly ephemeral. They are destroyed and wiped clean immediately upon task completion, guaranteeing zero state persistence.
                </p>
              </div>
            </div>
          </div>

          {/* Vultr Deployment Specs */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 text-xs text-slate-300">
            <div className="font-semibold text-blue-300 mb-1 flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>Vultr VM Production Deployment</span>
            </div>
            <p className="text-slate-400 mb-2">
              Deployable in 2 minutes on any Vultr Cloud Compute instance using our automated bash script:
            </p>
            <pre className="p-2.5 rounded bg-slate-950 font-mono text-cyan-300 border border-slate-800">
              curl -sSL https://raw.githubusercontent.com/vulr/blastshield/main/deploy/install_vultr.sh | sudo bash
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
