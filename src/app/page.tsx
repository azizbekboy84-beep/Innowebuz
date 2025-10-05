import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            AI-powered Digital Solutions
          </span>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Biznesingizni Raqamlashtiring
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Professional web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirish yechimlari
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/aloqa">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 gap-2">
              Bepul Konsultatsiya
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button size="lg" variant="outline">
              Portfolio ko'rish
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { label: 'Loyihalar', value: '50+' },
            { label: 'Mijozlar', value: '100+' },
            { label: 'Telegram Botlar', value: '30+' },
            { label: 'Tajriba', value: '5+ yil' },
          ].map((stat, i) => (
            <Card key={i} className="p-6 text-center border-2 hover:border-blue-300 transition-colors">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="mt-20 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-semibold">Bosqich 3 - Layout va UI ✓</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 justify-center text-sm">
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full">✓ Navbar</span>
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full">✓ Footer</span>
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full">✓ ShadCN UI</span>
            <span className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full">✓ Layout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
