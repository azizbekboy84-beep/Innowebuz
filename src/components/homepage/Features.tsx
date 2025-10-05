import { Card } from '@/components/ui/card';
import { Zap, Shield, Clock, Headphones, TrendingUp, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Tez Ishlab Chiqish',
    description: 'Loyihangizni eng qisqa muddatda tayyor qilamiz',
  },
  {
    icon: Shield,
    title: 'Xavfsizlik',
    description: 'Zamonaviy xavfsizlik standartlari',
  },
  {
    icon: Clock,
    title: '24/7 Qo\'llab-quvvatlash',
    description: 'Har doim sizning xizmatingizdamiz',
  },
  {
    icon: Headphones,
    title: 'Professional Jamoa',
    description: '5+ yillik tajribaga ega mutaxassislar',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Yechimlar',
    description: 'Biznesingiz o\'sishi bilan o\'sadigan tizimlar',
  },
  {
    icon: Award,
    title: 'Kafolat',
    description: 'Sifat va natijaga kafolat beramiz',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Nega </span>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Innoweb.uz?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Biz nafaqat kod yozamiz, balki biznesingiz uchun yechim yaratamiz
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
