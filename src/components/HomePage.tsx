import React from 'react';
import { Code2, BookOpen, ArrowRight, Zap, Target, Trophy, Brain } from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Google-Level Instruction",
      description: "Learn from an AI instructor trained to teach like senior engineers at top tech companies"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Code Analysis",
      description: "Get instant feedback on time complexity, space complexity, and optimization opportunities"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Interview-Focused",
      description: "Master the exact algorithms and data structures asked in FAANG interviews"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Practice Problems",
      description: "Curated problem sets that build your skills progressively from basics to advanced"
    }
  ];

  const topics = [
    "Arrays & Strings", "Linked Lists", "Stacks & Queues", "Trees & Graphs",
    "Dynamic Programming", "Sorting & Searching", "Hash Tables", "Recursion",
    "Greedy Algorithms", "Backtracking", "Bit Manipulation", "System Design"
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <Code2 className="w-16 h-16 text-blue- 500" />
              <BookOpen className="w-8 h-8 text-green-500 absolute -bottom-2 -right-2" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">DSA</span>
            <br />Like a Googler
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Data Structures & Algorithms instruction from an AI mentor 
            who teaches like a senior engineer at Google. Get ready for FAANG interviews.
          </p>
          
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="text-lg">Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Why This Instructor is Different
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-colors">
                <div className="text-blue-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Topics Section */}
      <div className="px-6 py-20 bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            Master Every Core Topic
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topics.map((topic, index) => (
              <div key={index} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-center hover:border-blue-500 hover:bg-slate-700 transition-all duration-300 cursor-pointer">
                <span className="text-slate-300 font-medium text-sm">
                  {topic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Think Like a Google Engineer?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Stop struggling with algorithms. Start mastering them with an instructor who doesn't waste your time.
          </p>
          <button
            onClick={onGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="text-lg">Start Learning Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;