import * as React from 'react';

export interface Ebook {
  id: string;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  description: string;
  lynkUrl: string; // The external checkout link (e.g., Lynk.id, Gumroad)
  downloadUrl: string; // The delivery link (e.g., Google Drive)
  category: string;
  featured: boolean;
  createdAt: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export const CATEGORIES = [
  "Bisnis & Keuangan",
  "Pengembangan Diri",
  "Teknologi & Coding",
  "Pemasaran Digital",
  "Fiksi & Sastra"
] as const;

export type CategoryType = typeof CATEGORIES[number];