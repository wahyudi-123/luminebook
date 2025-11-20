import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simple in-memory cache (backed by localStorage for persistence across reloads)
const getCachedResponse = (key: string): string | null => {
  const cached = localStorage.getItem(`gemini_cache_${key}`);
  if (cached) {
    try {
      const { data, expiry } = JSON.parse(cached);
      if (Date.now() < expiry) return data;
    } catch (e) {
      localStorage.removeItem(`gemini_cache_${key}`);
    }
  }
  return null;
};

const setCachedResponse = (key: string, data: string) => {
  const payload = {
    data,
    expiry: Date.now() + 24 * 60 * 60 * 1000 // 24 hours cache
  };
  localStorage.setItem(`gemini_cache_${key}`, JSON.stringify(payload));
};

export const generateMarketingCopy = async (title: string, category: string): Promise<string> => {
  const startTime = performance.now();
  const cacheKey = btoa(`${title}-${category}`); // Base64 encode key

  // 1. Check Cache
  const cached = getCachedResponse(cacheKey);
  if (cached) {
    console.log(`[Gemini] Cache hit for "${title}" (${Math.round(performance.now() - startTime)}ms)`);
    return cached;
  }

  try {
    const prompt = `
      Bertindaklah sebagai copywriter profesional dan ahli SEO.
      Tulis deskripsi produk yang menarik dan persuasif (bahasa Indonesia) untuk sebuah ebook berjudul "${title}" dalam kategori "${category}".
      
      Panduan:
      1. Gunakan gaya bahasa yang energik dan mendorong penjualan.
      2. Sertakan 3 poin utama (bullet points) tentang apa yang akan dipelajari pembaca.
      3. Optimalkan untuk SEO dengan menyertakan kata kunci relevan.
      4. Panjang maksimum 150 kata.
      5. Output dalam format plain text (tanpa markdown bold/italic berlebihan).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text;
    
    if (!text) {
        throw new Error("Empty response from AI");
    }

    // 2. Set Cache
    setCachedResponse(cacheKey, text);
    
    const duration = Math.round(performance.now() - startTime);
    console.log(`[Gemini] API Call success (${duration}ms)`);

    return text;
  } catch (error) {
    console.error("[Gemini] Generation Error:", error);
    return "Deskripsi tidak dapat dibuat saat ini. Silakan coba lagi atau tulis secara manual.";
  }
};