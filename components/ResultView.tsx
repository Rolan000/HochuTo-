import React from 'react';
import { Suggestion } from '../types';
import { Button } from './Button';
import { ArrowRight, RotateCcw, Share2, Check } from 'lucide-react';

interface ResultViewProps {
  suggestion: Suggestion;
  onReset: () => void;
  onRetry: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({ suggestion, onReset, onRetry }) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(`ХочуТо предложило мне: ${suggestion.title} - ${suggestion.description}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-[fadeIn_0.5s_ease-out]">
      <div 
        className="relative rounded-3xl p-8 text-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
        style={{
            background: `linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)`,
        }}
      >
        {/* Decorative Top Bar */}
        <div 
            className="absolute top-0 left-0 w-full h-2" 
            style={{ backgroundColor: suggestion.colorHex }}
        />

        {/* Emoji Badge */}
        <div className="relative -mt-16 mb-6">
             <div 
                className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-6xl shadow-2xl border-4 border-slate-900"
                style={{ backgroundColor: suggestion.colorHex }}
             >
                 {suggestion.emoji}
             </div>
        </div>

        <h2 className="text-3xl font-black mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            {suggestion.title}
        </h2>

        <p className="text-lg text-slate-300 mb-8 leading-relaxed font-medium">
            {suggestion.description}
        </p>

        {/* Details Grid */}
        <div className="bg-slate-800/50 rounded-xl p-4 mb-8 text-left border border-white/5 space-y-3">
            <div className="flex items-start gap-3">
                <span className="bg-slate-700/50 p-1 rounded text-lg">🚀</span>
                <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Первый шаг</p>
                    <p className="text-slate-200">{suggestion.actionItem}</p>
                </div>
            </div>
            <div className="h-px bg-white/5" />
            <div className="flex items-start gap-3">
                <span className="bg-slate-700/50 p-1 rounded text-lg">💡</span>
                <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Почему это круто</p>
                    <p className="text-slate-200 italic">{suggestion.reason}</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <Button onClick={onRetry} variant="primary" className="w-full">
                <div className="flex items-center justify-center gap-2">
                    Хочу другое <ArrowRight size={20} />
                </div>
            </Button>
            
            <div className="flex gap-3">
                <Button onClick={onReset} variant="outline" className="flex-1">
                    <div className="flex items-center justify-center gap-2">
                        <RotateCcw size={18} />
                        Меню
                    </div>
                </Button>
                <button 
                    onClick={handleShare}
                    className="px-4 rounded-xl border-2 border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    title="Copy to clipboard"
                >
                    {copied ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
                </button>
            </div>
        </div>

      </div>
    </div>
  );
};