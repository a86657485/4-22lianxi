import { useState } from 'react';
import { ProgressBar } from './components/ProgressBar';
import { Step1 } from './components/Step1';
import { Step2 } from './components/Step2';
import { Step3 } from './components/Step3';
import { Step4 } from './components/Step4';
import { Step5 } from './components/Step5';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxReachedStep, setMaxReachedStep] = useState(5); // 解锁所有步骤
  
  // State to store analyses
  const [step2Analysis, setStep2Analysis] = useState('');
  const [step3Analysis, setStep3Analysis] = useState('');

  const handleStepComplete = (step: number, analysis?: string) => {
    if (step === 2 && analysis) setStep2Analysis(analysis);
    if (step === 3 && analysis) setStep3Analysis(analysis);
    
    const nextStep = step + 1;
    setCurrentStep(nextStep);
    if (nextStep > maxReachedStep) {
      setMaxReachedStep(nextStep);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 mb-2 drop-shadow-sm">
            “解码深圳速度”
          </h1>
          <p className="text-cyan-400 font-medium tracking-widest uppercase text-sm">
            城市发展数据平台
          </p>
        </header>

        {/* Progress Bar */}
        <ProgressBar 
          currentStep={currentStep} 
          setStep={setCurrentStep} 
          maxReachedStep={maxReachedStep} 
        />

        {/* Step Content Area */}
        <main className="flex-grow mt-4">
          {currentStep === 1 && (
            <Step1 onComplete={() => handleStepComplete(1)} />
          )}
          {currentStep === 2 && (
            <Step2 
              onComplete={(analysis) => handleStepComplete(2, analysis)} 
              savedAnalysis={step2Analysis}
            />
          )}
          {currentStep === 3 && (
            <Step3 
              onComplete={(analysis) => handleStepComplete(3, analysis)} 
              savedAnalysis={step3Analysis}
            />
          )}
          {currentStep === 4 && (
            <Step4 
              step2Analysis={step2Analysis} 
              step3Analysis={step3Analysis} 
              onComplete={() => handleStepComplete(4)}
            />
          )}
          {currentStep === 5 && (
            <Step5 />
          )}
        </main>
      </div>
    </div>
  );
}
