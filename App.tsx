
import React, { useState } from 'react';
import InputSection from './components/InputSection';
import TaskDetail from './components/TaskDetail';
import { TaskData, GeneratedTask } from './types';

const App: React.FC = () => {
  const [generatedTask, setGeneratedTask] = useState<GeneratedTask | null>(null);

  const handleGenerate = (data: TaskData) => {
    const profit = Math.round(data.productPrice * 0.25); // Armani premium 25%
    const now = new Date();
    
    const newTask: GeneratedTask = {
      ...data,
      id: "GA-" + Math.random().toString(36).substring(2, 8).toUpperCase(),
      timestamp: now.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
      profit: profit,
      commission: '25% Executive',
      validUntil: '60 Minutes'
    };
    
    setGeneratedTask(newTask);
    
    setTimeout(() => {
      const resultArea = document.getElementById('result-area');
      if (resultArea) {
        window.scrollTo({
          top: resultArea.offsetTop,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen pb-10 selection:bg-gray-200">
      {/* Armani Navbar Simplified */}
      <nav className="bg-white py-12 px-10 flex flex-col items-center justify-center no-print border-b armani-border">
        <div className="armani-font text-5xl md:text-6xl tracking-[-0.05em] font-light">GIORGIO ARMANI</div>
      </nav>

      <main className="px-4 max-w-7xl mx-auto">
        <InputSection onGenerate={handleGenerate} />

        <div id="result-area">
          {generatedTask ? (
            <TaskDetail task={generatedTask} />
          ) : (
            <div className="mt-32 text-center no-print">
              <div className="armani-font text-4xl font-light italic text-gray-300 mb-4 italic">Timeless Excellence</div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-gray-400">Please enter credentials to continue</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
