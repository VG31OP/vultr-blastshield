import React from 'react';
import { X, Shield, Server, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090d16]/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[22px] border-[3px] border-[#2a3753] bg-[#131b2e] p-6 md:p-8 shadow-[8px_8px_0_#090d16]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1e293b] border-[2px] border-[#2a3753] hover:bg-[#fbbf24] hover:text-[#090d16] text-[#cbd5e1] flex items-center justify-center shadow-[2px_2px_0_#090d16] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b-[2px] border-[#2a3753] pb-5">
          <div className="w-12 h-12 rounded-xl bg-[#7c4dff] border-[2.5px] border-[#090d16] shadow-[3px_3px_0_#090d16] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#f1f5f9] font-display">
              Vultr BlastShield Architecture & Containment Blueprint
            </h2>
            <p className="text-xs font-semibold text-[#94a3b8]">
              LabLab.ai Vultr Hackathon — Track 1: Blast Radius Zero Specifications
            </p>
          </div>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xs font-black text-[#a78bfa] uppercase tracking-wider mb-3 font-display">
              1. End-to-End System Flow
            </h3>
            <div className="p-5 rounded-2xl bg-[#0c1220] border-[2.5px] border-[#2a3753] shadow-[3px_3px_0_#090d16] font-mono text-xs text-[#f1f5f9] space-y-4">
              <div className="flex items-center gap-2 text-[#a78bfa] font-bold flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[#20153f] border border-[#7c4dff]/40">[User Prompt]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#072b21] border border-[#34d399]/40 text-[#34d399]">[Vultr Cloud VM Control Layer]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#331c03] border border-[#fbbf24]/40 text-[#fbbf24]">[Vultr Serverless Inference]</span>
              </div>
              <div className="pl-4 border-l-2 border-[#2a3753] space-y-1 text-[#94a3b8]">
                <div>• Vultr Serverless Inference API: <code className="font-bold text-[#c4b5fd]">https://api.vultrinference.com/v1</code></div>
                <div>• Model: <code className="font-bold text-[#c4b5fd]">llama-3.3-70b-instruct</code> (OpenAI-compatible)</div>
                <div>• ReAct Planning Loop generates executable Python computational code blocks</div>
              </div>

              <div className="flex items-center gap-2 text-[#f1f5f9] font-bold flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[#330c20] border border-[#f472b6]/40 text-[#f472b6]">[AST Security Sentinel]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#072b21] border border-[#34d399]/40 text-[#34d399]">[Pre-Execution Policy Filter]</span>
              </div>
              <div className="pl-4 border-l-2 border-[#2a3753] space-y-1 text-[#94a3b8]">
                <div>• Static AST analysis intercepts banned imports (<code className="font-bold text-[#f472b6]">socket</code>, <code className="font-bold text-[#f472b6]">urllib</code>, <code className="font-bold text-[#f472b6]">subprocess</code>)</div>
                <div>• Blocks <code className="font-bold text-[#f472b6]">os.environ</code> inspection to eliminate secret exfiltration risks completely</div>
              </div>

              <div className="flex items-center gap-2 text-[#34d399] font-bold flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[#063529] border border-[#34d399]">[Ephemeral Sandbox Runner]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#162035] border border-[#2a3753] text-[#f1f5f9]">[Verified Stdout & PNG Artifacts]</span>
              </div>
              <div className="pl-4 border-l-2 border-[#2a3753] space-y-1 text-[#94a3b8]">
                <div>• Hard resource limits: 256MB RAM cap, 0.5 CPU quota, 10s watchdog timeout</div>
                <div>• Zero network egress (--network none): Outbound sockets disabled</div>
                <div>• Non-root unprivileged execution (uid 1000)</div>
                <div>• Ephemeral lifecycle: Wiped immediately after execution completes</div>
              </div>
            </div>
          </div>

          {/* 4 Containment Pillars */}
          <div>
            <h3 className="text-xs font-black text-[#a78bfa] uppercase tracking-wider mb-3 font-display">
              2. The 4 Blast Radius Zero Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#07241c] border-[2px] border-[#34d399]/40 shadow-[2px_2px_0_#090d16]">
                <div className="flex items-center gap-2 text-[#34d399] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>1. Process Isolation</span>
                </div>
                <p className="text-[#94a3b8] text-xs">
                  Sandbox runs in isolated ephemeral environments. Host OS, production databases, and main web app runtime are physically segregated.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#2e0b1d] border-[2px] border-[#f472b6]/40 shadow-[2px_2px_0_#090d16]">
                <div className="flex items-center gap-2 text-[#f472b6] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>2. Secret Hygiene</span>
                </div>
                <p className="text-[#94a3b8] text-xs">
                  Zero host API keys, Vultr credentials, or environment secrets are injected into the sandbox. AST Sentinel catches environment probing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#291703] border-[2px] border-[#fbbf24]/40 shadow-[2px_2px_0_#090d16]">
                <div className="flex items-center gap-2 text-[#fbbf24] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>3. Resource Bounds</span>
                </div>
                <p className="text-[#94a3b8] text-xs">
                  Hard cgroup caps (256MB RAM, 0.5 CPU) and asynchronous watchdog timers terminate runaway memory or CPU infinite loops within 10.0s.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1b1238] border-[2px] border-[#7c4dff]/40 shadow-[2px_2px_0_#090d16]">
                <div className="flex items-center gap-2 text-[#a78bfa] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>4. Lifecycle Discipline</span>
                </div>
                <p className="text-[#94a3b8] text-xs">
                  Workspaces are strictly ephemeral. They are destroyed and wiped clean immediately upon task completion, guaranteeing zero state persistence.
                </p>
              </div>
            </div>
          </div>

          {/* Vultr Deployment Specs */}
          <div className="p-5 rounded-2xl bg-[#0c1220] border-[2.5px] border-[#2a3753] shadow-[3px_3px_0_#090d16]">
            <div className="font-black text-[#f1f5f9] mb-1 flex items-center gap-2 font-display">
              <Server className="w-4 h-4 text-[#a78bfa]" />
              <span>Vultr Cloud VM Production Deployment</span>
            </div>
            <p className="text-xs text-[#94a3b8] mb-2 font-reading">
              Deployable in 2 minutes on any Vultr Cloud Compute instance using our automated bash script:
            </p>
            <pre className="p-3 rounded-xl bg-[#090d16] font-mono text-xs text-[#34d399] border-[2px] border-[#2a3753] overflow-x-auto">
              curl -sSL https://raw.githubusercontent.com/VG31OP/vultr-blastshield/master/deploy/install_vultr.sh | sudo bash
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
