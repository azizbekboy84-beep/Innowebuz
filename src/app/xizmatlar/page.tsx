import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, MessageSquare, Bot, Workflow, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'web',
    icon: Globe,
    title: 'Web Sayt Yaratish',
    description: 'Zamonaviy va professional web saytlar',
    gradient: 'from-blue-500 to-cyan-500',
    packages: [
      {
        name: 'Landing Page',
        price: '3,000,000',
        features: [
          'Responsive dizayn',
          'SEO optimizatsiya',
          'Contact forma',
          'Google Analytics',
          '3 oy texnik yordam',
        ],
      },
      {
        name: 'Korporativ Sayt',
        price: '8,000,000',
        features: [
          'Landing + Hamma sahifalar',
          'Admin panel',
          'Blog tizimi',
          'Ko\'p tillilik',
          '6 oy texnik yordam',
        ],
      },
      {
        name: 'E-commerce',
        price: '15,000,000',
        features: [
          'To\'liq onlayn do\'kon',
          'To\'lov tizimlari',
          'Mahsulot boshqaruvi',
          'Buyurtmalar tizimi',
          '12 oy texnik yordam',
        ],
      },
    ],
  },
  {
    id: 'telegram',
    icon: MessageSquare,
    title: 'Telegram Bot',
    description: 'Biznes uchun Telegram bot yaratish',
    gradient: 'from-cyan-500 to-blue-500',
    packages: [
      {
        name: 'Oddiy Bot',
        price: '2,000,000',
        features: [
          'Auto-javob',
          'FAQ',
          'Ma\'lumot yuborish',
          'Tugmalar',
          '3 oy qo\'llab-quvvatlash',
        ],
      },
      {
        name: 'Biznes Bot',
        price: '5,000,000',
        features: [
          'Oddiy bot + CRM',
          'To\'lov qabul qilish',
          'Analytics',
          'Admin panel',
          '6 oy qo\'llab-quvvatlash',
        ],
      },
    ],
  },
  {
    id: 'chatbot',
    icon: Bot,
    title: 'AI Chatbot',
    description: '24/7 intelligent mijozlar xizmati',
    gradient: 'from-purple-500 to-pink-500',
    packages: [
      {
        name: 'Saytga Chatbot',
        price: '4,000,000',
        features: [
          'ChatGPT integration',
          '24/7 ishlash',
          'Ko\'p tillilik',
          'Kompaniya bo\'yicha o\'rgatish',
          '6 oy qo\'llab-quvvatlash',
        ],
      },
      {
        name: 'Telegram + Sayt',
        price: '7,000,000',
        features: [
          'Saytga + Telegram',
          'Unified inbox',
          'CRM integratsiya',
          'Advanced AI',
          '12 oy qo\'llab-quvvatlash',
        ],
      },
    ],
  },
  {
    id: 'automation',
    icon: Workflow,
    title: 'Biznes Avtomatlashtirish',
    description: 'CRM, ERP va boshqa tizimlar',
    gradient: 'from-pink-500 to-purple-500',
    packages: [
      {
        name: 'CRM Tizimi',
        price: '12,000,000',
        features: [
          'Mijozlar boshqaruvi',
          'Lead tracking',
          'Hisobotlar',
          'Integratsiyalar',
          '12 oy qo\'llab-quvvatlash',
        ],
      },
      {
        name: 'Custom Solution',
        price: 'Shartnoma',
        features: [
          'Maxsus loyiha',
          'To\'liq tahlil',
          'Custom development',
          'Training',
          'Uzoq muddatli support',
        ],
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Bizning Xizmatlar
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Har bir biznes uchun moslashtirilgan professional raqamli yechimlar
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      {services.map((service, idx) => {
        const Icon = service.icon;
        return (
          <section key={service.id} id={service.id} className={idx % 2 === 0 ? 'py-20 bg-white dark:bg-gray-950' : 'py-20 bg-gray-50 dark:bg-gray-900'}>
            <div className="container px-4 mx-auto">
              {/* Service Header */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <div className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                  {service.title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </div>

              {/* Packages */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {service.packages.map((pkg, i) => (
                  <Card key={i} className="p-8 border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-800">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {pkg.price}
                        </span>
                        {pkg.price !== 'Shartnoma' && (
                          <span className="text-gray-600 dark:text-gray-400">UZS</span>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link href="/aloqa">
                      <Button className={`w-full bg-gradient-to-r ${service.gradient} hover:opacity-90`}>
                        Buyurtma berish
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            O'zingizga mos paketni topmadingizmi?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Biz har bir biznes uchun individual yechim tayyorlaymiz
          </p>
          <Link href="/aloqa">
            <Button size="lg" variant="secondary" className="bg-white hover:bg-gray-100 text-blue-600">
              Bepul Konsultatsiya
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
