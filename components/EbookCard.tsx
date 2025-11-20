import React, { useState } from 'react';
import { ShoppingCart, Star, Loader2, Check } from 'lucide-react';
import { Ebook } from '../types';
import { formatRupiah } from '../services/ebookService';
import PaymentModal from './PaymentModal';

interface EbookCardProps {
  ebook: Ebook;
}

const EbookCard: React.FC<EbookCardProps> = ({ ebook }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Safety check for missing data
  if (!ebook || !ebook.title) return null;

  const handleBuyClick = () => {
    setShowPaymentModal(true);
  };

  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    setIsProcessing(true);
    
    // Basic URL validation
    const isValidUrl = (urlString: string) => {
        try { return Boolean(new URL(urlString)); } 
        catch(e){ return false; }
    };

    if (ebook.lynkUrl && isValidUrl(ebook.lynkUrl)) {
      window.open(ebook.lynkUrl, '_blank');
    } else {
      alert("Link pembayaran tidak valid atau belum disetting admin.");
      setIsProcessing(false);
      return;
    }

    // Simulation of payment processing
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => {
        if (ebook.downloadUrl && isValidUrl(ebook.downloadUrl)) {
          window.location.href = ebook.downloadUrl;
        } else {
          alert("Pembayaran terdeteksi, namun link download kosong/invalid. Hubungi admin.");
          setIsProcessing(false);
          setIsSuccess(false);
        }
      }, 2000);
    }, 5000);
  };

  return (
    <>
      <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1 h-full">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
          <img
            src={ebook.coverUrl || 'https://via.placeholder.com/400x600'}
            alt={ebook.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x600?text=No+Image';
            }}
          />
          {ebook.featured && (
            <div className="absolute top-3 right-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-amber-900 shadow-lg flex items-center gap-1">
              <Star size={12} fill="currentColor" />
              Best Seller
            </div>
          )}
        </div>
        
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-brand-600">
              {ebook.category || 'Umum'}
            </span>
          </div>
          
          <h3 className="mb-1 text-lg font-bold text-slate-900 line-clamp-1" title={ebook.title}>
            {ebook.title}
          </h3>
          <p className="text-sm text-slate-500 mb-3">{ebook.author || 'Unknown Author'}</p>
          
          <p className="mb-4 line-clamp-2 text-sm text-slate-600 flex-1">
            {ebook.description || 'No description available.'}
          </p>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
            <span className="text-lg font-bold text-slate-900">
              {formatRupiah(ebook.price || 0)}
            </span>
            <button
              onClick={handleBuyClick}
              disabled={isProcessing}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isSuccess 
                   ? 'bg-green-600'
                   : isProcessing 
                      ? 'bg-slate-400 cursor-wait' 
                      : 'bg-slate-900 hover:bg-brand-600 focus:ring-brand-500'
              }`}
            >
              {isSuccess ? (
                <>
                  <Check size={16} />
                  <span>Berhasil!</span>
                </>
              ) : isProcessing ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Menunggu...</span>
                </>
              ) : (
                <>
                  <span>Beli</span>
                  <ShoppingCart size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title={ebook.title}
        price={ebook.price}
        onConfirm={handleConfirmPayment}
      />
    </>
  );
};

export default EbookCard;