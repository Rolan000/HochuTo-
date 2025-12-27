import React from 'react';
import { Category } from '../types';
import { Pizza, Clapperboard, Dumbbell, Brain, Zap } from 'lucide-react';

interface CategorySelectorProps {
  onSelect: (category: Category) => void;
  disabled: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelect, disabled }) => {
  const categories = [
    { id: Category.FOOD, label: 'Хочу ЕСТЬ', icon: Pizza, color: 'bg-orange-500' },
    { id: Category.WATCH, label: 'Хочу СМОТРЕТЬ', icon: Clapperboard, color: 'bg-blue-500' },
    { id: Category.DO, label: 'Хочу ДЕЛАТЬ', icon: Dumbbell, color: 'bg-green-500' },
    { id: Category.LEARN, label: 'Хочу ЗНАТЬ', icon: Brain, color: 'bg-purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          disabled={disabled}
          className={`
            group relative p-6 rounded-2xl transition-all duration-300 border border-white/10
            hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 overflow-hidden
            bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm flex flex-col items-center gap-3
          `}
        >
          {/* Gradient background effect on hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${cat.color}`} />
          
          <cat.icon className="w-8 h-8 text-white/90 group-hover:text-white transition-colors" />
          <span className="text-sm font-bold tracking-wider text-white/90 group-hover:text-white">
            {cat.label}
          </span>
        </button>
      ))}
      
      <button
        onClick={() => onSelect(Category.CHAOS)}
        disabled={disabled}
        className="col-span-2 relative p-8 rounded-2xl overflow-hidden group hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 animate-pulse" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        
        <div className="relative flex items-center justify-center gap-3">
          <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-bounce" />
          <span className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-lg">
            Я НЕ ЗНАЮ!!!
          </span>
          <Zap className="w-8 h-8 text-yellow-300 fill-yellow-300 animate-bounce" style={{ animationDelay: '0.1s' }} />
        </div>
      </button>
    </div>
  );
};