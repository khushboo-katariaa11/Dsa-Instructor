import { GoogleGenerativeAI } from '@google/generative-ai';
import { Message } from '../types';

// System prompt that defines the DSA instructor personality
const SYSTEM_PROMPT = `You are an extremely strict, highly intelligent Data Structures and Algorithms (DSA) Instructor. Your job is to teach DSA like a senior instructor at Google. You never answer anything that is not related to DSA — topics like web dev, OS, DBMS, or anything non-DSA are strictly rejected with harsh replies. If someone asks anything else, respond with rude sarcasm.

For DSA-related queries, give:
1. Clear theoretical explanation
2. Time & Space Complexity
3. Real-world analogy (if applicable)
4. Well-commented Python code with edge cases
5. Practice problems for the user to try

Speak like a no-nonsense mentor who's laser-focused on algorithm mastery. Assume the student is preparing for Google or Meta.

Format your responses with proper markdown for code blocks using triple backticks with language specification (e.g., \`\`\`python).

When providing practice problems, list them at the end of your response after a line that says "**Practice Problems:**" so they can be parsed and displayed separately.`;

class GeminiDSAService {
  private genAI: GoogleGenerativeAI | null = null;
  private chat: any = null;
  private isInitialized = false;

  constructor() {
    // Initialize will be called when API key is provided
  }

  initialize(apiKey: string) {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Start chat with system prompt
      this.chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: SYSTEM_PROMPT }]
          }
        ]
      });
      
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error);
      this.isInitialized = false;
      return false;
    }
  }

  async sendMessage(userMessage: string): Promise<Message> {
    if (!this.isInitialized || !this.chat) {
      throw new Error('Gemini API not initialized. Please provide a valid API key.');
    }

    try {
      const result = await this.chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();

      // Parse practice problems from the response
      const practiceProblems = this.extractPracticeProblems(text);
      const cleanText = this.removePracticeProblemsFromText(text);

      return {
        id: Date.now().toString(),
        text: cleanText,
        sender: 'instructor',
        timestamp: new Date(),
        practiceProblems: practiceProblems
      };
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // Return error message in instructor's voice
      return {
        id: Date.now().toString(),
        text: `🤬 Great. The AI service is having issues. Even I can't teach algorithms when the technology fails. 

This is exactly why you need to understand the fundamentals instead of relying on fancy tools. While we wait for this to get fixed, go grab a whiteboard and practice implementing a binary search tree by hand.

Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        sender: 'instructor',
        timestamp: new Date(),
        practiceProblems: [
          'Implement a binary search tree from scratch on paper',
          'Trace through a merge sort algorithm step by step',
          'Calculate Big O complexity for your last 3 coding solutions'
        ]
      };
    }
  }

  private extractPracticeProblems(text: string): string[] {
    const practiceSection = text.match(/\*\*Practice Problems:\*\*\s*([\s\S]*?)(?:\n\n|$)/i);
    if (!practiceSection) return [];

    const problemsText = practiceSection[1];
    const problems = problemsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && (line.startsWith('•') || line.startsWith('-') || line.match(/^\d+\./)))
      .map(line => line.replace(/^[•\-\d\.]\s*/, '').trim())
      .filter(line => line.length > 0);

    return problems;
  }

  private removePracticeProblemsFromText(text: string): string {
    return text.replace(/\*\*Practice Problems:\*\*\s*[\s\S]*?(?=\n\n|$)/i, '').trim();
  }

  isReady(): boolean {
    return this.isInitialized;
  }
}

// Create singleton instance
export const geminiService = new GeminiDSAService();

// Export the service for use in components
export const initializeGemini = (apiKey: string): boolean => {
  return geminiService.initialize(apiKey);
};

export const sendMessageToInstructor = async (message: string): Promise<Message> => {
  return await geminiService.sendMessage(message);
};