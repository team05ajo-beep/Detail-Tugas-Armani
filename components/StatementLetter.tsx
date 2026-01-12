
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

  const taskDetailText = numberToWords(task.orderType);

  // Wide Barcode SVG for the bottom center
  const WideBarcode = () => (
    <svg width="400" height="60" viewBox="0 0 400 60" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
      <rect x="0" y="0" width="3" height="60" fill="black" />
      <rect x="6" y="0" width="1" height="60" fill="black" />
      <rect x="10" y="0" width="4" height="60" fill="black" />
      <rect x="18" y="0" width="2" height="60" fill="black" />
      <rect x="24" y="0" width="1" height="60" fill="black" />
      <rect x="30" y="0" width="5" height="60" fill="black" />
      <rect x="40" y="0" width="2" height="60" fill="black" />
      <rect x="48" y="0" width="3" height="60" fill="black" />
      <rect x="56" y="0" width="1" height="60" fill="black" />
      <rect x="62" y="0" width="4" height="60" fill="black" />
      <rect x="72" y="0" width="2" height="60" fill="black" />
      <rect x="80" y="0" width="1" height="60" fill="black" />
      <rect x="86" y="0" width="5" height="60" fill="black" />
      <rect x="96" y="0" width="2" height="60" fill="black" />
      <rect x="104" y="0" width="3" height="60" fill="black" />
      <rect x="112" y="0" width="1" height="60" fill="black" />
      <rect x="118" y="0" width="4" height="60" fill="black" />
      <rect x="128" y="0" width="2" height="60" fill="black" />
      <rect x="136" y="0" width="1" height="60" fill="black" />
      <rect x="142" y="0" width="5" height="60" fill="black" />
      <rect x="152" y="0" width="2" height="60" fill="black" />
      <rect x="160" y="0" width="3" height="60" fill="black" />
      <rect x="168" y="0" width="1" height="60" fill="black" />
      <rect x="174" y="0" width="4" height="60" fill="black" />
      <rect x="184" y="0" width="2" height="60" fill="black" />
      <rect x="192" y="0" width="1" height="60" fill="black" />
      <rect x="198" y="0" width="5" height="60" fill="black" />
      <rect x="208" y="0" width="2" height="60" fill="black" />
      <rect x="216" y="0" width="3" height="60" fill="black" />
      <rect x="224" y="0" width="1" height="60" fill="black" />
      <rect x="230" y="0" width="4" height="60" fill="black" />
      <rect x="240" y="0" width="2" height="60" fill="black" />
      <rect x="248" y="0" width="1" height="60" fill="black" />
      <rect x="254" y="0" width="5" height="60" fill="black" />
      <rect x="264" y="0" width="2" height="60" fill="black" />
      <rect x="272" y="0" width="3" height="60" fill="black" />
      <rect x="280" y="0" width="1" height="60" fill="black" />
      <rect x="286" y="0" width="4" height="60" fill="black" />
      <rect x="296" y="0" width="2" height="60" fill="black" />
      <rect x="304" y="0" width="1" height="60" fill="black" />
      <rect x="310" y="0" width="5" height="60" fill="black" />
      <rect x="320" y="0" width="2" height="60" fill="black" />
      <rect x="328" y="0" width="3" height="60" fill="black" />
      <rect x="336" y="0" width="1" height="60" fill="black" />
      <rect x="342" y="0" width="4" height="60" fill="black" />
      <rect x="352" y="0" width="2" height="60" fill="black" />
      <rect x="360" y="0" width="1" height="60" fill="black" />
      <rect x="366" y="0" width="5" height="60" fill="black" />
      <rect x="376" y="0" width="2" height="60" fill="black" />
      <rect x="384" y="0" width="3" height="60" fill="black" />
      <rect x="392" y="0" width="1" height="60" fill="black" />
      <rect x="397" y="0" width="3" height="60" fill="black" />
    </svg>
  );

  return (
    <div className="w-full max-w-[1000px] bg-white text-black p-16 shadow-2xl mt-12 border border-gray-200 relative overflow-hidden font-serif print:mt-0 print:shadow-none print:border-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <h1 className="text-[300px] font-bold">GA</h1>
      </div>

      <div className="relative z-10">
        <div className="border-b-2 border-black pb-8 mb-10 text-center">
          <h1 className="armani-font text-4xl tracking-[0.3em] font-light uppercase mb-2">GIORGIO ARMANI</h1>
          <p className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-60">Sistem Verifikasi Tugas Internal Milano</p>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold uppercase tracking-widest underline decoration-1 underline-offset-8">SURAT PERNYATAAN KONFIRMASI</h2>
          <p className="text-[11px] mt-4 font-sans font-bold text-gray-400">NOMOR REFERENSI: {task.id}</p>
        </div>

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

        {/* Updated Footer with Center Barcode */}
        <div className="mt-20 flex flex-col items-center">
          <div className="text-center mb-8">
            <p className="text-[12px] font-bold mb-2">{today}</p>
            <p className="text-[10px] font-bold uppercase opacity-40 tracking-[0.3em]">Tanggal Pengesahan Digital</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <WideBarcode />
            <div className="flex flex-col items-center mt-1">
              <span className="text-[11px] font-mono font-bold tracking-[0.5em] text-black/80">{serialCode}</span>
              <span className="text-[8px] font-bold uppercase opacity-30 tracking-[0.6em] mt-1">Digital Security Verification Code</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 text-[9px] text-center font-sans font-bold opacity-30 tracking-widest uppercase italic">
          Dokumen ini dihasilkan secara otomatis oleh Giorgio Armani Authentication Ledger dan bersifat sah secara digital.
        </div>
      </div>
      
      <div className="mt-10 flex justify-center no-print">
        <button 
          onClick={() => window.print()}
          className="bg-black text-white px-10 py-3 rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-gray-800 transition-all shadow-xl"
        >
          Cetak Surat Pernyataan
        </button>
      </div>
    </div>
  );
};

export default StatementLetter;
