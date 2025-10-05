import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, MessageSquare, Bot, Workflow, ArrowRight, Check } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Saytlar',
    description: 'Zamonaviy va tez ishlaydigan web saytlar',
    features: [
      'Landing Page',
      'Korporativ Sayt',
      'E-commerce',
      'SEO Optimizatsiya',
    ],
    price: '3,000,000',
    gradient: 'from-blue-500 to-cyan-500',
    href: '/xizmatlar#web',
  },
  {
    icon: MessageSquare,
    title: 'Telegram Botlar',
    description: 'Avtomatlashtirish va mijozlar bilan aloqa',
    features: [
      'Auto-javob',
      "To'lov qabul qilish",
      'CRM integratsiya',
      'Analytics',
    ],
    price: '2,000,000',
    gradient: 'from-cyan-500 to-blue-500',
    href: '/xizmatlar#telegram',
  },
  {
    icon: Bot,
    title: 'AI Chatbotlar',
    description: '24/7 intelligent mijozlar xizmati',
    features: [
      'ChatGPT integration',
      "Ko'p tillilik",
      'Saytga integratsiya',
      'Learning capability',
    ],
    price: '4,000,000',
    gradient: 'from-purple-500 to-pink-500',
    href: '/xizmatlar#chatbot',
  },
  {
    icon: Workflow,
    title: 'Biznes Avtomatlashtirish',
    description: 'CRM, ERP va boshqa tizimlar',
    features: [
      'CRM tizimi',
      'Avtomatik hisobotlar',
      'API integratsiya',
      'Workflow automation',
    ],
    price: '12,000,000',
    gradient: 'from-pink-500 to-purple-500',
    href: '/xizmatlar#automation',
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-full">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Bizning Xizmatlar
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              To'liq Raqamli Yechimlar
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Sizning biznesingiz uchun zamonaviy texnologiyalar
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 bg-white dark:bg-gray-900"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                <div className="relative p-6">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {service.price}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        UZS dan
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link href={service.href}>
                    <Button variant="ghost" className="group/btn w-full justify-between">
                      Batafsil
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link href="/xizmatlar">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/50">
              Barcha Xizmatlar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
