
import React, { useState } from 'react';
import { TaskData } from '../types';

interface InputSectionProps {
  onGenerate: (data: TaskData) => void;
}

const InputSection: React.FC<InputSectionProps> = ({ onGenerate }) => {
  const [phone, setPhone] = useState('');
  const [order, setOrder] = useState('1 pesanan 1 produk');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !price) return;
    onGenerate({
      phoneNumber: phone,
      orderType: order,
      productPrice: parseFloat(price)
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 p-10 bg-white border armani-border shadow-sm no-print">
      <div className="text-center mb-10">
        <h2 className="armani-font text-3xl font-light tracking-tight mb-2">PENGINPUTAN DATA</h2>
        <div className="w-12 h-[1px] bg-black mx-auto"></div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group">
          <label className="block text-[10px] text-gray-400 mb-2 uppercase tracking-[0.2em] font-bold">Nomor Telepon</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08..."
            className="w-full bg-transparent border-b armani-border py-2 text-gray-800 focus:outline-none focus:border-black transition-all placeholder:text-gray-200"
          />
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 mb-2 uppercase tracking-[0.2em] font-bold">Kategori Pesanan</label>
          <div className="relative">
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full bg-transparent border-b armani-border py-2 text-gray-800 focus:outline-none focus:border-black transition-all appearance-none cursor-pointer"
            >
              <option value="1 pesanan 1 produk">1 pesanan 1 produk</option>
              <option value="3 pesanan 3 produk">3 pesanan 3 produk</option>
              <option value="5 pesanan 5 produk">5 pesanan 5 produk</option>
              <option value="Paket VIP Armani">Paket VIP Armani</option>
            </select>
            <div className="absolute right-0 top-3 pointer-events-none">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-[10px] text-gray-400 mb-2 uppercase tracking-[0.2em] font-bold">Harga Produk (IDR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Min. 50.000"
            className="w-full bg-transparent border-b armani-border py-2 text-gray-800 focus:outline-none focus:border-black transition-all placeholder:text-gray-200"
          />
        </div>
        <div className="md:col-span-3 pt-4">
          <button
            type="submit"
            className="w-full armani-bg-deep text-white font-light py-4 tracking-[0.3em] text-xs hover:bg-black transition-all uppercase"
          >
            Generate Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputSection;
