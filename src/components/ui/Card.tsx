import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-900/60 backdrop-blur-md shadow-[0_0_15px_rgba(0,242,254,0.1)]",
        onClick && "cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none" />
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
}
