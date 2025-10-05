import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Innoweb.uz - Professional Digital Solutions',
  description: 'Web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish xizmatlari',
  keywords: 'web development, telegram bot, ai chatbot, business automation, uzbekistan, tashkent',
  authors: [{ name: 'Innoweb.uz' }],
  openGraph: {
    title: 'Innoweb.uz - Professional Digital Solutions',
    description: 'Web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish',
    url: 'https://innoweb.uz',
    siteName: 'Innoweb.uz',
    locale: 'uz_UZ',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body className="antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
