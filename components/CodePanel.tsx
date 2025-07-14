import React from 'react';

interface CodePanelProps {
  content: string;
}

export const CodePanel: React.FC<CodePanelProps> = ({ content }) => {
  return (
    <div className="flex-grow w-full h-full bg-gray-900/80 rounded-b-2xl overflow-hidden">
      <pre className="w-full h-full p-4 text-sm text-gray-300 font-mono overflow-auto">
        <code>{content}</code>
      </pre>
    </div>
  );
};