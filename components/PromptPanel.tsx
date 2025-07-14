import React from 'react';
import { GenerateIcon } from '../constants.tsx';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onGenerate: () => void;
  error: string | null;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({
  prompt,
  setPrompt,
  isLoading,
  onGenerate,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4 glass-panel rounded-2xl shadow-lg h-full">
      <div className="flex flex-col flex-grow">
        <label htmlFor="main-prompt" className="block text-sm font-semibold text-gray-300 mb-2">
          Describe Your Website
        </label>
        <textarea
          id="main-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A modern portfolio for a 3D artist with a dark, futuristic theme..."
          className="w-full flex-grow p-3 bg-slate-900/70 border border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all resize-none text-gray-200 placeholder-gray-500"
          rows={6}
        />
      </div>
      
      {error && (
        <div className="p-3 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-sm transition-all duration-300">
          <p className="font-bold mb-1">An Error Occurred</p>
          <p className="font-mono text-xs">{error}</p>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex items-center justify-center py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-lg disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 shadow-lg hover:shadow-sky-500/40 disabled:shadow-none transform hover:scale-105 active:scale-100"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            <GenerateIcon />
            Generate Project
          </>
        )}
      </button>
    </div>
  );
};