
import React, { useMemo, useState } from 'react';
import { GeneratedTask } from '../types';
import StatementLetter from './StatementLetter';

interface TaskDetailProps {
  task: GeneratedTask;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const serialCode = useMemo(() => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let res = '';
    for (let i = 0; i < 12; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
      if (i === 3 || i === 7) res += '-';
    }
    return res;
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  const CheckIcon = (props: { active?: boolean }) => (
    <div className={`w-4 h-4 ${props.active ? 'bg-emerald-500' : 'bg-gray-300'} rounded-sm flex items-center justify-center mr-3 shrink-0`}>
      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );

  const numberToWords = (orderString: string) => {
    const firstChar = orderString.trim().charAt(0);
    const map: { [key: string]: string } = {
      '1': 'SATU',
      '2': 'DUA',
      '3': 'TIGA',
      '4': 'EMPAT',
      '5': 'LIMA'
    };
    const word = map[firstChar] || 'SATU';
    return `${word} PRODUK UNTUK ${word} PESANAN.`;
  };

  const dynamicOrderText = numberToWords(task.orderType);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-[1300px] bg-[#f8f8f8] text-black overflow-hidden shadow-2xl flex flex-col font-sans border border-gray-200">
        
        <div className="bg-white border-b border-gray-100 px-10 py-6 flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6">
            <div className="flex gap-4 text-[10px] font-bold tracking-[0.2em] opacity-40 uppercase">
              <span>+ Contact Us</span>
            </div>
            <h1 className="armani-font text-5xl tracking-[0.4em] font-light uppercase">GUCCI</h1>
            <div className="flex gap-6 items-center opacity-80">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <div className="flex flex-col gap-1.5 w-5 ml-2">
                <div className="h-[1px] bg-black w-full"></div>
                <div className="h-[1px] bg-black w-3/4"></div>
              </div>
            </div>
          </div>
          <div className="flex gap-10 text-[10px] font-semibold tracking-[0.25em] opacity-60 uppercase">
            <span>Beranda</span>
            <span>Produk</span>
            <span>Pembayaran</span>
            <span className="text-black opacity-100 border-b border-black pb-1">Detail Tugas</span>
            <span>Tugas VIP</span>
            <span>Status Akun</span>
          </div>
        </div>

        <div className="bg-[#eeeeee] px-10 py-4 flex justify-between items-center border-b border-gray-300">
          <div className="flex gap-10 font-bold text-base tracking-tight uppercase italic">
            <span className={`${!isConfirmed ? 'text-black border-b-2 border-black' : 'text-black/30'}`}>Belum Terkonfirmasi</span>
            <span className={`${isConfirmed ? 'text-black border-b-2 border-black' : 'text-black/30'}`}>Dikonfirmasi</span>
            <span className="text-black/30">Waktu Tugas</span>
          </div>
          <div className="flex items-center gap-3 font-bold text-xs tracking-widest opacity-70">
            <div className="w-5 h-5 rounded-full border border-black flex items-center justify-center text-[10px]">?</div>
            <span>BANTUAN</span>
          </div>
        </div>

        <div className="bg-[#c2c2c2] p-10 grid grid-cols-12 gap-8 relative monogram-bg min-h-[600px]">
          <div className="col-span-8 flex flex-col gap-6">
            <div className="flex justify-between px-6 py-3 bg-white/30 backdrop-blur-sm rounded-full border border-white/20">
              {['Satu', 'Dua', 'Tiga', 'Empat', 'Lima'].map((t, i) => {
                const currentIdx = i + 1;
                const isActive = currentIdx <= task.taskNumber;
                return (
                  <div key={i} className={`flex items-center gap-2 font-bold text-[11px] tracking-widest italic uppercase ${currentIdx === task.taskNumber ? 'text-black' : 'text-black/40'}`}>
                    <div className={`w-4 h-4 border border-black flex items-center justify-center ${isActive ? 'bg-emerald-500 border-emerald-500' : 'bg-white/50'}`}>
                      {isActive && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span>Tugas {t}</span>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-4 px-6">
              {[
                { label: "ID Akun Bisnis", value: task.phoneNumber },
                { label: "Harga Produk", value: formatCurrency(task.productPrice) },
                { label: "Profit Komisi", value: `${task.commissionRate}%` },
                { label: "Keuntungan", value: formatCurrency(task.profit) },
                { label: "Status Tugas", value: isConfirmed ? "Dikonfirmasi" : "Aktif" },
                { label: "Waktu Tugas", value: "60 Menit" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between border-b border-black/10 pb-2">
                  <div className="flex items-center font-bold italic text-[12px] uppercase tracking-tight text-black/70">
                    <CheckIcon active={true} />
                    {item.label}
                  </div>
                  <div className="font-extrabold italic text-[12px] text-black text-right uppercase">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-8 mt-1 no-print">
              <button 
                onClick={() => setIsConfirmed(true)}
                disabled={isConfirmed}
                className={`${isConfirmed ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#1b5e20] hover:bg-[#2e7d32]'} text-white px-10 py-2.5 rounded-full font-bold italic flex items-center gap-3 shadow-xl transition-all uppercase text-[10px] tracking-widest`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {isConfirmed ? 'Tugas Telah Dikonfirmasi' : 'Konfirmasi Tugas'}
              </button>
              {!isConfirmed && (
                <button className="bg-[#b71c1c] text-white px-10 py-2.5 rounded-full font-bold italic flex items-center gap-3 shadow-xl hover:bg-[#d32f2f] transition-all uppercase text-[10px] tracking-widest">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Batalkan Tugas
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="bg-black/95 text-white py-4 px-10 rounded-[20px] border border-white/10 shadow-2xl">
                 <div className="flex items-center justify-center gap-3 mb-3">
                   <div className="h-[1px] w-8 bg-white/20"></div>
                   <h4 className="font-bold italic text-center tracking-[0.2em] text-[11px] uppercase">Rincian Detail Tugas</h4>
                   <div className="h-[1px] w-8 bg-white/20"></div>
                 </div>
                 <div className="text-[12px] font-bold italic text-center leading-[1.6] tracking-tight uppercase px-4 opacity-95 flex flex-col gap-1">
                   <p>PEKERJAAN TELAH DIMULAI, SILAKAN MASUK KE DALAM AKUN ANDA UNTUK MELANJUTKAN.</p>
                   <p>TUGAS ANDA AKAN MENERIMA {dynamicOrderText}</p>
                   <p>DETAIL PEKERJAAN DIKIRIMKAN SECARA OTOMATIS OLEH SISTEM.</p>
                   <p>PENARIKAN SALDO DAPAT DILAKUKAN SETELAH SELURUH PEKERJAAN SELESAI SESUAI KETENTUAN.</p>
                 </div>
                 <div className="mt-5 pt-3 border-t border-white/5 opacity-20 text-[8px] text-center font-bold tracking-[0.4em] uppercase italic">
                   © 2016 - 2025 GUCCI S.p.A. - All rights reserved.
                 </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-md text-black p-5 rounded-[20px] border border-black/5 shadow-xl">
                 <div className="flex items-center justify-center gap-3 mb-2">
                   <div className="h-[1px] w-8 bg-black/10"></div>
                   <h4 className="font-bold italic text-center tracking-[0.2em] text-[11px] uppercase">Catatan Penting</h4>
                   <div className="h-[1px] w-8 bg-black/10"></div>
                 </div>
                 <div className="text-[11px] font-bold italic text-center leading-relaxed tracking-normal uppercase px-4 opacity-80 flex flex-col gap-1">
                   <p>Pemilik akun hanya perlu online dan melakukan promosi di dalam sistem GUCCI melalui akun bisnis yang tersedia pada fitur Akun Bisnis.</p>
                   <p>Seluruh proses tugas akan dijalankan secara otomatis oleh sistem.</p>
                   <p>Apabila tugas belum diselesaikan sepenuhnya, maka penarikan saldo belum dapat dilakukan.</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="col-span-4 bg-[#0a0a0a] text-white p-8 rounded-[32px] border border-white/10 flex flex-col shadow-2xl overflow-hidden">
            <div className="flex flex-col items-center gap-2 mb-4">
               <h4 className="font-bold italic text-center tracking-[0.2em] text-[12px] uppercase border-b border-white/20 pb-2 w-full">Kontrak & Ketentuan</h4>
            </div>
            
            <div className="mb-4 bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col items-center gap-1 text-center">
               <span className="text-[8px] tracking-[0.4em] font-black opacity-30 uppercase">Contract Serial Code</span>
               <span className="text-[13px] font-mono tracking-[0.1em] text-emerald-400 font-bold">{serialCode}</span>
            </div>

            <div className="space-y-3.5 text-[10px] font-medium leading-relaxed text-justify opacity-80 overflow-y-auto pr-1 custom-scrollbar max-h-[420px]">
              {[
                "Detail tugas akan diberikan langsung kepada Anda setelah Anda mengaktifkan tugas. Hindari aktivitas ilegal seperti penarikan dana yang tidak sesuai instruksi.",
                "Keuntungan yang diperoleh Anggota ditentukan berdasarkan pemilihan dari Koleksi Produk GUCCI.",
                "Setiap tugas akan ada perubahan jumlah harga dan paket untuk meningkatkan Rating Produk serta visitor Website GUCCI.",
                "Penarikan dana membutuhkan waktu sekitar 3-5 menit hingga dana masuk ke rekening yang terdaftar pada akun bisnis.",
                "Dalam setiap tugas, pemilik akun perlu menyelesaikan tugas sesuai dengan rincian yang sudah dikonfirmasi.",
                "Setiap Advisor mengirimkan Detail Tugas, Pemilik akun wajib memahami instruksi untuk prosedur penarikan dana.",
                "Detail Tugas yang sudah Dikonfirmasi tidak dapat dibatalkan dengan alasan apapun.",
                "Setiap Pemilik akun dapat menyelesaikan maksimal 5 kali tugas dalam periode satu hari kerja."
              ].map((text, i) => (
                <div key={i} className="flex gap-3">
                  <span className="font-bold text-white/30 shrink-0 text-[10px]">{i+1}.</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 flex justify-center no-print">
              <button 
                onClick={() => window.print()}
                className="bg-white/10 hover:bg-white/20 text-white px-10 py-2.5 rounded-full font-bold uppercase text-[9px] tracking-[0.3em] transition-all border border-white/10 shadow-lg"
              >
                Cetak Dokumen
              </button>
            </div>
          </div>
        </div>
      </div>

      {isConfirmed && <StatementLetter task={task} serialCode={serialCode} />}
    </div>
  );
};

export default TaskDetail;
