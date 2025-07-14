import React from 'react';

interface PreviewPanelProps {
  code: string;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ code }) => {
  return (
    <div className="flex-grow w-full h-full bg-white rounded-b-2xl overflow-hidden">
      <iframe
        srcDoc={code}
        title="Live Preview"
        className="w-full h-full border-0"
        sandbox="allow-scripts"
      />
    </div>
  );
};
