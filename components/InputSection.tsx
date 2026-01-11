
import React, { useState } from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !price) return;
    onGenerate({
      phoneNumber: phone,
      orderType: order,
      productPrice: parseFloat(price),
      taskNumber: taskNum,
      commissionRate: commission
    });
  };

  const orderOptions = [
    "1 Pesanan 1 Produk",
    "2 Pesanan 2 Produk",
    "3 Pesanan 3 Produk",
    "4 Pesanan 4 Produk",
    "5 Pesanan 5 Produk"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-[#0f0f0f] border border-white/5 rounded-[32px] mb-10 no-print">
      <div className="flex flex-col items-center mb-6">
        <h2 className="armani-font text-2xl font-bold tracking-widest text-white">GENERATOR TUGAS</h2>
        <div className="w-12 h-[2px] bg-red-600 mt-2"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
              {orderOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
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
