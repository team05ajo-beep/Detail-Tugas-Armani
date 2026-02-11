
import React, { useState, useRef } from 'react';
import { TaskData } from '../types';

interface InputSectionProps {
  onGenerate: (data: TaskData) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate }) => {
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState('1 Pesanan 1 Produk');
  const [price, setPrice] = useState('');
  const [taskNum, setTaskNum] = useState(1);
  const [commission, setCommission] = useState(20);
  const [selectedMentor, setSelectedMentor] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mentors, setMentors] = useState([
    { name: "Alessandro V.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" },
    { name: "Isabella M.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" },
    { name: "Giovanni B.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newMentors = [...mentors];
        newMentors[selectedMentor].image = base64String;
        setMentors(newMentors);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = (index: number) => {
    setSelectedMentor(index);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !price) return;
    onGenerate({
      phoneNumber: phone,
      orderType: order,
      productPrice: parseFloat(price),
      taskNumber: taskNum,
      commissionRate: commission,
      mentorName: mentors[selectedMentor].name,
      mentorImage: mentors[selectedMentor].image
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-[#0f0f0f] border border-white/5 rounded-[32px] mb-10 no-print">
      <div className="flex flex-col items-center mb-8">
        <h2 className="armani-font text-2xl font-bold tracking-widest text-white">GENERATOR TUGAS</h2>
        <div className="w-12 h-[2px] bg-red-600 mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mentor Selection with Upload Capability */}
        <div className="flex flex-col items-center gap-4 mb-4">
          <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Pilih & Atur Mentor Advisor</label>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          <div className="flex gap-8">
            {mentors.map((m, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center gap-2 group"
              >
                <div 
                  onClick={() => setSelectedMentor(i)}
                  className={`relative w-20 h-20 rounded-full border-2 p-0.5 cursor-pointer transition-all ${selectedMentor === i ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)] scale-110' : 'border-white/10 opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                >
                  <img src={m.image} className="w-full h-full rounded-full object-cover" alt={m.name} />
                  
                  {/* Upload Overlay */}
                  <div 
                    onClick={(e) => { e.stopPropagation(); triggerFileUpload(i); }}
                    className="absolute inset-0 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <input 
                  type="text" 
                  value={m.name}
                  onChange={(e) => {
                    const newMentors = [...mentors];
                    newMentors[i].name = e.target.value;
                    setMentors(newMentors);
                  }}
                  className="bg-transparent text-white text-[10px] font-bold tracking-tighter uppercase text-center border-b border-transparent focus:border-white/20 focus:outline-none w-20"
                />
              </div>
            ))}
          </div>
          <p className="text-[9px] text-white/20 italic">Klik ikon kamera pada foto untuk mengganti dari galeri</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2">Nomor Telepon</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Contoh: 0812..."
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-medium"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2">Pesanan</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-medium appearance-none"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={`${n} Pesanan ${n} Produk`}>{n} Pesanan {n} Produk</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2">Harga Produk</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Masukkan Angka"
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2">Tugas Ke-</label>
            <select
              value={taskNum}
              onChange={(e) => setTaskNum(parseInt(e.target.value))}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-medium appearance-none"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>Tugas Ke-{n}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-2">Persen Komisi</label>
            <select
              value={commission}
              onChange={(e) => setCommission(parseInt(e.target.value))}
              className="bg-[#1a1a1a] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-white/30 transition-all font-medium appearance-none"
            >
              {[20, 30, 40, 50].map(c => (
                <option key={c} value={c}>{c}%</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-[0.3em] text-[12px] mt-4 shadow-lg shadow-white/5"
        >
          Buat Tugas Baru
        </button>
      </form>
    </div>
  );
};

export default InputSection;
