import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 flex items-center justify-between p-4 glass-panel shadow-lg mx-6 mt-6 rounded-2xl">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <svg className="w-10 h-10" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="logoGradient" x1="0.5" y1="0" x2="0.5" y2="1">
                        <stop stopColor="#0EA5E9"/>
                        <stop offset="1" stopColor="#A855F7"/>
                    </linearGradient>
                </defs>
                <path d="M41.3333 155V125.417C41.3333 123.528 42.4527 121.826 44.1332 121.086L74.1332 106.086C77.4208 104.424 81.2458 104.424 84.5334 106.086L114.533 121.086C116.214 121.826 117.333 123.528 117.333 125.417V155" stroke="url(#logoGradient)" strokeWidth="10"/>
                <path d="M89.3333 71.6667L116.239 44.761C117.931 43.0691 120.326 42.4571 122.48 43.141L151.814 52.8077C153.968 53.4916 155.333 55.4583 155.333 57.6907V95C155.333 99.4183 151.752 103 147.333 103H102.667C98.2484 103 94.6667 99.4183 94.6667 95V76.6667C94.6667 74.4565 92.8768 72.4883 90.6973 71.938L89.3333 71.6667Z" stroke="url(#logoGradient)" strokeWidth="10"/>
                <path d="M69.3333 71.6667L42.4279 44.761C40.7361 43.0691 38.3403 42.4571 36.1868 43.141L6.85348 52.8077C4.69956 53.4916 3.33333 55.4583 3.33333 57.6907V95C3.33333 99.4183 6.91498 103 11.3333 103H56C60.4183 103 64 99.4183 64 95V76.6667C64 74.4565 65.7899 72.4883 67.9694 71.938L69.3333 71.6667Z" stroke="url(#logoGradient)" strokeWidth="10"/>
                <path d="M79.3333 5V46.3333" stroke="url(#logoGradient)" strokeWidth="10" strokeLinecap="round"/>
                <path d="M54 30.3333L79.3333 46.3333" stroke="url(#logoGradient)" strokeWidth="10" strokeLinecap="round"/>
                <path d="M104.667 30.3333L79.3333 46.3333" stroke="url(#logoGradient)" strokeWidth="10" strokeLinecap="round"/>
            </svg>
        </div>
        <h1 className="text-xl font-bold text-white tracking-wider">AI Underdog</h1>
      </div>
      <a href="https://github.com/google/genai-js" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
    </header>
  );
};