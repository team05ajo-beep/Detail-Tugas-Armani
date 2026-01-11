
import React from 'react';
import { GeneratedTask } from '../types';

interface StatementLetterProps {
  task: GeneratedTask;
  serialCode: string;
}

const StatementLetter: React.FC<StatementLetterProps> = ({ task, serialCode }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(val).replace('Rp', 'Rp ');
  };

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Helper to convert number string to Indonesian words for uniform detail text
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
    // Update: Changing the order as requested
    return `${word} PRODUK UNTUK ${word} PESANAN.`;
  };

  const taskDetailText = numberToWords(task.orderType);

  return (
    <div className="w-full max-w-[1000px] bg-white text-black p-16 shadow-2xl mt-12 border border-gray-200 relative overflow-hidden font-serif print:mt-0 print:shadow-none print:border-none">
      {/* Background Seal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <h1 className="text-[300px] font-bold">GA</h1>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="border-b-2 border-black pb-8 mb-10 text-center">
          <h1 className="armani-font text-4xl tracking-[0.3em] font-light uppercase mb-2">GIORGIO ARMANI</h1>
          <p className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Sistem Verifikasi Tugas Internal Milano</p>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-widest underline decoration-1 underline-offset-8">SURAT PERNYATAAN KONFIRMASI</h2>
          <p className="text-[11px] mt-4 font-sans font-bold text-gray-400">NOMOR REFERENSI: {task.id}</p>
        </div>

        {/* Content */}
        <div className="space-y-6 text-[14px] leading-relaxed text-justify font-sans">
          <p>Dengan ini, sistem <strong>Giorgio Armani S.p.A</strong> menyatakan bahwa pemilik akun bisnis dengan identitas di bawah ini telah secara resmi mengonfirmasi penerimaan tugas operasional:</p>
          
          <div className="bg-gray-50 p-8 border border-gray-100 rounded-lg space-y-4 my-8">
            <div className="grid grid-cols-2 gap-y-3">
              <span className="font-bold text-gray-500 uppercase text-[11px]">ID Akun Bisnis</span>
              <span className="font-bold border-b border-gray-200">{task.phoneNumber}</span>
              
              <span className="font-bold text-gray-500 uppercase text-[11px]">Nominal Transaksi</span>
              <span className="font-bold border-b border-gray-200">{formatCurrency(task.productPrice)}</span>
              
              <span className="font-bold text-gray-500 uppercase text-[11px]">Kode Serial Kontrak</span>
              <span className="font-bold border-b border-gray-200 text-emerald-600">{serialCode}</span>
              
              <span className="font-bold text-gray-500 uppercase text-[11px]">Rincian Tugas</span>
              <span className="font-bold border-b border-gray-200">TUGAS KE-{task.taskNumber} ({taskDetailText})</span>
            </div>
          </div>

          <p>Bahwa pihak pemilik akun menyetujui untuk menyelesaikan seluruh rangkaian promosi pada fitur Akun Bisnis sesuai dengan nominal yang tertera. Seluruh proses akan dipantau oleh sistem otomatis Giorgio Armani guna memastikan validitas peningkatan rating produk.</p>
          
          <p>Saldo dan komisi sebesar <strong>{task.commissionRate}%</strong> akan secara otomatis dicairkan ke rekening terdaftar setelah pemilik akun menyelesaikan tanggung jawab pekerjaan sesuai ketentuan yang berlaku pada Kontrak Kerja Sama Digital.</p>
        </div>

        {/* Signatures */}
        <div className="mt-20 flex justify-between items-end px-10">
          <div className="text-center">
            <p className="text-[12px] font-bold mb-16 uppercase">Sistem Otomatis GA</p>
            <div className="w-40 h-[1px] bg-black mx-auto"></div>
            <p className="text-[10px] mt-2 font-bold opacity-40">Verifikasi Digital</p>
          </div>
          
          <div className="text-center">
            <p className="text-[12px] font-bold mb-2">{today}</p>
            <p className="text-[12px] font-bold mb-16 uppercase">Pemilik Akun</p>
            <div className="w-40 h-[1px] bg-black mx-auto"></div>
            <p className="text-[10px] mt-2 font-bold opacity-40">Tanda Tangan Konfirmasi</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-gray-100 text-[9px] text-center font-sans font-bold opacity-30 tracking-widest uppercase italic">
          Dokumen ini dihasilkan secara otomatis oleh Giorgio Armani Authentication Ledger dan bersifat sah secara digital.
        </div>
      </div>
      
      <div className="mt-10 flex justify-center no-print">
        <button 
          onClick={() => window.print()}
          className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-gray-800 transition-all"
        >
          Cetak Surat Pernyataan
        </button>
      </div>
    </div>
  );
};

export default StatementLetter;
