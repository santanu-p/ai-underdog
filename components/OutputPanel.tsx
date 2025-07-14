import React from 'react';
import { CodePanel } from './CodePanel';
import { PreviewPanel } from './PreviewPanel';
import { DownloadIcon, DeployIcon, VisitSiteIcon, CodeIcon, PreviewIcon } from '../constants.tsx';
import { OutputView } from '../App';

interface OutputPanelProps {
  code: string;
  outputView: OutputView;
  setOutputView: (view: OutputView) => void;
  onDownload: () => void;
  onDeploy: () => void;
  isLoading: boolean;
  isDeploying: boolean;
  deploymentUrl: string | null;
  deploymentError: string | null;
}

const ToggleButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-sky-500/20 text-sky-400'
        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export const OutputPanel: React.FC<OutputPanelProps> = ({
  code,
  outputView,
  setOutputView,
  onDownload,
  onDeploy,
  isLoading,
  isDeploying,
  deploymentUrl,
  deploymentError,
}) => {
  const hasGeneratedCode = code.length > 0;

  return (
    <div className="flex flex-col glass-panel rounded-2xl shadow-lg h-full">
      <div className="flex-shrink-0 flex items-center justify-between p-2 bg-slate-900/40 rounded-t-2xl border-b border-sky-500/20">
        <div className="p-1 flex items-center space-x-1 bg-slate-900/50 rounded-lg">
          <ToggleButton
              label="Code"
              icon={<CodeIcon />}
              isActive={outputView === 'code'}
              onClick={() => setOutputView('code')}
            />
            <ToggleButton
              label="Preview"
              icon={<PreviewIcon />}
              isActive={outputView === 'preview'}
              onClick={() => setOutputView('preview')}
            />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {deploymentUrl ? (
            <a
              href={deploymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-green-400"
            >
              <VisitSiteIcon />
              <span>Visit Site</span>
            </a>
          ) : (
            <button
              onClick={onDeploy}
              disabled={!hasGeneratedCode || isLoading || isDeploying}
              className="flex items-center space-x-2 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
              title="Deploy to Vercel"
            >
              {isDeploying ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <DeployIcon />
                  <span>Deploy</span>
                </>
              )}
            </button>
          )}
          <button
            onClick={onDownload}
            disabled={!hasGeneratedCode || isLoading || isDeploying}
            className="flex items-center space-x-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500"
            title="Download index.html"
          >
            <DownloadIcon />
            <span>Download</span>
          </button>
        </div>
      </div>
      
      <div className="flex-grow w-full h-full min-h-0 flex relative">
        {outputView === 'code' ? (
           <CodePanel content={code || "Click 'Generate Project' to see the code here."} />
        ) : (
           <PreviewPanel code={code} />
        )}

        {deploymentError && (
            <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-900/80 border border-red-700 text-red-300 rounded-lg text-sm shadow-lg">
                <p className="font-bold mb-1">Deployment Failed</p>
                <p className="font-mono text-xs">{deploymentError}</p>
            </div>
        )}
      </div>
    </div>
  );
};