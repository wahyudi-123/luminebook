import React from 'react';
import { X, ShieldCheck, Lock, CreditCard, Smartphone, Globe } from 'lucide-react';
import { formatRupiah } from '../services/db';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, title, price, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/5 flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
             <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Midtrans.png/1200px-Midtrans.png" 
                alt="Midtrans" 
                className="h-6 object-contain opacity-80"
             />
          </div>
          <button 
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-slate-500 mb-1">Total Pembayaran</p>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{formatRupiah(price)}</h2>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 mb-6">
            <p className="text-xs font-semibold uppercase text-slate-400 mb-2">Item</p>
            <div className="flex items-start gap-3">
              <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="font-medium text-slate-900 text-sm leading-tight">{title}</h3>
                <p className="text-xs text-slate-500 mt-1">Digital Ebook (PDF)</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-2">
            <p className="text-xs font-semibold text-slate-500 text-center uppercase tracking-wide">Didukung Oleh Midtrans</p>
            <div className="flex justify-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
               <div className="bg-white border border-slate-200 p-1.5 rounded flex items-center" title="QRIS"><Smartphone size={16} /></div>
               <div className="bg-white border border-slate-200 p-1.5 rounded flex items-center" title="Bank Transfer"><CreditCard size={16} /></div>
               <div className="bg-white border border-slate-200 p-1.5 rounded flex items-center" title="E-Wallet"><Globe size={16} /></div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0">
          <button
            onClick={onConfirm}
            className="w-full rounded-xl bg-brand-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/30 hover:bg-brand-700 hover:shadow-brand-600/40 transition active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Lanjut ke Pembayaran</span>
          </button>
          
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck size={12} className="text-green-500" />
            <span>Enkripsi Secure Payment Gateway</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;