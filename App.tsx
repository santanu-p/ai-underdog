import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptPanel } from './components/PromptPanel';
import { OutputPanel } from './components/OutputPanel';
import { ThinkingPanel } from './components/ThinkingPanel';
import { generateWebsiteCode } from './services/geminiService';
import { deployToVercel } from './services/vercelService';
import { INITIAL_CODE, INITIAL_PROMPT } from './constants.tsx';
import { BackgroundAnimation } from './components/BackgroundAnimation.tsx';

export type OutputView = 'code' | 'preview';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(INITIAL_PROMPT);
  const [code, setCode] = useState<string>(INITIAL_CODE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [projectSummary, setProjectSummary] = useState<string | null>("This is AI Underdog. Describe your idea and click Generate!");
  const [thinkingSteps, setThinkingSteps] = useState<string[]>([]);
  const [outputView, setOutputView] = useState<OutputView>('preview');

  // Deployment state
  const [isDeploying, setIsDeploying] = useState<boolean>(false);
  const [deploymentUrl, setDeploymentUrl] = useState<string | null>(null);
  const [deploymentError, setDeploymentError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setProjectSummary('The AI is formulating a plan...');
    setThinkingSteps([]);
    setDeploymentUrl(null);
    setDeploymentError(null);
    setCode('');

    try {
      const { code: generatedCode, summary, thinkingSteps: newThinkingSteps } = await generateWebsiteCode(prompt);
      setProjectSummary(summary);
      setThinkingSteps(newThinkingSteps);
      setCode(generatedCode);
      setOutputView('preview'); // Switch to preview after successful generation
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(e);
      setError(`Failed to generate code: ${errorMessage}`);
      setCode(INITIAL_CODE);
      setProjectSummary(null);
      setThinkingSteps([]);
      setOutputView('code'); // Revert to code view on error
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleDownload = useCallback(() => {
    if (!code) return;
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code]);

  const handleDeploy = useCallback(async () => {
    if (!code) return;
    setIsDeploying(true);
    setDeploymentUrl(null);
    setDeploymentError(null);
    try {
      const url = await deployToVercel(code, prompt);
      setDeploymentUrl(url);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during deployment.';
      console.error(e);
      setDeploymentError(errorMessage);
    } finally {
      setIsDeploying(false);
    }
  }, [code, prompt]);

  return (
    <div className="relative min-h-screen w-full">
      <BackgroundAnimation />
      <div className="relative z-10 flex flex-col h-screen font-sans text-gray-200">
        <Header />
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 overflow-hidden">
          {/* Left Column */}
          <div className="flex flex-col gap-6 overflow-y-auto pr-2">
            <PromptPanel
              prompt={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading || isDeploying}
              onGenerate={handleGenerate}
              error={error}
            />
            <ThinkingPanel summary={projectSummary} thinkingSteps={thinkingSteps} isLoading={isLoading} />
          </div>
          {/* Right Column */}
          <div className="flex flex-col h-full min-h-0">
            <OutputPanel
              code={code}
              outputView={outputView}
              setOutputView={setOutputView}
              onDownload={handleDownload}
              onDeploy={handleDeploy}
              isLoading={isLoading}
              isDeploying={isDeploying}
              deploymentUrl={deploymentUrl}
              deploymentError={deploymentError}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;