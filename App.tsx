
import React, { useState } from 'react';
import InputSection from './components/InputSection';
import TaskDetail from './components/TaskDetail';
import { TaskData, GeneratedTask } from './types';

const App: React.FC = () => {
  const [generatedTask, setGeneratedTask] = useState<GeneratedTask | null>(null);

  const handleGenerate = (data: TaskData) => {
    // Dynamic profit calculation based on user selection
    const profitMultiplier = data.commissionRate / 100;
    const profit = Math.round(data.productPrice * profitMultiplier);
    
    const newTask: GeneratedTask = {
      ...data,
      id: "GA-AUTH-" + Math.random().toString(36).substring(2, 7).toUpperCase() + "-025",
      commission: `${data.commissionRate}% Fixed`,
      profit: profit,
    };
    
    setGeneratedTask(newTask);
    setTimeout(() => {
      document.getElementById('result-area')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pb-32 selection:bg-white selection:text-black">
      {/* BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 monogram-bg opacity-30"></div>
      </div>

      <header className="py-20 no-print flex flex-col items-center relative z-10">
        <div className="flex items-center gap-4 mb-4 opacity-50">
          <div className="h-px w-8 bg-white"></div>
          <span className="text-[9px] tracking-[1em] font-black uppercase">Internal System</span>
          <div className="h-px w-8 bg-white"></div>
        </div>
        <h1 className="armani-font text-5xl font-light tracking-[0.4em] mb-2 uppercase text-center">GIORGIO ARMANI</h1>
        <p className="text-[10px] font-black tracking-[0.5em] text-white/30 uppercase">Authentication & Workflow Ledger</p>
      </header>

      <main className="w-full flex flex-col items-center relative z-10 px-6">
        <div className="w-full max-w-4xl no-print">
          <InputSection onGenerate={handleGenerate} />
        </div>

        <div id="result-area" className="w-full flex justify-center mt-12">
          {generatedTask ? (
            <TaskDetail task={generatedTask} />
          ) : (
            <div className="py-48 text-center opacity-5 select-none transition-all hover:opacity-10 duration-1000">
              <div className="armani-font text-[180px] leading-none font-light tracking-tighter">GA</div>
              <div className="text-[12px] tracking-[4em] font-black mt-[-20px] ml-[4em]">MILANO</div>
            </div>
          )}
        </div>
      </main>

      {/* FIXED SYSTEM STATUS */}
      <div className="fixed bottom-6 left-6 flex items-center gap-3 no-print z-50">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
        <span className="text-[8px] font-black tracking-widest text-white/40 uppercase">System Latency: 12ms</span>
      </div>
    </div>
  );
};

export default App;
