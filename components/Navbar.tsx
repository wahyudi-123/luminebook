import React from 'react';
import { BookOpen, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  isAdmin?: boolean;
  onNavigate: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin, onNavigate }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div 
          className="flex items-center gap-2 cursor-pointer select-none" 
          onClick={() => onNavigate('/')}
          onDoubleClick={() => onNavigate('/admin')}
        >
          <div className="rounded-lg bg-brand-600 p-1.5 text-white">
            <BookOpen size={24} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Lumine<span className="text-brand-600">Books</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {isAdmin && (
             <button
             onClick={() => onNavigate('/')}
             className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
           >
             <ShoppingBag size={18} />
             Lihat Toko
           </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;