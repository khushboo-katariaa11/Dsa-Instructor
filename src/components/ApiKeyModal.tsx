import React, { useState } from 'react';
import { Key, AlertCircle, CheckCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onApiKeySubmit: (apiKey: string) => void;
  error?: string;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onApiKeySubmit, error }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setIsSubmitting(true);
    onApiKeySubmit(apiKey.trim());
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg border border-slate-600 p-6 w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <Key className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-white">Connect to Google AI</h2>
        </div>
        
        <p className="text-slate-300 mb-4 text-sm leading-relaxed">
          To use the DSA Instructor, you need to provide your Google Generative AI API key. 
          Get one free at <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Google AI Studio</a>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-slate-300 mb-2">
              Google AI API Key
            </label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-700 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="text-red-300 text-sm">{error}</span>
            </div>
          )}

          <div className="flex items-center gap-2 p-3 bg-green-900/20 border border-green-700 rounded-lg">
            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
            <span className="text-green-300 text-sm">Your API key is stored locally and never sent to our servers</span>
          </div>

          <button
            type="submit"
            disabled={!apiKey.trim() || isSubmitting}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
          >
            {isSubmitting ? 'Connecting...' : 'Connect to Instructor'}
          </button>
        </form>

        <div className="mt-4 p-3 bg-slate-700 rounded-lg">
          <p className="text-xs text-slate-400">
            <strong>Privacy:</strong> Your API key is stored in your browser's local storage and is only used to communicate directly with Google's AI service.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;