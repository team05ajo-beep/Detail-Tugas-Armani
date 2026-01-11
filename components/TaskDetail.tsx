
import React, { useState, useEffect } from 'react';
import { GeneratedTask } from '../types';

interface TaskDetailProps {
  task: GeneratedTask;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val);
  };

  const formatOrderType = (text: string) => {
    return text
      .replace(/1/g, 'SATU')
      .replace(/3/g, 'TIGA')
      .replace(/5/g, 'LIMA')
      .toUpperCase();
  };

  const Content = () => (
    <div className={`max-w-6xl mx-auto p-4 md:p-8 border-2 border-slate-400 shadow-2xl text-black font-sans rounded-sm bg-[#cbd5e1] relative overflow-hidden ${isFullScreen ? 'scale-100' : ''}`}>
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
      
      {!isFullScreen && (
        <button 
          onClick={() => setIsFullScreen(true)}
          className="absolute top-4 right-4 z-50 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-all no-print"
          title="Full Screen for Screenshot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
        </button>
      )}

      <div className="relative z-10">
        {/* Extremely Large Isolated Logo at the very top */}
        <div className="flex justify-center mb-12 pt-6">
          <img 
            src="https://images.seeklogo.com/logo-png/39/2/giorgio-armani-logo-png_seeklogo-393860.png" 
            alt="Giorgio Armani Symbol" 
            className="h-40 md:h-56 w-auto object-contain grayscale brightness-0 opacity-100 transition-transform hover:scale-105 duration-500"
          />
        </div>

        {/* Top Navigation Bar */}
        <div className="relative flex justify-around border-b border-black/20 pb-4 mb-8 text-[11px] md:text-[13px] font-black uppercase tracking-[0.15em] text-gray-800">
          <div className="relative">
            <span className="text-black border-b-4 border-black pb-4">BELUM TERKONFIRMASI</span>
          </div>
          
          <div className="text-gray-500 opacity-60">DIKONFIRMASI</div>
          <div className="text-gray-500 opacity-60">WAKTU TUGAS</div>
          <div className="text-gray-500 opacity-60 flex items-center gap-1">
            <span className="bg-gray-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px]">?</span> BANTUAN
          </div>
        </div>

        {/* Task Selection Row */}
        <div className="flex flex-wrap gap-8 mb-10 px-2">
          {['SATU', 'DUA', 'TIGA', 'EMPAT', 'LIMA'].map((num, i) => (
            <div key={num} className="flex items-center gap-2 group">
              <div className={`w-6 h-6 border-2 transition-all ${i === 0 ? 'bg-green-700 border-green-900 shadow-md' : 'border-gray-400 bg-white/40'}`}>
                {i === 0 && <span className="text-white text-xs flex items-center justify-center h-full font-black">✓</span>}
              </div>
              <span className={`text-[12px] font-black uppercase tracking-wider ${i === 0 ? 'text-black' : 'text-gray-400'}`}>TUGAS {num}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-10">
              {[
                { label: "ID Akun Bisnis", value: task.phoneNumber },
                { label: "Harga Produk", value: formatCurrency(task.productPrice) },
                { label: "Profit", value: task.commission },
                { label: "Jumlah Paket", value: "1 Paket" },
                { label: "Keuntungan", value: formatCurrency(task.profit) },
                { label: "Status Tugas", value: "Menunggu", italic: true },
                { label: "Waktu Tugas", value: task.validUntil }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 border border-black/10 bg-white/30 p-2 rounded shadow-sm group">
                  <div className="w-5 h-5 border border-blue-800 bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-800 text-[9px] font-black">✓</span>
                  </div>
                  <span className="text-[11px] font-black uppercase flex-1 text-gray-800 tracking-tight">{item.label}</span>
                  <span className={`font-black text-[11px] text-gray-900 bg-white/60 px-2 py-0.5 rounded border border-black/5 ${item.italic ? 'italic' : ''}`}>: {item.value}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mb-10">
              <button className="bg-[#064e3b] text-white px-8 py-3 rounded shadow-[0_4px_0_0_#022c22] flex items-center gap-3 text-[11px] font-black active:translate-y-1 active:shadow-none transition-all uppercase">
                <div className="bg-white text-green-900 rounded-full w-5 h-5 flex items-center justify-center">
                   <span className="text-[10px]">✓</span>
                </div> 
                KONFIRMASI TUGAS
              </button>
              <button className="bg-[#7f1d1d] text-white px-8 py-3 rounded shadow-[0_4px_0_0_#450a0a] flex items-center gap-3 text-[11px] font-black active:translate-y-1 active:shadow-none transition-all uppercase">
                <div className="bg-white text-red-900 rounded-full w-5 h-5 flex items-center justify-center">
                   <span className="text-[10px]">✕</span>
                </div> 
                BATALKAN TUGAS
              </button>
            </div>

            {/* Protocols & Notes */}
            <div className="space-y-4">
              <div className="bg-[#0f172a] p-6 text-white rounded border-l-4 border-gray-500 shadow-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <div className="h-[1px] w-12 bg-gray-600"></div>
                    <h4 className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">RINCIAN DETAIL TUGAS</h4>
                    <div className="h-[1px] w-12 bg-gray-600"></div>
                  </div>
                  <p className="text-[9px] leading-relaxed font-bold uppercase text-gray-400 max-w-2xl mx-auto px-4">
                    PROTOKOL TUGAS DIMULAI: HARAP SEGERA MELAKUKAN AUTENTIKASI MASUK KE DALAM AKUN BISNIS ANDA DAN PROSES PENARIKAN SALDO KOMISI HANYA DAPAT DIAKTIFKAN SETELAH SELURUH RANGKAIAN UNIT TUGAS DINYATAKAN SELESAI OLEH SISTEM. SISTEM INTEGRASI AKAN SECARA OTOMATIS MENSINKRONISASI DAN MENGIRIMKAN SELURUH RINCIAN DETAIL TUGAS BERDASARKAN ALGORITMA AKUN BISNIS ANDA SECARA REAL-TIME TANPA JEDA!
                  </p>
                  <div className="my-3 border-y border-white/10 py-3">
                    <p className="text-white font-black text-[13px] md:text-[14px] tracking-wider uppercase">
                      STATUS UNIT AKTIF: {formatOrderType(task.orderType)} PESANAN PRODUK SESUAI DENGAN STANDARDISASI GLOBAL
                    </p>
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold max-w-2xl mx-auto">
                    HINDARI AKTIVITAS ILEGAL SEPERTI PENARIKAN DANA YANG TIDAK SESUAI DENGAN INSTRUKSI ADVISOR ANDA. PEMILIK AKUN HARUS MENYELESAIKAN TUGASNYA SETELAH MENGKONFIRMASI DETAIL TUGAS BERDASARKAN KODE ETIK PERUSAHAAN!
                  </p>
                </div>
              </div>

              <div className="bg-[#0f172a] p-5 text-white rounded border-l-4 border-gray-500 shadow-xl">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <div className="h-[1px] w-12 bg-gray-600"></div>
                  <h4 className="text-[10px] font-black tracking-[0.4em] text-gray-400 uppercase">CATATAN PENTING</h4>
                  <div className="h-[1px] w-12 bg-gray-600"></div>
                </div>
                <p className="text-[10px] leading-relaxed font-black uppercase text-gray-300 text-center max-w-2xl mx-auto">
                  PEMILIK AKUN HANYA PERLU ONLINE DAN MELAKUKAN LIKE PADA POST KOLEKSI ARMANI DI DALAM AKUN BISNIS YANG BERADA DI FITUR PESANAN PADA AKUN BISNIS ANDA. SISTEM AKAN MELAKUKAN TUGAS SECARA OTOMATIS. JIKA TUGAS BELUM SELESAI PENARIKAN SALDO BELUM DAPAT DILAKUKAN. KETENTUAN INI BERLAKU MUTLAK DAN TIDAK DAPAT DIGANGGU GUGAT OLEH PIHAK MANAPUN!
                </p>
              </div>
            </div>
          </div>

          {/* Compact Right Sidebar with All 8 Rules */}
          <div className="w-full lg:w-[360px] shrink-0">
            <div className="bg-[#020617] p-5 text-white rounded-sm border-t-4 border-gray-600 shadow-2xl relative overflow-hidden flex flex-col h-full">
               <div className="relative z-10">
                  <div className="flex flex-col items-center justify-center gap-3 mb-6">
                    <div className="text-center pb-2 border-b border-white/20 w-full mb-1">
                      <div className="armani-font text-xl md:text-2xl font-black tracking-tighter armani-accent">GIORGIO ARMANI</div>
                      <div className="text-[7px] tracking-[0.5em] text-gray-500 mt-1 uppercase font-bold">Excellence Since 1975</div>
                    </div>
                    <h4 className="text-center text-[12px] font-black tracking-[0.2em] uppercase text-white border-b border-white/40 pb-1">KONTRAK & KETENTUAN</h4>
                  </div>

                  <div className="text-[9.5px] space-y-2 leading-[1.3] text-white font-bold">
                    {[
                      {id: 1, text: "Detail tugas akan diberikan langsung kepada Anda setelah Anda mengaktifkan tugas. Hindari aktivitas ilegal seperti penarikan dana yang tidak sesuai instruksi."},
                      {id: 2, text: "Keuntungan yang diperoleh Anggota ditentukan berdasarkan pemilihan dari Koleksi Produk Armani."},
                      {id: 3, text: "Setiap Tugas akan ada perubahan jumlah harga dan jumlah Paket untuk membantu kami meningkatkan Rating Produk Armani."},
                      {id: 4, text: "Penarikan dana membutuhkan waktu sekitar 3-5 menit hingga uang masuk ke rekening yang telah terdaftar pada akun bisnis pemilik akun."},
                      {id: 5, text: "Pemilik akun harus menyelesaikan tugas sesuai detail yang dikonfirmasi. Jika akun terkunci karena alasan pribadi, kerugian ditanggung pemilik akun."},
                      {id: 6, text: "Wajib membaca dan memahami instruksi penarikan dana dari Advisor. Pemilik akun diwajibkan menyelesaikan tugas agar penarikan dapat diproses."},
                      {id: 7, text: "Detail Tugas yang sudah Dikonfirmasi oleh Pemilik akun tidak dapat dibatalkan dengan alasan apapun."},
                      {id: 8, text: "Setiap Pemilik akun dapat menyelesaikan maksimal 5 kali tugas dalam satu hari. Tugas selanjutnya dapat dilanjutkan pada keesokan harinya."}
                    ].map((item) => (
                      <div key={item.id} className="flex gap-2 bg-white/5 p-2 rounded border-l border-white/10">
                        <span className="font-black text-gray-500">{item.id}.</span>
                        <p className="tracking-tight">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-4 text-center">
                     <p className="text-[10px] text-gray-200 font-black italic tracking-widest uppercase border-t border-gray-800 pt-3">GA INTERNATIONAL DIVISION</p>
                     <p className="text-[8px] text-gray-600 mt-1 uppercase font-black">Official ID: GA-2025-SEC-001</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={`mt-8 mb-20 ${isFullScreen ? 'hidden' : 'block'}`}>
        <Content />
      </div>

      {isFullScreen && (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center p-4 overflow-auto animate-in fade-in zoom-in duration-300">
          <div className="absolute top-6 right-10 flex gap-4 no-print">
            <button 
              onClick={() => window.print()} 
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-xs font-bold transition-all backdrop-blur-md"
            >
              PRINT
            </button>
            <button 
              onClick={() => setIsFullScreen(false)} 
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-xs font-bold transition-all"
            >
              CLOSE (ESC)
            </button>
          </div>
          <div className="w-full max-w-7xl">
            <Content />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetail;
