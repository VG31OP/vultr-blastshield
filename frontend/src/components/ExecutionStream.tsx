import React, { useState } from 'react';
import { 
  Lightbulb, 
  Code2, 
  ShieldCheck, 
  ShieldAlert, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  Check,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import type { ExecutionStep, StepType } from '../types';

interface ExecutionStreamProps {
  steps: ExecutionStep[];
  isLoading: boolean;
}

export const ExecutionStream: React.FC<ExecutionStreamProps> = ({ steps, isLoading }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [collapsedSteps, setCollapsedSteps] = useState<Record<number, boolean>>({});

  const toggleCollapse = (idx: number) => {
    setCollapsedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getStepBadge = (type: StepType, status: string) => {
    switch (type) {
      case 'thought':
      case 'plan':
        return {
          bg: 'bg-[#ffd05b]',
          icon: <Lightbulb className="w-4 h-4 text-[#252b3a]" />,
        };
      case 'code_generation':
        return {
          bg: 'bg-[#9bf1cd]',
          icon: <Code2 className="w-4 h-4 text-[#252b3a]" />,
        };
      case 'security_check':
        return {
          bg: status === 'blocked' ? 'bg-[#ff78c5]' : 'bg-[#9bf1cd]',
          icon: status === 'blocked' ? (
            <ShieldAlert className="w-4 h-4 text-[#252b3a]" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-[#252b3a]" />
          ),
        };
      case 'sandbox_dispatch':
      case 'execution_output':
        return {
          bg: 'bg-[#f1ebff]',
          icon: <Terminal className="w-4 h-4 text-[#6434df]" />,
        };
      case 'self_healing':
        return {
          bg: 'bg-[#ff78c5]',
          icon: <RefreshCw className="w-4 h-4 text-[#252b3a] animate-spin" />,
        };
      case 'containment_alert':
        return {
          bg: 'bg-[#ff78c5]',
          icon: <ShieldAlert className="w-4 h-4 text-[#252b3a]" />,
        };
      case 'final_answer':
        return {
          bg: 'bg-[#9bf1cd]',
          icon: <CheckCircle2 className="w-4 h-4 text-[#252b3a]" />,
        };
      default:
        return {
          bg: 'bg-white',
          icon: <Terminal className="w-4 h-4 text-[#252b3a]" />,
        };
    }
  };

  return (
    <div className="geo-panel bg-white p-6 relative overflow-visible shadow-[5px_5px_0_#252b3a]">
      {/* Playful Book Tab */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-md bg-[#ff78c5] border-[2px] border-[#252b3a] text-[11px] font-black uppercase tracking-wider text-[#252b3a] shadow-[2px_2px_0_#252b3a]">
        Execution Activity Log
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 pb-4 border-b-[2px] border-[#252b3a]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#f1ebff] border-[2px] border-[#252b3a] shadow-[2px_2px_0_#252b3a] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#6434df]" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#253044] font-display">
              Live Execution & Containment Trace
            </h2>
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-bold text-[#6434df] font-mono bg-[#f1ebff] px-3 py-1 rounded-full border-[2px] border-[#252b3a]">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Agent Acting in Sandbox...</span>
          </div>
        )}
      </div>

      {/* Step Sequence with Connecting Visual Structure */}
      <div className="space-y-4 mt-5">
        {steps.length === 0 && !isLoading && (
          <div className="p-8 text-center text-[#526077] text-xs border-[2.5px] border-dashed border-[#252b3a]/30 rounded-xl bg-[#fffdf5]">
            Awaiting mission dispatch. Select a preset or type an instruction above to trigger agent execution.
          </div>
        )}

        {steps.map((step, idx) => {
          const isCollapsed = collapsedSteps[idx];
          const isCode = step.step_type === 'code_generation';
          const badge = getStepBadge(step.step_type, step.status);
          const isAlert = step.step_type === 'containment_alert' || step.status === 'blocked';

          return (
            <div
              key={idx}
              className={`rounded-2xl border-[2.5px] border-[#252b3a] ${
                isAlert ? 'bg-[#ffecf5]' : isCode ? 'bg-[#f8f7ff]' : 'bg-[#fffdf5]'
              } p-4 shadow-[3px_3px_0_#252b3a] transition-all`}
            >
              {/* Step Header */}
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleCollapse(idx)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl border-[2px] border-[#252b3a] shadow-[1px_1px_0_#252b3a] flex items-center justify-center ${badge.bg}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#253044] font-display">
                      {step.step_index}. {step.title}
                    </span>
                    <span className="ml-2.5 text-[11px] font-mono font-bold text-[#6434df] uppercase bg-white px-2 py-0.5 rounded border border-[#252b3a]">
                      {step.step_type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isCode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(step.content, idx);
                      }}
                      className="p-1.5 rounded-lg bg-white border-[2px] border-[#252b3a] hover:bg-[#ffd05b] text-[#252b3a] shadow-[1px_1px_0_#252b3a] text-xs flex items-center gap-1 cursor-pointer"
                      title="Copy code"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-[#0c7c4b]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  <div className="w-6 h-6 rounded-md bg-white border border-[#252b3a] flex items-center justify-center">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4 text-[#252b3a]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#252b3a]" />
                    )}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {!isCollapsed && (
                <div className="mt-3 pt-3 border-t-[2px] border-[#252b3a]/15">
                  {isCode ? (
                    <pre className="p-4 rounded-xl bg-[#252b3a] font-mono text-xs text-[#9bf1cd] overflow-x-auto border-[2px] border-[#252b3a] shadow-[inset_2px_2px_0_rgba(0,0,0,0.3)] leading-relaxed">
                      <code>{step.content}</code>
                    </pre>
                  ) : (
                    <div className="font-mono text-xs text-[#253044] whitespace-pre-wrap leading-relaxed bg-white p-3.5 rounded-xl border-[2px] border-[#252b3a] shadow-[1px_1px_0_#252b3a]">
                      {step.content}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
