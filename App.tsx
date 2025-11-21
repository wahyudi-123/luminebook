import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import EbookCard from './components/EbookCard';
import SEO from './components/SEO';
import ErrorBoundary from './components/ErrorBoundary';
import { Ebook, CATEGORIES } from './types';
import * as ebookService from './services/ebookService';
import * as gemini from './services/geminiService';
import { 
  Trash2, Plus, Edit, Wand2, Save, X, Check, Loader2, Search, 
  ShieldCheck, CreditCard, Smartphone, ArrowRight, ChevronUp, ChevronDown, Send, Database, Upload, Image as ImageIcon
} from 'lucide-react';

// --- SHARED COMPONENTS ---

const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">LumineBooks</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Platform ebook digital terpercaya. Nikmati kemudahan transaksi otomatis dengan teknologi Midtrans.
            </p>
          </div>
          <div>
             <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Metode Pembayaran</h3>
             <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="bg-white px-2 py-1 rounded border border-slate-200 font-semibold text-blue-800">Midtrans</span>
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">QRIS</span>
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">BCA</span>
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">Mandiri</span>
                <span className="bg-slate-100 px-2 py-1 rounded border border-slate-200">GoPay</span>
             </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Bantuan</h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><button onClick={() => onNavigate('/how-to-buy')} className="hover:text-brand-600 text-left">Cara Pembelian</button></li>
              <li><button onClick={() => onNavigate('/confirmation')} className="hover:text-brand-600 text-left">Konfirmasi Pembayaran</button></li>
              <li><button onClick={() => onNavigate('/faq')} className="hover:text-brand-600 text-left">FAQ</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center">
          <p className="text-xs leading-5 text-slate-400">
            &copy; {new Date().getFullYear()} LumineBooks. Powered by Google Gemini, Supabase & Midtrans.
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- PAGE COMPONENTS ---

const HomePage: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await ebookService.getEbooks();
      setEbooks(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredEbooks = ebooks.filter(book => {
    const matchesCategory = filter === 'All' || book.category === filter;
    const matchesSearch = (book.title || '').toLowerCase().includes(search.toLowerCase()) || 
                          (book.description || '').toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToCollection = () => {
    const element = document.getElementById('collection');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEO title="LumineBooks | Koleksi Ebook Digital Premium" description="Beli ebook berkualitas dengan pembayaran mudah via Midtrans." />
      <Navbar onNavigate={(path) => navigate(path)} />

      <div className="relative overflow-hidden bg-slate-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Perluas Wawasan dengan <span className="text-brand-500">Ebook Premium</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Akses instan ke ratusan buku digital pilihan. Pembayaran otomatis dan aman didukung oleh Midtrans.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button onClick={scrollToCollection} className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-500">
              Lihat Koleksi
            </button>
          </div>
        </div>
      </div>

      <main id="collection" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex-grow w-full">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-wrap justify-center gap-2">
            <button onClick={() => setFilter('All')} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === 'All' ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>Semua</button>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === cat ? 'bg-brand-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}>{cat}</button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Search className="h-4 w-4 text-slate-400" /></div>
            <input type="text" className="block w-full rounded-full border-0 py-2 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-600 sm:text-sm sm:leading-6" placeholder="Cari judul..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-600" size={40} /></div>
        ) : filteredEbooks.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filteredEbooks.map(book => <EbookCard key={book.id} ebook={book} />)}
          </div>
        ) : (
          <div className="text-center py-20"><p className="text-slate-500 text-lg">Tidak ada ebook yang ditemukan.</p></div>
        )}
      </main>
      <Footer onNavigate={(path) => navigate(path)} />
    </div>
  );
};

const HowToBuyPage: React.FC = () => {
    const navigate = useNavigate();
    const steps = [
      { icon: <Search className="text-brand-600" size={32} />, title: "1. Pilih Ebook", desc: "Cari dan pilih ebook yang Anda butuhkan." },
      { icon: <CreditCard className="text-brand-600" size={32} />, title: "2. Bayar via Midtrans", desc: "Pilih QRIS, Bank Transfer, atau E-Wallet." },
      { icon: <Loader2 className="text-brand-600" size={32} />, title: "3. Tunggu Verifikasi", desc: "Sistem memverifikasi otomatis dalam beberapa detik." },
      { icon: <Loader2 className="text-brand-600" size={32} />, title: "4. Download", desc: "Otomatis redirect ke Google Drive." }
    ];
  
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <SEO title="Cara Pembelian | LumineBooks" description="Panduan mudah membeli ebook." />
        <Navbar onNavigate={(path) => navigate(path)} />
        <main className="flex-grow mx-auto max-w-4xl px-4 py-16 w-full">
          <div className="text-center mb-16"><h1 className="text-3xl font-bold text-slate-900 mb-4">Cara Pembelian</h1></div>
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer onNavigate={(path) => navigate(path)} />
      </div>
    );
  };

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <SEO title="Konfirmasi Pembayaran" description="Bantuan manual." />
      <Navbar onNavigate={(path) => navigate(path)} />
      <main className="flex-grow mx-auto max-w-3xl px-4 py-16 w-full">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="text-green-600 mb-4 flex justify-center"><Check size={40} /></div>
              <h3 className="text-2xl font-bold mb-2">Laporan Terkirim</h3>
              <button onClick={() => navigate('/')} className="text-brand-600 hover:underline">Kembali ke Beranda</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
              <h1 className="text-2xl font-bold">Konfirmasi Manual</h1>
              <input required className="w-full rounded-lg border-slate-300" placeholder="Nama Lengkap" />
              <input required className="w-full rounded-lg border-slate-300" placeholder="Email" />
              <textarea required rows={4} className="w-full rounded-lg border-slate-300" placeholder="Detail masalah..."></textarea>
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-brand-600">Kirim</button>
            </form>
          )}
        </div>
      </main>
      <Footer onNavigate={(path) => navigate(path)} />
    </div>
  );
};

