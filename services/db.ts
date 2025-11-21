import { Ebook } from '../types';

const STORAGE_KEY = 'luminebooks_data_v1';

// Initial seed data if storage is empty
const SEED_DATA: Ebook[] = [
  {
    id: '1',
    title: 'Mastering React 18',
    author: 'Code Masters',
    price: 150000,
    coverUrl: 'https://picsum.photos/400/600?random=1',
    description: 'Panduan lengkap menguasai React 18 dari dasar hingga mahir. Pelajari Hooks, Concurrent Mode, dan pola desain modern.',
    lynkUrl: 'https://app.sandbox.midtrans.com/payment-links/12345', // Example Placeholders
    downloadUrl: 'https://drive.google.com/',
    category: 'Teknologi & Coding',
    featured: true,
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'SEO Domination 2024',
    author: 'Digital Pro',
    price: 99000,
    coverUrl: 'https://picsum.photos/400/600?random=2',
    description: 'Strategi jitu menaklukkan mesin pencari Google. Teknik on-page dan off-page terbaru yang terbukti ampuh.',
    lynkUrl: 'https://app.sandbox.midtrans.com/payment-links/67890',
    downloadUrl: 'https://drive.google.com/',
    category: 'Pemasaran Digital',
    featured: true,
    createdAt: Date.now() - 10000
  },
  {
    id: '3',
    title: 'Financial Freedom Blueprint',
    author: 'Rich Advisor',
    price: 250000,
    coverUrl: 'https://picsum.photos/400/600?random=3',
    description: 'Rencana langkah demi langkah menuju kebebasan finansial di usia muda melalui investasi saham dan properti.',
    lynkUrl: 'https://app.sandbox.midtrans.com/payment-links/11223',
    downloadUrl: 'https://drive.google.com/',
    category: 'Bisnis & Keuangan',
    featured: false,
    createdAt: Date.now() - 20000
  }
];

export const getEbooks = (): Ebook[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
    return SEED_DATA;
  }
  return JSON.parse(data);
};

export const saveEbook = (ebook: Ebook): void => {
  const books = getEbooks();
  const index = books.findIndex(b => b.id === ebook.id);
  
  if (index >= 0) {
    books[index] = ebook;
  } else {
    books.push(ebook);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const deleteEbook = (id: string): void => {
  const books = getEbooks().filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};