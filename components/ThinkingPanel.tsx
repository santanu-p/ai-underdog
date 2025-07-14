import React from 'react';
import { ThinkingIcon, CheckIcon } from '../constants.tsx';

interface ThinkingPanelProps {
  summary: string | null;
  thinkingSteps: string[];
  isLoading: boolean;
}

const Placeholder = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
    <svg className="w-16 h-16 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.455l-1.178-.398 1.178-.398a3.375 3.375 0 002.455-2.455l.398-1.178.398 1.178a3.375 3.375 0 002.455 2.455l1.178.398-1.178.398a3.375 3.375 0 00-2.455 2.455z" />
    </svg>
    <p className="font-semibold">AI Thinking Process Will Appear Here</p>
    <p className="text-sm">Describe your project and click "Generate" to see the AI's plan.</p>
  </div>
);

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {[...Array(5)].map((_, i) => (
       <div key={i} className="flex items-start space-x-3">
         <div className="h-5 w-5 bg-slate-700 rounded-full flex-shrink-0"></div>
         <div className="h-3 bg-slate-700 rounded w-full mt-1"></div>
       </div>
    ))}
  </div>
);


export const ThinkingPanel: React.FC<ThinkingPanelProps> = ({ summary, thinkingSteps, isLoading }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 glass-panel rounded-2xl shadow-lg flex-grow min-h-[200px]">
      <h2 className="text-lg font-semibold text-white flex items-center">
        <ThinkingIcon />
        AI Thinking Process
      </h2>
      <div className="flex-grow overflow-y-auto pr-2">
        {isLoading ? (
            <LoadingSkeleton />
        ) : thinkingSteps.length === 0 ? (
            <Placeholder /> 
        ) : (
          <div className="space-y-3">
             {summary && <p className="text-gray-300 pb-3 border-b border-slate-700 mb-3 font-semibold">{summary}</p>}
             <ul className="space-y-2.5">
                {thinkingSteps.map((step, index) => (
                    <li key={index} className="flex items-start text-sm text-slate-400 transition-opacity duration-500" style={{ animationDelay: `${index * 100}ms`}}>
                        <CheckIcon />
                        <span>{step}</span>
                    </li>
                ))}
             </ul>
          </div>
        )}
      </div>
    </div>
  );
};