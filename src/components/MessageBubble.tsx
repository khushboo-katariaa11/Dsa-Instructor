import React, { useState } from 'react';
import { User, GraduationCap, ChevronDown, ChevronUp } from 'lucide-react';
import { Message } from '../types';
import CodeBlock from './CodeBlock';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const [showPracticeProblems, setShowPracticeProblems] = useState(false);
  const isUser = message.sender === 'user';

  const formatMessageText = (text: string) => {
    // Remove asterisks for bold formatting and replace with proper HTML
    let formattedText = text
      // Replace **text** with <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Replace *text* with <em>text</em>
      .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
      // Replace bullet points
      .replace(/^• /gm, '→ ')
      .replace(/^- /gm, '→ ');

    // Split text by code blocks and format accordingly
    const parts = formattedText.split(/```(\w+)?\n([\s\S]*?)```/g);
    const elements: React.ReactNode[] = [];
    
    for (let i = 0; i < parts.length; i++) {
      if (i % 3 === 0 && parts[i]) {
        // Regular text - render with HTML formatting
        elements.push(
          <div 
            key={i} 
            className="whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: parts[i] }}
          />
        );
      } else if (i % 3 === 2 && parts[i]) {
        // Code block
        const language = parts[i - 1] || 'python';
        elements.push(
          <CodeBlock
            key={i}
            code={parts[i].trim()}
            language={language}
          />
        );
      }
    }
    
    return elements.length > 0 ? elements : [
      <div 
        key="default" 
        className="whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    ];
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-6`}>
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        isUser ? 'bg-blue-600' : 'bg-gradient-to-br from-orange-500 to-red-600'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <GraduationCap className="w-5 h-5 text-white" />
        )}
      </div>
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`inline-block px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-blue-600 text-white rounded-br-md' 
            : 'bg-slate-800 text-slate-100 rounded-bl-md border border-slate-700'
        }`}>
          <div className="text-sm leading-relaxed">
            {formatMessageText(message.text)}
          </div>
        </div>
        
        {message.practiceProblems && message.practiceProblems.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowPracticeProblems(!showPracticeProblems)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-600"
            >
              <span className="text-sm text-slate-300">Practice Problems ({message.practiceProblems.length})</span>
              {showPracticeProblems ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>
            
            {showPracticeProblems && (
              <div className="mt-2 p-4 bg-slate-800 rounded-lg border border-slate-600">
                <h4 className="font-semibold text-green-500 mb-2">🎯 Practice These:</h4>
                <ul className="space-y-2">
                  {message.practiceProblems.map((problem, index) => (
                    <li key={index} className="text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-green-500 font-mono">{index + 1}.</span>
                      <span>{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className={`text-xs text-slate-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;