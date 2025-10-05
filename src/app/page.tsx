import Hero from '@/components/homepage/Hero';
import Services from '@/components/homepage/Services';
import Features from '@/components/homepage/Features';
import Process from '@/components/homepage/Process';
import CTA from '@/components/homepage/CTA';

export const metadata = {
  title: 'Innoweb.uz - Biznesingizni Raqamlashtiring',
  description: 'Professional web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish xizmatlari. Bepul konsultatsiya!',
};

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Features />
      <Process />
      <CTA />
    </>
  );
}