const FAQPage: React.FC = () => {
    const navigate = useNavigate();
    const [openIdx, setOpenIdx] = useState<number | null>(0);
    const faqs = [
      { q: "Apakah ebook bisa didownload?", a: "Ya, otomatis setelah pembayaran sukses." },
      { q: "Metode pembayaran?", a: "QRIS, Bank Transfer, dll via Midtrans." }
    ];
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <SEO title="FAQ" description="Pertanyaan umum." />
        <Navbar onNavigate={(path) => navigate(path)} />
        <main className="flex-grow mx-auto max-w-3xl px-4 py-16 w-full">
          <h1 className="text-3xl font-bold mb-8 text-center">FAQ</h1>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)} className="w-full flex justify-between p-5 text-left font-semibold">
                  {item.q} {openIdx === idx ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                </button>
                {openIdx === idx && <div className="p-5 pt-0 text-slate-600 border-t border-slate-50">{item.a}</div>}
              </div>
            ))}
          </div>
        </main>
        <Footer onNavigate={(path) => navigate(path)} />
      </div>
    );
};

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Partial<Ebook>>({
    title: '', author: '', price: 0, category: CATEGORIES[0], lynkUrl: '', downloadUrl: '', coverUrl: 'https://picsum.photos/400/600', description: '', featured: false
  });

  useEffect(() => {
    if (localStorage.getItem('lumine_admin_session') === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = async () => {
    setLoadingData(true);
    const data = await ebookService.getEbooks();
    setEbooks(data);
    setLoadingData(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('lumine_admin_session', 'true');
      loadData();
    } else alert("Password salah!");
  };

  const handleGenerateDescription = async () => {
    if (!formData.title) return alert("Masukkan judul dahulu.");
    setLoadingAi(true);
    const desc = await gemini.generateMarketingCopy(formData.title, formData.category || 'Umum');
    setFormData(prev => ({ ...prev, description: desc }));
    setLoadingAi(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverFile(file);
      // Create a local preview
      const objectUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, coverUrl: objectUrl }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingData(true);

    let finalCoverUrl = formData.coverUrl;

    // Upload image if a new file is selected
    if (coverFile) {
      setUploading(true);
      const uploadedUrl = await ebookService.uploadCoverImage(coverFile);
      setUploading(false);
      
      if (uploadedUrl) {
        finalCoverUrl = uploadedUrl;
      } else {
        // If upload fails, stop submission
        setLoadingData(false);
        return;
      }
    }

    const newBook: Ebook = {
      id: isEditing || crypto.randomUUID(),
      title: formData.title!,
      author: formData.author!,
      price: Number(formData.price),
      coverUrl: finalCoverUrl!,
      description: formData.description!,
      lynkUrl: formData.lynkUrl!,
      downloadUrl: formData.downloadUrl || '',
      category: formData.category!,
      featured: formData.featured || false,
      createdAt: Date.now() 
    };

    await ebookService.saveEbook(newBook);
    await loadData();
    
    // Reset form
    setLoadingData(false);
    setIsEditing(null);
    setFormData({ title: '', author: '', price: 0, category: CATEGORIES[0], lynkUrl: '', downloadUrl: '', coverUrl: 'https://picsum.photos/400/600', description: '', featured: false });
    setCoverFile(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin hapus?')) {
      setLoadingData(true);
      await ebookService.deleteEbook(id);
      await loadData();
      setLoadingData(false);
    }
  };

  const handleSeed = async () => {
    if (confirm('Isi database dengan data contoh? Data yang ada tidak akan dihapus.')) {
      setLoadingData(true);
      await ebookService.seedDatabase();
      await loadData();
      setLoadingData(false);
    }
  };

  if (!isAuthenticated) return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border p-2 rounded" placeholder="Password (admin123)" />
          <button type="submit" className="w-full bg-slate-900 text-white py-2 rounded hover:bg-slate-800">Masuk</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <SEO title="Admin Dashboard" description="Manage products" />
      <Navbar isAdmin onNavigate={(path) => navigate(path)} />
      <div className="mx-auto max-w-6xl px-4 py-10">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <button 
              onClick={handleSeed} 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <Database size={16} />
              Isi Data Contoh
            </button>
         </div>
         <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl border shadow-sm sticky top-24">
                    <h2 className="font-bold mb-4">{isEditing ? 'Edit' : 'Tambah'} Produk</h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input placeholder="Judul" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border rounded p-2 text-sm" required />
                        <input placeholder="Penulis" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full border rounded p-2 text-sm" required />
                        <input placeholder="Harga" type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full border rounded p-2 text-sm" required />
                        <select 
                          value={formData.category} 
                          onChange={e => setFormData({...formData, category: e.target.value})} 
                          className="w-full border rounded p-2 text-sm bg-white"
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        
                        {/* Image Upload Section */}
                        <div className="border rounded p-3 space-y-2">
                          <label className="block text-xs font-bold text-slate-500 uppercase">Cover Image</label>
                          
                          <div className="flex items-center gap-3">
                             <div className="relative w-16 h-20 bg-slate-100 rounded overflow-hidden border flex-shrink-0">
                               {formData.coverUrl ? (
                                 <img src={formData.coverUrl} alt="Preview" className="w-full h-full object-cover" />
                               ) : (
                                 <div className="flex items-center justify-center h-full text-slate-300"><ImageIcon size={20} /></div>
                               )}
                             </div>
                             <div className="flex-1">
                               <input 
                                 type="file" 
                                 accept="image/*" 
                                 onChange={handleFileChange} 
                                 className="block w-full text-xs text-slate-500
                                   file:mr-2 file:py-2 file:px-3
                                   file:rounded-full file:border-0
                                   file:text-xs file:font-semibold
                                   file:bg-brand-50 file:text-brand-700
                                   hover:file:bg-brand-100
                                 "
                               />
                               <div className="mt-1 text-[10px] text-slate-400">Atau paste URL manual:</div>
                               <input 
                                 placeholder="https://..." 
                                 value={formData.coverUrl} 
                                 onChange={e => setFormData({...formData, coverUrl: e.target.value})} 
                                 className="w-full border-b text-xs py-1 focus:outline-none focus:border-brand-500" 
                               />
                             </div>
                          </div>
                        </div>

                        <input placeholder="Midtrans Link" value={formData.lynkUrl} onChange={e => setFormData({...formData, lynkUrl: e.target.value})} className="w-full border rounded p-2 text-sm" required />
                        <input placeholder="GDrive Link" value={formData.downloadUrl} onChange={e => setFormData({...formData, downloadUrl: e.target.value})} className="w-full border rounded p-2 text-sm" />
                        
                        <textarea placeholder="Deskripsi" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border rounded p-2 text-sm" rows={3} required />
                        
                        <div className="flex items-center gap-2 mt-2">
                           <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
                           <label htmlFor="featured" className="text-sm text-slate-600">Featured (Best Seller)</label>
                        </div>

                        <button type="button" onClick={handleGenerateDescription} disabled={loadingAi} className="text-xs text-purple-600 font-bold flex items-center gap-1 mt-2">
                           {loadingAi ? <Loader2 className="animate-spin" size={12} /> : <Wand2 size={12} />} Generate AI Description
                        </button>
                        <button type="submit" disabled={uploading || loadingData} className="w-full bg-slate-900 text-white py-2 rounded text-sm font-bold mt-4 flex items-center justify-center gap-2">
                          {uploading ? (
                            <><Loader2 className="animate-spin" size={16} /> Uploading Image...</>
                          ) : loadingData ? (
                            <><Loader2 className="animate-spin" size={16} /> Saving...</>
                          ) : 'Simpan'}
                        </button>
                        {isEditing && (
                          <button type="button" onClick={() => { setIsEditing(null); setFormData({ title: '', author: '', price: 0, category: CATEGORIES[0], lynkUrl: '', downloadUrl: '', coverUrl: 'https://picsum.photos/400/600', description: '', featured: false }); setCoverFile(null); }} className="w-full border border-slate-300 text-slate-600 py-2 rounded text-sm font-bold mt-2">
                            Batal Edit
                          </button>
                        )}
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2">
                {loadingData && !uploading ? <div className="text-center py-10">Loading Data...</div> : (
                    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left text-xs">Produk</th><th className="px-4 py-2 text-right text-xs">Aksi</th></tr></thead>
                            <tbody className="divide-y divide-slate-200">
                                {ebooks.map(b => (
                                    <tr key={b.id}>
                                        <td className="px-4 py-3 text-sm font-medium">
                                          <div className="flex items-center gap-3">
                                            <img src={b.coverUrl} alt="" className="w-8 h-10 object-cover rounded bg-slate-100" />
                                            <div>
                                              <div className="font-bold text-slate-900">{b.title}</div>
                                              <div className="text-xs text-slate-500">{b.category}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button onClick={() => { setFormData(b); setIsEditing(b.id); setCoverFile(null); }} className="text-blue-600 mr-2 hover:bg-blue-50 p-1 rounded"><Edit size={16} /></button>
                                            <button onClick={() => handleDelete(b.id)} className="text-red-600 hover:bg-red-50 p-1 rounded"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/how-to-buy" element={<HowToBuyPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/faq" element={<FAQPage />} />
        </Routes>
      </HashRouter>
    </ErrorBoundary>
  );
};

export default App;