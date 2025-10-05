// Common types for Innoweb.uz

export type Language = 'uz' | 'ru';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  slug: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  language: Language;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  message: string;
  service?: string;
  createdAt: Date;
  status: 'new' | 'contacted' | 'converted' | 'closed';
}
