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

  const getStepIcon = (type: StepType, status: string) => {
    switch (type) {
      case 'thought':
      case 'plan':
        return <Lightbulb className="w-4 h-4 text-amber-400" />;
      case 'code_generation':
        return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'security_check':
        return status === 'blocked' ? (
          <ShieldAlert className="w-4 h-4 text-red-400" />
        ) : (
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        );
      case 'sandbox_dispatch':
      case 'execution_output':
        return <Terminal className="w-4 h-4 text-blue-400" />;
      case 'self_healing':
        return <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />;
      case 'containment_alert':
        return <ShieldAlert className="w-4 h-4 text-red-400" />;
      case 'final_answer':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      default:
        return <Terminal className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStepBorder = (type: StepType, status: string) => {
    if (status === 'blocked' || type === 'containment_alert') {
      return 'border-red-500/40 bg-red-950/20';
    }
    if (type === 'code_generation') {
      return 'border-cyan-500/30 bg-cyan-950/10';
    }
    if (type === 'security_check') {
      return 'border-emerald-500/30 bg-emerald-950/10';
    }
    return 'border-slate-800 bg-slate-900/50';
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-400" />
          <h2 className="text-sm font-semibold text-slate-100 tracking-wide uppercase">
            Live Execution & Containment Trace
          </h2>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Agent Acting in Sandbox...</span>
          </div>
        )}
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.length === 0 && !isLoading && (
          <div className="p-8 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-lg">
            Awaiting mission dispatch. Select a preset or type an instruction above to trigger agent execution.
          </div>
        )}

        {steps.map((step, idx) => {
          const isCollapsed = collapsedSteps[idx];
          const isCode = step.step_type === 'code_generation';

          return (
            <div
              key={idx}
              className={`rounded-lg border ${getStepBorder(
                step.step_type,
                step.status
              )} p-3 transition duration-200`}
            >
              {/* Step Header */}
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleCollapse(idx)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1 rounded bg-slate-950 border border-slate-800">
                    {getStepIcon(step.step_type, step.status)}
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200">{step.title}</span>
                    <span className="ml-2 text-[10px] font-mono text-slate-500 uppercase">
                      [{step.step_type}]
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
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1"
                      title="Copy code"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                  {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Step Content */}
              {!isCollapsed && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/60">
                  {isCode ? (
                    <pre className="p-3 rounded bg-slate-950 font-mono text-xs text-cyan-300 overflow-x-auto border border-slate-800/80 leading-relaxed">
                      <code>{step.content}</code>
                    </pre>
                  ) : (
                    <div className="font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed bg-slate-950/70 p-3 rounded border border-slate-800/60">
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
