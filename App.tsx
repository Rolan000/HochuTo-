import React, { useState } from 'react';
import { CategorySelector } from './components/CategorySelector';
import { ResultView } from './components/ResultView';
import { Category, Suggestion } from './types';
import { generateIdea } from './services/geminiService';
import { Sparkles, Terminal } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [lastCategory, setLastCategory] = useState<Category | null>(null);

  const handleSelectCategory = async (category: Category) => {
    setLoading(true);
    setLastCategory(category);
    setSuggestion(null); // Clear previous result to show loading cleanly

    try {
      const result = await generateIdea(category);
      setSuggestion(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastCategory) {
      handleSelectCategory(lastCategory);
    }
  };

  const handleReset = () => {
    setSuggestion(null);
    setLastCategory(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[#0f172a] -z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black -z-10" />
      
      {/* Ambient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      <header className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 text-white/80">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h1 className="font-black text-xl tracking-tighter">ХОЧУ!</h1>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
           <Terminal size={12} />
           <span>GEMINI POWERED</span>
        </div>
      </header>

      <main className="w-full max-w-3xl flex flex-col items-center z-10 min-h-[400px] justify-center">
        
        {loading ? (
            <div className="flex flex-col items-center gap-6 animate-pulse">
                <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 animate-spin blur-md" />
                <h2 className="text-2xl font-bold text-white tracking-widest uppercase">
                    Придумываю...
                </h2>
                <p className="text-slate-400">Соединяюсь с космосом...</p>
            </div>
        ) : suggestion ? (
            <ResultView 
                suggestion={suggestion} 
                onReset={handleReset} 
                onRetry={handleRetry} 
            />
        ) : (
            <div className="flex flex-col items-center gap-8 w-full animate-[fadeIn_0.5s_ease-out]">
                <div className="text-center space-y-2 mb-4">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        ЧЕГО-ТО<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            ХОЧЕТСЯ?
                        </span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Нажми кнопку, и я скажу тебе, что делать, чтобы перестать скучать.
                    </p>
                </div>
                
                <CategorySelector onSelect={handleSelectCategory} disabled={loading} />
            </div>
        )}

      </main>

      <footer className="absolute bottom-6 text-center text-slate-600 text-xs">
         Помощник от скуки • The Wantinator 3000
      </footer>
    </div>
  );
};

export default App;