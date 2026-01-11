
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

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const toggleFocus = () => {
    setIsFocusMode(!isFocusMode);
    if (!isFocusMode) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`w-full transition-all duration-500 ${isFocusMode ? 'fixed inset-0 z-[100] bg-[#cbd5e1] overflow-auto p-4 md:p-12' : 'relative'}`}>
      
      {/* Floating Controls - No Print */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-[110] no-print">
        <div className="bg-black/80 backdrop-blur-md p-2 rounded-full shadow-2xl flex flex-col items-center gap-2 border border-white/20">
          <button 
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors font-bold text-xl"
            title="Zoom In"
          >+</button>
          <div className="text-[10px] text-white font-black">{zoom}%</div>
          <button 
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition-colors font-bold text-xl"
            title="Zoom Out"
          >-</button>
        </div>
        
        <button 
          onClick={toggleFocus}
          className={`px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase shadow-2xl transition-all border-2 ${
            isFocusMode 
            ? 'bg-red-600 text-white border-red-700' 
            : 'bg-black text-white border-slate-700 hover:bg-slate-900'
          }`}
        >
          {isFocusMode ? 'Keluar Fokus' : 'Mode Screenshot'}
        </button>

        {isFocusMode && (
           <button 
           onClick={() => window.print()}
           className="bg-emerald-600 text-white px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase shadow-2xl border-2 border-emerald-700"
         >
           Cetak / Simpan PDF
         </button>
        )}
      </div>

      {/* Main Document Container with Dynamic Zoom */}
      <div 
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
        className="w-full transition-transform duration-300 ease-out flex justify-center"
      >
        <div className="w-full max-w-[1100px] bg-[#d1d5db]/50 p-4 md:p-12 text-black font-sans select-none shadow-2xl rounded-sm">
          {/* Restored Large Header Logo */}
          <div className="flex flex-col items-center mb-12">
            <img 
              src="https://images.seeklogo.com/logo-png/39/2/giorgio-armani-logo-png_seeklogo-393860.png" 
              alt="Giorgio Armani" 
              className="h-40 md:h-52 object-contain"
            />
          </div>

          {/* Main Top Navigation */}
          <div className="flex justify-around items-center border-b-[1.5px] border-slate-400 mb-8 pb-3 text-[11px] md:text-[14px] font-black uppercase tracking-[0.2em] text-slate-500">
            <div className="text-black border-b-[3px] border-black pb-3 -mb-[15px] z-10">BELUM TERKONFIRMASI</div>
            <div className="hover:text-black cursor-pointer transition-colors">DIKONFIRMASI</div>
            <div className="hover:text-black cursor-pointer transition-colors">WAKTU TUGAS</div>
            <div className="flex items-center gap-2 hover:text-black cursor-pointer transition-colors">
              <div className="bg-slate-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">?</div>
              BANTUAN
            </div>
          </div>

          {/* Task Selection Bar */}
          <div className="flex flex-wrap gap-x-12 gap-y-4 mb-10">
            {[
              { label: 'TUGAS SATU', active: true },
              { label: 'TUGAS DUA', active: false },
              { label: 'TUGAS TIGA', active: false },
              { label: 'TUGAS EMPAT', active: false },
              { label: 'TUGAS LIMA', active: false },
            ].map((t, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-7 h-7 flex items-center justify-center border-[2px] rounded-sm ${t.active ? 'bg-[#15803d] border-[#14532d]' : 'bg-white/80 border-slate-300'}`}>
                  {t.active && <span className="text-white text-[14px] font-black">✓</span>}
                </div>
                <span className={`text-[13px] font-black tracking-tight ${t.active ? 'text-black' : 'text-slate-400'}`}>{t.label}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-8 items-start">
            {/* Left Section: Task Info Grid */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  { label: "ID Akun Bisnis", value: task.phoneNumber },
                  { label: "Harga Produk", value: formatCurrency(task.productPrice) },
                  { label: "Profit", value: task.commission },
                  { label: "Jumlah Paket", value: "1 Paket" },
                  { label: "Keuntungan", value: formatCurrency(task.profit) },
                  { label: "Status Tugas", value: "Menunggu", italic: true },
                  { label: "Waktu Tugas", value: "60 Minutes" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-white/60 border border-slate-300 p-2.5 rounded shadow-sm">
                    <div className="w-7 h-7 border-[2px] border-[#2563eb] bg-white flex items-center justify-center mr-4 shrink-0 rounded-sm">
                      <span className="text-[#2563eb] text-[13px] font-black">✓</span>
                    </div>
                    <div className="flex-1 flex justify-between items-center pr-2">
                      <span className="text-[11px] font-black uppercase text-slate-800 tracking-tight">{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[12px] font-black text-slate-400">:</span>
                        <span className={`text-[13px] font-black text-black bg-white px-4 py-1.5 rounded border border-slate-200 min-w-[120px] text-right ${item.italic ? 'italic' : ''}`}>
                          {item.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-6 py-4">
                <button className="bg-[#064e3b] text-white px-12 py-5 rounded-md shadow-[0_6px_0_0_#022c22] flex items-center gap-4 text-[13px] font-black active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">
                  <div className="bg-white text-[#064e3b] rounded-full w-6 h-6 flex items-center justify-center">
                     <span className="text-[12px]">✓</span>
                  </div> 
                  KONFIRMASI TUGAS
                </button>
                <button className="bg-[#7f1d1d] text-white px-12 py-5 rounded-md shadow-[0_6px_0_0_#450a0a] flex items-center gap-4 text-[13px] font-black active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest">
                  <div className="bg-white text-[#7f1d1d] rounded-full w-6 h-6 flex items-center justify-center">
                     <span className="text-[12px]">✕</span>
                  </div> 
                  BATALKAN TUGAS
                </button>
              </div>

              {/* Main Info Blocks */}
              <div className="space-y-6">
                <div className="bg-[#0f172a] p-8 text-white text-center rounded-lg shadow-xl border border-white/5">
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="h-[1px] w-24 bg-slate-600"></div>
                    <h4 className="text-[12px] font-black tracking-[0.4em] text-slate-400 uppercase">RINCIAN DETAIL TUGAS</h4>
                    <div className="h-[1px] w-24 bg-slate-600"></div>
                  </div>
                  <p className="text-[10px] leading-relaxed font-bold text-slate-300 uppercase mb-6 px-4 tracking-wide">
                    PROTOKOL TUGAS DIMULAI: HARAP SEGERA MELAKUKAN AUTENTIKASI MASUK KE DALAM AKUN BISNIS ANDA DAN PROSES PENARIKAN SALDO KOMISI HANYA DAPAT DIAKTIFKAN SETELAH SELURUH RANGKAIAN UNIT TUGAS DINYATAKAN SELESAI OLEH SISTEM. SISTEM INTEGRASI AKAN SECARA OTOMATIS MENSINKRONISASI DAN MENGIRIMKAN SELURUH RINCIAN DETAIL TUGAS BERDASARKAN ALGORITMA AKUN BISNIS ANDA SECARA REAL-TIME TANPA JEDA!
                  </p>
                  <div className="border-t border-b border-slate-700 py-5 mb-6 bg-white/5">
                    <h3 className="text-[16px] font-black tracking-widest uppercase">
                      STATUS UNIT AKTIF: {formatOrderType(task.orderType)} SESUAI DENGAN STANDARDISASI GLOBAL
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    HINDARI AKTIVITAS ILEGAL SEPERTI PENARIKAN DANA YANG TIDAK SESUAI DENGAN INSTRUKSI ADVISOR ANDA. PEMILIK AKUN HARUS MENYELESAIKAN TUGASNYA SETELAH MENGKONFIRMASI DETAIL TUGAS BERDASARKAN KODE ETIK PERUSAHAAN!
                  </p>
                </div>

                <div className="bg-[#0f172a] p-6 text-white text-center rounded-lg shadow-xl border border-white/5">
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="h-[1px] w-24 bg-slate-600"></div>
                    <h4 className="text-[12px] font-black tracking-[0.4em] text-slate-400 uppercase">CATATAN PENTING</h4>
                    <div className="h-[1px] w-24 bg-slate-600"></div>
                  </div>
                  <p className="text-[11px] leading-relaxed font-black uppercase text-slate-200 tracking-tight">
                    PEMILIK AKUN HANYA PERLU ONLINE DAN MELAKUKAN LIKE PADA POST KOLEKSI ARMANI DI DALAM AKUN BISNIS YANG BERADA DI FITUR PESANAN PADA AKUN BISNIS ANDA. SISTEM AKAN MELAKUKAN TUGAS SECARA OTOMATIS. JIKA TUGAS BELUM SELESAI PENARIKAN SALDO BELUM DAPAT DILAKUKAN. KETENTUAN INI BERLAKU MUTLAK DAN TIDAK DAPAT DIGANGGU GUGAT OLEH PIHAK MANAPUN!
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar: Contract & Rules */}
            <div className="bg-[#020617] p-8 text-white rounded-lg shadow-2xl border border-white/10 sticky top-8">
              <div className="text-center mb-10">
                <div className="armani-font text-3xl font-black mb-1 tracking-tighter">GIORGIO ARMANI</div>
                <div className="text-[9px] tracking-[0.6em] text-slate-500 uppercase mb-8 font-bold">EXCELLENCE SINCE 1975</div>
                <div className="relative py-2.5 px-4 border-t border-b border-white/20">
                  <h4 className="text-[15px] font-black tracking-[0.2em] uppercase">KONTRAK & KETENTUAN</h4>
                </div>
              </div>

              <div className="space-y-6 text-[11px] leading-snug font-bold">
                {[
                  "Detail tugas akan diberikan langsung kepada Anda setelah Anda mengaktifkan tugas. Hindari aktivitas ilegal seperti penarikan dana yang tidak sesuai instruksi.",
                  "Keuntungan yang diperoleh Anggota ditentukan berdasarkan pemilihan dari Koleksi Produk Armani.",
                  "Setiap Tugas akan ada perubahan jumlah harga dan jumlah Paket untuk membantu kami meningkatkan Rating Produk Armani.",
                  "Penarikan dana membutuhkan waktu sekitar 3-5 menit hingga uang masuk ke rekening yang telah terdaftar pada akun bisnis pemilik akun.",
                  "Pemilik akun harus menyelesaikan tugas sesuai detail yang dikonfirmasi. Jika akun terkunci karena alasan pribadi, kerugian ditanggung pemilik akun.",
                  "Wajib membaca dan memahami instruksi penarikan dana dari Advisor. Pemilik akun diwajibkan menyelesaikan tugas agar penarikan dapat diproses.",
                  "Detail Tugas yang sudah Dikonfirmasi oleh Pemilik akun tidak dapat dibatalkan dengan alasan apapun.",
                  "Setiap Pemilik akun dapat menyelesaikan maksimal 5 kali tugas dalam satu hari. Tugas selanjutnya dapat dilanjutkan pada keesokan harinya."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="shrink-0 text-slate-400 font-black">{i + 1}.</span>
                    <p className="tracking-tight text-slate-100">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-14 pt-8 text-center border-t border-white/10">
                <p className="text-[14px] font-black italic tracking-[0.2em] uppercase mb-1">GA INTERNATIONAL DIVISION</p>
                <p className="text-[9px] text-slate-500 font-black tracking-widest">OFFICIAL ID: GA-2025-SEC-001</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
