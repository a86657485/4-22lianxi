import { cn } from '../lib/utils';
import { Database, BarChart2, TrendingUp, FileText, Check, GraduationCap } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  setStep: (step: number) => void;
  maxReachedStep: number;
}

export function ProgressBar({ currentStep, setStep, maxReachedStep }: ProgressBarProps) {
  const steps = [
    { id: 1, name: '获取数据渠道', icon: Database },
    { id: 2, name: '横向对比', icon: BarChart2 },
    { id: 3, name: '深圳速度', icon: TrendingUp },
    { id: 4, name: '洞察报告', icon: FileText },
    { id: 5, name: '随堂测试', icon: GraduationCap },
  ];

  return (
    <div className="w-full py-6 mb-8 relative">
      {/* Background Line */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 rounded-full z-0" />
      
      {/* Active Line */}
      <div 
        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#00f2fe] to-[#4facfe] -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,242,254,0.5)]"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />

      <div className="relative z-10 flex justify-between">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isClickable = step.id <= maxReachedStep;

          return (
            <div 
              key={step.id} 
              className="flex flex-col items-center"
            >
              <button
                onClick={() => isClickable && setStep(step.id)}
                disabled={!isClickable}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                  isActive 
                    ? "bg-slate-900 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.5)] scale-110" 
                    : isCompleted
                      ? "bg-cyan-900/50 border-cyan-500/50 text-cyan-300 cursor-pointer hover:border-cyan-400"
                      : "bg-slate-900 border-slate-700 text-slate-500 cursor-not-allowed"
                )}
              >
                {isCompleted && !isActive ? <Check size={20} /> : <Icon size={20} />}
              </button>
              <span 
                className={cn(
                  "mt-3 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-cyan-400" : isCompleted ? "text-cyan-200/70" : "text-slate-500"
                )}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
