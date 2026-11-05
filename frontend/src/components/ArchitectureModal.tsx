import React from 'react';
import { X, Shield, Server, CheckCircle2 } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252b3a]/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[22px] border-[3px] border-[#252b3a] bg-white p-6 md:p-8 shadow-[8px_8px_0_#252b3a]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#fffdf5] border-[2px] border-[#252b3a] hover:bg-[#ffd05b] text-[#252b3a] flex items-center justify-center shadow-[2px_2px_0_#252b3a] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b-[2px] border-[#252b3a]/15 pb-5">
          <div className="w-12 h-12 rounded-xl bg-[#6434df] border-[2.5px] border-[#252b3a] shadow-[3px_3px_0_#252b3a] flex items-center justify-center">
            <Shield className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#253044] font-display">
              Vultr BlastShield Architecture & Containment Blueprint
            </h2>
            <p className="text-xs font-semibold text-[#526077]">
              LabLab.ai Vultr Hackathon — Track 1: Blast Radius Zero Specifications
            </p>
          </div>
        </div>

        {/* Architecture Flow Diagram */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xs font-black text-[#6434df] uppercase tracking-wider mb-3 font-display">
              1. End-to-End System Flow
            </h3>
            <div className="p-5 rounded-2xl bg-[#fffdf5] border-[2.5px] border-[#252b3a] shadow-[3px_3px_0_#252b3a] font-mono text-xs text-[#253044] space-y-4">
              <div className="flex items-center gap-2 text-[#6434df] font-bold flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[#f1ebff] border border-[#252b3a]">[User Prompt]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#e9fff5] border border-[#252b3a]">[Vultr Cloud VM Control Layer]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#ffd05b] border border-[#252b3a]">[Vultr Serverless Inference]</span>
              </div>
              <div className="pl-4 border-l-2 border-[#252b3a]/30 space-y-1 text-[#4a5568]">
                <div>• Vultr Serverless Inference API: <code className="font-bold text-[#6434df]">https://api.vultrinference.com/v1</code></div>
                <div>• Model: <code className="font-bold text-[#6434df]">llama-3.3-70b-instruct</code> (OpenAI-compatible)</div>
                <div>• ReAct Planning Loop generates executable Python computational code blocks</div>
              </div>

              <div className="flex items-center gap-2 text-[#253044] font-bold flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[#ffecf5] border border-[#252b3a]">[AST Security Sentinel]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-[#e9fff5] border border-[#252b3a]">[Pre-Execution Policy Filter]</span>
              </div>
              <div className="pl-4 border-l-2 border-[#252b3a]/30 space-y-1 text-[#4a5568]">
                <div>• Static AST analysis intercepts banned imports (<code className="font-bold">socket</code>, <code className="font-bold">urllib</code>, <code className="font-bold">subprocess</code>)</div>
                <div>• Blocks <code className="font-bold">os.environ</code> inspection to eliminate secret exfiltration risks completely</div>
              </div>

              <div className="flex items-center gap-2 text-[#0c7c4b] font-bold flex-wrap">
                <span className="px-2.5 py-1 rounded-md bg-[#9bf1cd] border border-[#252b3a]">[Ephemeral Sandbox Runner]</span>
                <span>➔</span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-[#252b3a]">[Verified Stdout & PNG Artifacts]</span>
              </div>
              <div className="pl-4 border-l-2 border-[#252b3a]/30 space-y-1 text-[#4a5568]">
                <div>• Hard resource limits: 256MB RAM cap, 0.5 CPU quota, 10s watchdog timeout</div>
                <div>• Zero network egress (--network none): Outbound sockets disabled</div>
                <div>• Non-root unprivileged execution (uid 1000)</div>
                <div>• Ephemeral lifecycle: Wiped immediately after execution completes</div>
              </div>
            </div>
          </div>

          {/* 4 Containment Pillars */}
          <div>
            <h3 className="text-xs font-black text-[#6434df] uppercase tracking-wider mb-3 font-display">
              2. The 4 Blast Radius Zero Pillars
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#e9fff5] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
                <div className="flex items-center gap-2 text-[#0c7c4b] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>1. Process Isolation</span>
                </div>
                <p className="text-[#4a5568] text-xs">
                  Sandbox runs in isolated ephemeral environments. Host OS, production databases, and main web app runtime are physically segregated.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#ffecf5] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
                <div className="flex items-center gap-2 text-[#b5146d] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>2. Secret Hygiene</span>
                </div>
                <p className="text-[#4a5568] text-xs">
                  Zero host API keys, Vultr credentials, or environment secrets are injected into the sandbox. AST Sentinel catches environment probing.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#fff8e7] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
                <div className="flex items-center gap-2 text-[#8c6b00] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>3. Resource Bounds</span>
                </div>
                <p className="text-[#4a5568] text-xs">
                  Hard cgroup caps (256MB RAM, 0.5 CPU) and asynchronous watchdog timers terminate runaway memory or CPU infinite loops within 10.0s.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#f1ebff] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a]">
                <div className="flex items-center gap-2 text-[#6434df] font-black text-xs mb-1.5 font-display">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>4. Lifecycle Discipline</span>
                </div>
                <p className="text-[#4a5568] text-xs">
                  Workspaces are strictly ephemeral. They are destroyed and wiped clean immediately upon task completion, guaranteeing zero state persistence.
                </p>
              </div>
            </div>
          </div>

          {/* Vultr Deployment Specs */}
          <div className="p-5 rounded-2xl bg-[#ffd05b]/20 border-[2.5px] border-[#252b3a] shadow-[3px_3px_0_#252b3a]">
            <div className="font-black text-[#253044] mb-1 flex items-center gap-2 font-display">
              <Server className="w-4 h-4 text-[#6434df]" />
              <span>Vultr Cloud VM Production Deployment</span>
            </div>
            <p className="text-xs text-[#4a5568] mb-2 font-reading">
              Deployable in 2 minutes on any Vultr Cloud Compute instance using our automated bash script:
            </p>
            <pre className="p-3 rounded-xl bg-[#252b3a] font-mono text-xs text-[#9bf1cd] border-[2px] border-[#252b3a] overflow-x-auto">
              curl -sSL https://raw.githubusercontent.com/VG31OP/vultr-blastshield/master/deploy/install_vultr.sh | sudo bash
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
