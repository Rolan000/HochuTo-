import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'chaos';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold transition-all duration-300 rounded-xl group focus:outline-none focus:ring";
  
  const variants = {
    primary: "bg-white text-slate-900 hover:bg-slate-100 focus:ring-slate-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]",
    secondary: "bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-600 border border-slate-700",
    outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/60",
    chaos: "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white animate-pulse hover:animate-none hover:scale-105 shadow-[0_0_30px_rgba(236,72,153,0.6)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${isLoading ? 'opacity-80 cursor-wait' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Думаю...
        </span>
      ) : children}
    </button>
  );
};