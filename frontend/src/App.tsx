import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ContainmentMonitor } from './components/ContainmentMonitor';
import { MissionControl } from './components/MissionControl';
import { ExecutionStream } from './components/ExecutionStream';
import { ArtifactViewer } from './components/ArtifactViewer';
import { ArchitectureModal } from './components/ArchitectureModal';
import type { 
  SystemHealth, 
  ContainmentMetrics, 
  ExecutionStep, 
  Artifact, 
  SecurityViolation 
} from './types';
import { fetchHealth, executeTask } from './services/api';

export const App: React.FC = () => {
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [metrics, setMetrics] = useState<ContainmentMetrics | null>(null);
  const [steps, setSteps] = useState<ExecutionStep[]>([]);
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [violations, setViolations] = useState<SecurityViolation[]>([]);
  const [status, setStatus] = useState<string>('standby');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [architectureOpen, setArchitectureOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchHealth()
      .then(data => setHealth(data))
      .catch(err => console.warn('Could not connect to backend health check:', err));
  }, []);

  const handleExecute = async (params: {
    prompt: string;
    task_type?: string;
    attack_vector?: string;
  }) => {
    setIsLoading(true);
    setStatus('running');
    setSteps([]);
    setArtifacts([]);
    setViolations([]);

    try {
      const result = await executeTask(params);
      setSteps(result.steps);
      setMetrics(result.metrics);
      setViolations(result.violations);
      setArtifacts(result.artifacts);
      setStatus(result.status);
    } catch (err: any) {
      console.error('Execution failed:', err);
      setStatus('error');
      setSteps(prev => [
        ...prev,
        {
          step_index: prev.length + 1,
          step_type: 'containment_alert',
          title: 'System Execution Error',
          content: err.message || 'An unexpected error occurred during execution.',
          status: 'failed',
          timestamp: Date.now() / 1000,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdf5] text-[#253044] flex flex-col font-reading relative overflow-x-hidden">
      {/* Decorative Geometric Pieces in Background (Fixed, non-intrusive) */}
      <div className="absolute top-24 right-8 w-14 h-14 rounded-full bg-[#ffd05b]/40 border-[2.5px] border-[#252b3a] pointer-events-none -z-0 hidden md:block" />
      <div className="absolute top-80 left-6 w-10 h-10 bg-[#ff78c5]/30 border-[2.5px] border-[#252b3a] rotate-45 pointer-events-none -z-0 hidden md:block" />
      <div className="absolute top-[48rem] right-12 w-12 h-8 rounded-t-full bg-[#9bf1cd]/40 border-[2.5px] border-[#252b3a] pointer-events-none -z-0 hidden md:block" />

      {/* Main Header */}
      <Header
        health={health}
        onOpenArchitecture={() => setArchitectureOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8 z-10">
        {/* Top: Blast Radius Zero Perimeter Monitor */}
        <ContainmentMonitor
          metrics={metrics}
          violations={violations}
          status={status}
        />

        {/* Center: Mission Control Form & One-Click Presets */}
        <MissionControl
          onExecute={handleExecute}
          isLoading={isLoading}
        />

        {/* Generated Artifacts Viewer */}
        <ArtifactViewer
          artifacts={artifacts}
        />

        {/* Bottom: Live Execution & Containment Trace */}
        <ExecutionStream
          steps={steps}
          isLoading={isLoading}
        />
      </main>

      {/* Inset Dark Slate Footer with Broad Curved Top */}
      <footer className="mt-12 border-t-[3px] border-[#252b3a] bg-[#252b3a] text-[#fffdf5] py-8 px-6 text-center text-xs rounded-t-[32px] shadow-[0_-4px_0_#6434df]">
        <div className="max-w-4xl mx-auto space-y-2">
          <p className="font-display font-black text-sm tracking-wide">
            Vultr BlastShield — Autonomous Agent Sandbox & Control Plane
          </p>
          <p className="text-[#b8b6c5] font-reading">
            Built for the <span className="text-[#ffd05b] font-bold">Vultr: Agent Rush Hackathon</span> on LabLab.ai. Licensed under the MIT Open Source License.
          </p>
        </div>
      </footer>

      {/* Architecture & Specs Modal */}
      <ArchitectureModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
      />
    </div>
  );
};

export default App;
