import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Innoweb.uz - Professional Automation',
  description: 'Web saytlar, Telegram botlar, AI chatbotlar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
