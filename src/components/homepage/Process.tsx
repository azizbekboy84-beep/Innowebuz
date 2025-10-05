import { Card } from '@/components/ui/card';
import { MessageSquare, FileText, Code, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Konsultatsiya',
    description: 'Loyihangiz haqida gaplashamiz va talablarni aniqlaymiz',
    number: '01',
  },
  {
    icon: FileText,
    title: 'Tahlil va Reja',
    description: 'Texnik hujjatlar va loyiha rejasini tayyorlaymiz',
    number: '02',
  },
  {
    icon: Code,
    title: 'Ishlab Chiqish',
    description: 'Professional kod yozish va dizayn yaratish',
    number: '03',
  },
  {
    icon: Rocket,
    title: 'Launch va Qo\'llab-quvvatlash',
    description: 'Loyihani ishga tushirish va texnik yordam',
    number: '04',
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Qanday Ishlaymiz?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Oddiy va tushunarli jarayon
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 -translate-x-3"></div>
                )}

                <Card className="p-6 border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-900 relative group">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
