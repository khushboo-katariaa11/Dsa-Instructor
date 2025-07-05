import React from 'react';
import { GraduationCap } from 'lucide-react';

const LoadingMessage: React.FC = () => {
  return (
    <div className="flex gap-3 mb-6">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-orange-500 to-red-600">
        <GraduationCap className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex-1 max-w-3xl">
        <div className="inline-block px-4 py-3 rounded-2xl bg-slate-800 border border-slate-700 rounded-bl-md">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-slate-400">Instructor is thinking...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMessage;