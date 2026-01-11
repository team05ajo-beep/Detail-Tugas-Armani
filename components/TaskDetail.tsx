
import React, { useState } from 'react';
import { GeneratedTask } from '../types';

interface TaskDetailProps {
  task: GeneratedTask;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const [zoom, setZoom] = useState(100);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  const formatOrderType = (text: string) => {
    return text.toUpperCase();
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 5, 130));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 5, 70));
  
  const toggleFocus = () => {
    setIsFocusMode(!isFocusMode);
    if (!isFocusMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full transition-all duration-500 ${isFocusMode ? 'fixed inset-0 z-[100] bg-[#cbd5e1] overflow-hidden flex items-center justify-center p-4' : 'relative py-8'}`}>
      
      {/* Floating Controls - No Print */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-[110] no-print scale-90 origin-bottom-right">
        <div className="bg-black/90 backdrop-blur-md p-2 rounded-xl shadow-2xl flex flex-col items-center gap-2 border border-white/10">
          <button 
            onClick={handleZoomIn}
            className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors font-black text-2xl"
          >+</button>
          <div className="text-[10px] text-white font-black py-1">{zoom}%</div>
          <button 
            onClick={handleZoomOut}
            className="w-12 h-12 flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors font-black text-2xl"
          >-</button>
        </div>
        
        <button 
          onClick={toggleFocus}
          className={`px-8 py-4 rounded-xl font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl transition-all border-2 ${
            isFocusMode 
            ? 'bg-red-600 text-white border-red-700' 
            : 'bg-[#0f172a] text-white border-slate-700 hover:scale-105 active:scale-95'
          }`}
        >
          {isFocusMode ? 'KELUAR FOKUS' : 'MODE LANDSCAPE SCREENSHOT'}
        </button>

        {isFocusMode && (
           <button 
           onClick={() => window.print()}
           className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-black text-[11px] tracking-[0.2em] uppercase shadow-2xl border-2 border-emerald-700 hover:scale-105 active:scale-95 transition-transform"
         >
           SIMPAN DOKUMEN (PDF)
         </button>
        )}
      </div>

      {/* Landscape Document Container */}
      <div 
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
        className="transition-transform duration-300 ease-in-out"
      >
        <div className="w-[1280px] bg-[#d1d5db] p-10 text-black font-sans select-none shadow-[0_0_50px_rgba(0,0,0,0.15)] border border-slate-300 rounded-sm">
          
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="https://images.seeklogo.com/logo-png/39/2/giorgio-armani-logo-png_seeklogo-393860.png" 
              alt="Giorgio Armani" 
              className="h-32 object-contain mb-4"
            />
          </div>

          {/* Navigation Bar */}
          <div className="grid grid-cols-4 border-b-[2px] border-slate-400 mb-8 text-[14px] font-black uppercase tracking-[0.3em] text-slate-500 text-center">
            <div className="text-black border-b-[4px] border-black pb-4 -mb-[2px]">BELUM TERKONFIRMASI</div>
            <div className="pb-4 border-b-[2px] border-transparent">DIKONFIRMASI</div>
            <div className="pb-4 border-b-[2px] border-transparent">WAKTU TUGAS</div>
            <div className="pb-4 border-b-[2px] border-transparent flex items-center justify-center gap-2">
              <span className="w-5 h-5 bg-slate-400 text-white rounded-full text-[10px] flex items-center justify-center">?</span> BANTUAN
            </div>
          </div>

          {/* Task Steps */}
          <div className="flex justify-start gap-12 mb-10 pl-4">
            {['SATU', 'DUA', 'TIGA', 'EMPAT', 'LIMA'].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-8 h-8 border-2 rounded flex items-center justify-center ${idx === 0 ? 'bg-[#15803d] border-[#14532d]' : 'bg-white border-slate-300'}`}>
                  {idx === 0 && <span className="text-white font-black text-lg">✓</span>}
                </div>
                <span className={`text-[13px] font-black tracking-widest ${idx === 0 ? 'text-black' : 'text-slate-400'}`}>TUGAS {step}</span>
              </div>
            ))}
          </div>

          {/* Main Grid Content */}
          <div className="grid grid-cols-12 gap-10 items-start">
            
            {/* Left: 8 Columns for Details */}
            <div className="col-span-8 space-y-8">
              
              {/* Fields Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "ID Akun Bisnis", value: task.phoneNumber },
                  { label: "Harga Produk", value: formatCurrency(task.productPrice) },
                  { label: "Profit", value: task.commission },
                  { label: "Jumlah Paket", value: "1 Paket" },
                  { label: "Keuntungan", value: formatCurrency(task.profit) },
                  { label: "Status Tugas", value: "Menunggu", italic: true },
                  { label: "Waktu Tugas", value: "60 Minutes" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white/70 border border-slate-300 p-3 rounded shadow-sm">
                    <div className="w-7 h-7 border-2 border-[#2563eb] flex items-center justify-center mr-4 bg-white rounded-sm">
                      <span className="text-[#2563eb] text-[14px] font-black">✓</span>
                    </div>
                    <div className="flex-1 flex justify-between items-center pr-2">
                      <span className="text-[12px] font-black uppercase text-slate-700">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-400">:</span>
                        <span className={`text-[14px] font-black text-black bg-white px-4 py-2 rounded border border-slate-200 min-w-[140px] text-right ${item.italic ? 'italic' : ''}`}>
                          {item.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-8 py-4">
                <button className="bg-[#064e3b] text-white px-14 py-5 rounded-md shadow-[0_6px_0_0_#022c22] flex items-center gap-4 text-[14px] font-black uppercase tracking-[0.2em]">
                  <span className="w-7 h-7 bg-white text-[#064e3b] rounded-full flex items-center justify-center font-black">✓</span>
                  KONFIRMASI TUGAS
                </button>
                <button className="bg-[#7f1d1d] text-white px-14 py-5 rounded-md shadow-[0_6px_0_0_#450a0a] flex items-center gap-4 text-[14px] font-black uppercase tracking-[0.2em]">
                  <span className="w-7 h-7 bg-white text-[#7f1d1d] rounded-full flex items-center justify-center font-black">✕</span>
                  BATALKAN TUGAS
                </button>
              </div>

              {/* Info Blocks */}
              <div className="bg-[#0f172a] p-10 text-white rounded-xl border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-center gap-8 mb-8">
                  <div className="h-[1px] w-24 bg-slate-700"></div>
                  <h4 className="text-[14px] font-black tracking-[0.5em] text-slate-400">RINCIAN DETAIL TUGAS</h4>
                  <div className="h-[1px] w-24 bg-slate-700"></div>
                </div>
                <p className="text-[11px] leading-relaxed font-bold text-slate-300 uppercase text-center mb-8 tracking-wider">
                  PROTOKOL TUGAS DIMULAI: HARAP SEGERA MELAKUKAN AUTENTIKASI MASUK KE DALAM AKUN BISNIS ANDA DAN PROSES PENARIKAN SALDO KOMISI HANYA DAPAT DIAKTIFKAN SETELAH SELURUH RANGKAIAN UNIT TUGAS DINYATAKAN SELESAI OLEH SISTEM. SISTEM INTEGRASI AKAN SECARA OTOMATIS MENSINKRONISASI DAN MENGIRIMKAN SELURUH RINCIAN DETAIL TUGAS BERDASARKAN ALGORITMA AKUN BISNIS ANDA SECARA REAL-TIME TANPA JEDA!
                </p>
                <div className="bg-white/5 border-y border-slate-700 py-6 mb-8 text-center">
                  <h3 className="text-[18px] font-black tracking-[0.2em] uppercase">
                    STATUS UNIT AKTIF: {formatOrderType(task.orderType)} SESUAI DENGAN STANDARDISASI GLOBAL
                  </h3>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em] text-center">
                  HINDARI AKTIVITAS ILEGAL SEPERTI PENARIKAN DANA. PEMILIK AKUN HARUS MENYELESAIKAN TUGAS BERDASARKAN KODE ETIK PERUSAHAAN!
                </p>
              </div>
            </div>

            {/* Right: 4 Columns for Sidebar */}
            <div className="col-span-4 bg-[#020617] p-8 text-white rounded-xl shadow-2xl border border-white/10 h-full">
              <div className="text-center mb-10">
                <div className="armani-font text-3xl font-black mb-2 tracking-tighter">GIORGIO ARMANI</div>
                <div className="text-[9px] tracking-[0.6em] text-slate-500 font-bold uppercase mb-8">EXCELLENCE SINCE 1975</div>
                <div className="py-3 border-y border-white/10">
                  <h4 className="text-[15px] font-black tracking-[0.2em]">KONTRAK & KETENTUAN</h4>
                </div>
              </div>

              <div className="space-y-6 text-[11px] leading-relaxed">
                {[
                  "Detail tugas akan diberikan langsung kepada Anda setelah Anda mengaktifkan tugas.",
                  "Keuntungan Anggota ditentukan berdasarkan pemilihan Koleksi Produk Armani.",
                  "Setiap Tugas akan ada perubahan harga untuk meningkatkan Rating Produk Armani.",
                  "Penarikan dana membutuhkan waktu sekitar 3-5 menit ke rekening terdaftar.",
                  "Kerugian akibat akun terkunci secara pribadi ditanggung pemilik akun.",
                  "Wajib memahami instruksi penarikan dana dari Advisor resmi.",
                  "Detail Tugas yang sudah dikonfirmasi tidak dapat dibatalkan.",
                  "Maksimal penyelesaian tugas adalah 5 kali dalam satu hari kerja."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-slate-400 font-black">{i + 1}.</span>
                    <p className="font-bold text-slate-100 uppercase tracking-tight">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/10 text-center">
                <p className="text-[14px] font-black italic tracking-[0.3em] uppercase mb-1">GA INTERNATIONAL DIVISION</p>
                <p className="text-[9px] text-slate-500 font-black tracking-widest">OFFICIAL ID: GA-2025-SEC-001</p>
              </div>
            </div>

          </div>

          {/* Footer Footer Notes */}
          <div className="mt-10 bg-[#0f172a] p-8 text-white rounded-xl border border-white/5">
            <div className="flex items-center justify-center gap-8 mb-4">
              <div className="h-[1px] w-32 bg-slate-700"></div>
              <h4 className="text-[14px] font-black tracking-[0.5em] text-slate-400 uppercase">CATATAN PENTING</h4>
              <div className="h-[1px] w-32 bg-slate-700"></div>
            </div>
            <p className="text-[12px] leading-relaxed font-black uppercase text-slate-200 text-center tracking-wide">
              PEMILIK AKUN HANYA PERLU ONLINE DAN MELAKUKAN LIKE PADA POST KOLEKSI ARMANI DI DALAM AKUN BISNIS. SISTEM AKAN MELAKUKAN TUGAS SECARA OTOMATIS. JIKA TUGAS BELUM SELESAI PENARIKAN SALDO BELUM DAPAT DILAKUKAN. KETENTUAN INI BERLAKU MUTLAK DAN TIDAK DAPAT DIGANGGU GUGAT OLEH PIHAK MANAPUN!
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
