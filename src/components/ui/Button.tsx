import { ReactNode, ComponentProps } from 'react';
import { cn } from '../../lib/utils';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'glow';
};

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: "bg-cyan-600/20 border border-cyan-500 text-cyan-400 hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)]",
    secondary: "bg-slate-800/50 border border-slate-600 text-slate-300 hover:bg-slate-700/50",
    danger: "bg-red-900/30 border border-red-500 text-red-400 hover:bg-red-800/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    glow: "bg-gradient-to-r from-[#00f2fe] to-[#4facfe] text-slate-950 font-bold border-none hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] hover:scale-105",
  };

  return (
    <button
      className={cn(
        "px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
