import React, { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import MessageBubble from './components/MessageBubble';
import LoadingMessage from './components/LoadingMessage';
import ChatInput from './components/ChatInput';
import ApiKeyModal from './components/ApiKeyModal';
import { Message } from './types';
import { initializeGemini, sendMessageToInstructor, geminiService } from './services/geminiApi';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'chat'>('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiError, setApiError] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      const success = initializeGemini(savedApiKey);
      if (!success) {
        setShowApiModal(true);
        setApiError('Saved API key is invalid. Please enter a new one.');
      }
    }
  }, []);

  const handleApiKeySubmit = (apiKey: string) => {
    const success = initializeGemini(apiKey);
    if (success) {
      localStorage.setItem('gemini_api_key', apiKey);
      setShowApiModal(false);
      setApiError('');
    } else {
      setApiError('Invalid API key. Please check your key and try again.');
    }
  };

  const handleGetStarted = () => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (!savedApiKey || !geminiService.isReady()) {
      setShowApiModal(true);
      setApiError('Please configure your Google AI API key to start learning.');
      return;
    }

    // Add welcome message when starting chat
    const welcomeMessage: Message = {
      id: '1',
      text: `Listen up. I'm your DSA instructor, and I don't mess around.

I'm here to teach you Data Structures and Algorithms like they do at Google. No hand-holding, no sugar-coating.

**What I'll help you with:**
• Algorithm analysis and Big O notation
• Data structure implementations and use cases  
• Problem-solving strategies for coding interviews
• Code optimization and edge case handling

**What I WON'T waste time on:**
• Web development frameworks
• Database design
• System design (that's a different beast)
• Anything that isn't pure algorithms and data structures

Ask me a real DSA question and I'll give you the complete breakdown with theory, complexity analysis, and production-ready code. Try to ask me about React or CSS and you'll get the verbal thrashing you deserve.

Now, what algorithm are you struggling with?`,
      sender: 'instructor',
      timestamp: new Date(),
    };

    setMessages([welcomeMessage]);
    setCurrentView('chat');
  };

  const handleSendMessage = async (text: string) => {
    if (!geminiService.isReady()) {
      setShowApiModal(true);
      setApiError('Please configure your Google AI API key first.');
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get AI response from Gemini
      const response = await sendMessageToInstructor(text);
      setMessages(prev => [...prev, response]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Connection error. Even I can\'t teach algorithms without a working connection. Check your API key and try again.',
        sender: 'instructor',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setMessages([]);
  };

  if (currentView === 'home') {
    return (
      <div className="h-screen bg-slate-950">
        <Header showBackButton={false} onBackClick={() => {}} />
        <HomePage onGetStarted={handleGetStarted} />
        <ApiKeyModal 
          isOpen={showApiModal}
          onApiKeySubmit={handleApiKeySubmit}
          error={apiError}
        />
      </div>
    );
  }

  return (
    <div className="h-screen bg-slate-950 flex flex-col">
      <Header showBackButton={true} onBackClick={handleBackToHome} />
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <LoadingMessage />}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>

      <ApiKeyModal 
        isOpen={showApiModal}
        onApiKeySubmit={handleApiKeySubmit}
        error={apiError}
      />
    </div>
  );
}

export default App;