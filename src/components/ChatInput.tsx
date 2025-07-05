import React, { useState, KeyboardEvent } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-slate-700 bg-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Input Area */}
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about Data Structures or Algorithms..."
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-2xl text-white placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed rounded-2xl transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Send</span>
          </button>
        </div>
        
        <div className="text-xs text-slate-500 mt-2 text-center">
          Press Enter to send • Shift + Enter for new line
        </div>
      </div>
    </div>
  );
};

export default ChatInput;