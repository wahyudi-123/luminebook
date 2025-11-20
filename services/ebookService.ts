import { supabase } from '../lib/supabase';
import { Ebook } from '../types';

const TABLE_NAME = 'ebooks';
const BUCKET_NAME = 'covers';

export const getEbooks = async (): Promise<Ebook[]> => {
  try {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Map snake_case (DB) to camelCase (Frontend)
    return (data || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      author: item.author,
      price: item.price,
      coverUrl: item.cover_url,
      description: item.description,
      lynkUrl: item.lynk_url,
      downloadUrl: item.download_url,
      category: item.category,
      featured: item.featured,
      createdAt: item.created_at
    }));
  } catch (err) {
    console.error("Error fetching ebooks:", err);
    return [];
  }
};

export const uploadCoverImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading image:", error);
    alert("Gagal upload gambar. Pastikan Bucket 'covers' sudah dibuat di Supabase Storage dan Policy 'Insert' sudah diaktifkan.");
    return null;
  }
};

export const saveEbook = async (ebook: Ebook): Promise<boolean> => {
  try {
    const payload = {
      id: ebook.id,
      title: ebook.title,
      author: ebook.author,
      price: ebook.price,
      cover_url: ebook.coverUrl,
      description: ebook.description,
      lynk_url: ebook.lynkUrl,
      download_url: ebook.downloadUrl,
      category: ebook.category,
      featured: ebook.featured,
      created_at: ebook.createdAt
    };

    const { error } = await supabase
      .from(TABLE_NAME)
      .upsert(payload);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error saving ebook:", err);
    return false;
  }
};

export const deleteEbook = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from(TABLE_NAME)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error deleting ebook:", err);
    return false;
  }
};

export const seedDatabase = async (): Promise<void> => {
  const SEED_DATA = [
    {
      id: crypto.randomUUID(),
      title: 'Mastering React 18',
      author: 'Code Masters',
      price: 150000,
      cover_url: 'https://picsum.photos/400/600?random=1',
      description: 'Panduan lengkap menguasai React 18. Pelajari Hooks, Concurrent Mode, dan pola desain modern untuk membangun aplikasi web yang skalabel.',
      lynk_url: 'https://app.sandbox.midtrans.com/payment-links/12345',
      download_url: 'https://drive.google.com/',
      category: 'Teknologi & Coding',
      featured: true,
      created_at: Date.now()
    },
    {
      id: crypto.randomUUID(),
      title: 'SEO Domination 2024',
      author: 'Digital Pro',
      price: 99000,
      cover_url: 'https://picsum.photos/400/600?random=2',
      description: 'Strategi jitu menaklukkan mesin pencari Google. Teknik on-page dan off-page terbaru yang terbukti ampuh menaikkan ranking.',
      lynk_url: 'https://app.sandbox.midtrans.com/payment-links/67890',
      download_url: 'https://drive.google.com/',
      category: 'Pemasaran Digital',
      featured: true,
      created_at: Date.now() - 10000
    },
    {
      id: crypto.randomUUID(),
      title: 'Financial Freedom Blueprint',
      author: 'Rich Advisor',
      price: 250000,
      cover_url: 'https://picsum.photos/400/600?random=3',
      description: 'Rencana langkah demi langkah menuju kebebasan finansial di usia muda melalui investasi saham, properti, dan manajemen aset.',
      lynk_url: 'https://app.sandbox.midtrans.com/payment-links/11223',
      download_url: 'https://drive.google.com/',
      category: 'Bisnis & Keuangan',
      featured: false,
      created_at: Date.now() - 20000
    }
  ];

  try {
    const { error } = await supabase.from(TABLE_NAME).insert(SEED_DATA);
    if (error) throw error;
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
    alert("Gagal mengisi data. Pastikan tabel 'ebooks' sudah dibuat di Supabase.");
  }
};

export const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};