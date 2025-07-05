import React from 'react';
import { BookOpen, Code2, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  showBackButton: boolean;
  onBackClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ showBackButton, onBackClick }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button
            onClick={onBackClick}
            className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </button>
        )}
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Code2 className="w-8 h-8 text-blue-500" />
            <BookOpen className="w-4 h-4 text-green-500 absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DSA Instructor</h1>
            <p className="text-sm text-slate-400">Google-Level Algorithm Mastery</p>
          </div>
        </div>
        
        {showBackButton && (
          <div className="ml-auto">
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Instructor Online</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;