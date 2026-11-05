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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header
        health={health}
        onOpenArchitecture={() => setArchitectureOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
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

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500">
        <p>
          Vultr BlastShield — Built for the <span className="text-cyan-400 font-semibold">Vultr: Agent Rush Hackathon</span> on LabLab.ai. Licensed under MIT.
        </p>
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
