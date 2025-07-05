export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'instructor';
  timestamp: Date;
  hasCode?: boolean;
  codeBlocks?: CodeBlock[];
  practiceProblems?: string[];
}

export interface CodeBlock {
  language: string;
  code: string;
  title?: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  inputValue: string;
}