
import React, { useState } from 'react';
import InputSection from './components/InputSection';
import TaskDetail from './components/TaskDetail';
import { TaskData, GeneratedTask } from './types';

const App: React.FC = () => {
  const [generatedTask, setGeneratedTask] = useState<GeneratedTask | null>(null);

  const handleGenerate = (data: TaskData) => {
    const profit = Math.round(data.productPrice * 0.25);
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
          top: resultArea.offsetTop - 50,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen pb-10">
      <main className="max-w-7xl mx-auto">
        <div className="no-print">
          <InputSection onGenerate={handleGenerate} />
        </div>

        <div id="result-area" className="flex justify-center mt-4">
          {generatedTask ? (
            <TaskDetail task={generatedTask} />
          ) : (
            <div className="mt-32 text-center no-print">
              <div className="armani-font text-5xl font-light text-slate-400 mb-4">Giorgio Armani</div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-slate-500">Excellence and Quality</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
