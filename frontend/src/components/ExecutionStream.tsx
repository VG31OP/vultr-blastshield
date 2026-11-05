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
          bg: 'bg-[#fbbf24]',
          icon: <Lightbulb className="w-4 h-4 text-[#090d16]" />,
        };
      case 'code_generation':
        return {
          bg: 'bg-[#34d399]',
          icon: <Code2 className="w-4 h-4 text-[#090d16]" />,
        };
      case 'security_check':
        return {
          bg: status === 'blocked' ? 'bg-[#f472b6]' : 'bg-[#34d399]',
          icon: status === 'blocked' ? (
            <ShieldAlert className="w-4 h-4 text-[#090d16]" />
          ) : (
            <ShieldCheck className="w-4 h-4 text-[#090d16]" />
          ),
        };
      case 'sandbox_dispatch':
      case 'execution_output':
        return {
          bg: 'bg-[#7c4dff]',
          icon: <Terminal className="w-4 h-4 text-white" />,
        };
      case 'self_healing':
        return {
          bg: 'bg-[#f472b6]',
          icon: <RefreshCw className="w-4 h-4 text-[#090d16] animate-spin" />,
        };
      case 'containment_alert':
        return {
          bg: 'bg-[#f472b6]',
          icon: <ShieldAlert className="w-4 h-4 text-[#090d16]" />,
        };
      case 'final_answer':
        return {
          bg: 'bg-[#34d399]',
          icon: <CheckCircle2 className="w-4 h-4 text-[#090d16]" />,
        };
      default:
        return {
          bg: 'bg-[#182238]',
          icon: <Terminal className="w-4 h-4 text-[#f1f5f9]" />,
        };
    }
  };

  return (
    <div className="geo-panel bg-[#131b2e] p-6 relative overflow-visible shadow-[5px_5px_0_#090d16]">
      {/* Playful Book Tab */}
      <div className="absolute -top-3.5 left-6 px-3.5 py-1 rounded-md bg-[#f472b6] border-[2px] border-[#090d16] text-[11px] font-black uppercase tracking-wider text-[#090d16] shadow-[2px_2px_0_#090d16]">
        Execution Activity Log
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 pb-4 border-b-[2px] border-[#2a3753]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#20153f] border-[2px] border-[#7c4dff]/50 shadow-[2px_2px_0_#090d16] flex items-center justify-center">
            <Terminal className="w-4 h-4 text-[#a78bfa]" />
          </div>
          <div>
            <h2 className="text-base font-black text-[#f1f5f9] font-display">
              Live Execution & Containment Trace
            </h2>
          </div>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-bold text-[#c4b5fd] font-mono bg-[#20153f] px-3 py-1 rounded-full border-[2px] border-[#7c4dff]/50">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Agent Acting in Sandbox...</span>
          </div>
        )}
      </div>

      {/* Step Sequence in Dark Mode */}
      <div className="space-y-4 mt-5">
        {steps.length === 0 && !isLoading && (
          <div className="p-8 text-center text-[#94a3b8] text-xs border-[2.5px] border-dashed border-[#2a3753] rounded-xl bg-[#0c1220]">
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
              className={`rounded-2xl border-[2.5px] ${
                isAlert
                  ? 'border-[#f472b6]/70 bg-[#2b0c1c]'
                  : isCode
                  ? 'border-[#7c4dff]/50 bg-[#161d33]'
                  : 'border-[#2a3753] bg-[#0e1628]'
              } p-4 shadow-[3px_3px_0_#090d16] transition-all`}
            >
              {/* Step Header */}
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleCollapse(idx)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl border-[2px] border-[#090d16] shadow-[1px_1px_0_#090d16] flex items-center justify-center ${badge.bg}`}>
                    {badge.icon}
                  </div>
                  <div>
                    <span className="text-sm font-black text-[#f1f5f9] font-display">
                      {step.step_index}. {step.title}
                    </span>
                    <span className="ml-2.5 text-[11px] font-mono font-bold text-[#c4b5fd] uppercase bg-[#1e293b] px-2 py-0.5 rounded border border-[#2a3753]">
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
                      className="p-1.5 rounded-lg bg-[#182238] border-[2px] border-[#2a3753] hover:bg-[#fbbf24] hover:text-[#090d16] text-[#cbd5e1] shadow-[1px_1px_0_#090d16] text-xs flex items-center gap-1 cursor-pointer"
                      title="Copy code"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-[#34d399]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  <div className="w-6 h-6 rounded-md bg-[#182238] border border-[#2a3753] flex items-center justify-center text-[#94a3b8]">
                    {isCollapsed ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Step Content */}
              {!isCollapsed && (
                <div className="mt-3 pt-3 border-t-[2px] border-[#2a3753]">
                  {isCode ? (
                    <pre className="p-4 rounded-xl bg-[#090d16] font-mono text-xs text-[#34d399] overflow-x-auto border-[2px] border-[#2a3753] shadow-[inset_2px_2px_0_rgba(0,0,0,0.5)] leading-relaxed">
                      <code>{step.content}</code>
                    </pre>
                  ) : (
                    <div className="font-mono text-xs text-[#f1f5f9] whitespace-pre-wrap leading-relaxed bg-[#0c1220] p-3.5 rounded-xl border-[2px] border-[#2a3753] shadow-[1px_1px_0_#090d16]">
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
