'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-slate-950/80 border-b border-cyan-500/20 px-4 py-2 text-center text-xs text-slate-400 flex items-center justify-center gap-2 backdrop-blur-md">
      <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
      <span>
        <strong className="text-cyan-300 font-medium">Educational Notice:</strong> Content on this platform is for educational purposes only and should not be considered financial advice.
      </span>
    </div>
  );
};
