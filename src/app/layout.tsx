import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Innoweb.uz - Professional Automation',
  description: 'Web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirishni taqdim etuvchi kompaniya',
  keywords: 'web sayt, telegram bot, AI chatbot, biznes avtomatlashtirish, Toshkent, O\'zbekiston',
  authors: [{ name: 'Innoweb.uz' }],
  openGraph: {
    title: 'Innoweb.uz - Professional Automation',
    description: 'Web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirishni taqdim etuvchi kompaniya',
    url: 'https://innoweb.uz',
    siteName: 'Innoweb.uz',
    locale: 'uz_UZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
