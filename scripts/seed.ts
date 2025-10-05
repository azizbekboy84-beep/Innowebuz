// scripts/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create Services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        name: 'Web Sayt Yaratish',
        nameRu: 'Создание Веб-Сайтов',
        slug: 'web-development',
        description: 'Professional web saytlar yaratish xizmati. Zamonaviy texnologiyalar, responsive dizayn, SEO optimizatsiya va admin panel bilan.',
        descriptionRu: 'Профессиональная разработка веб-сайтов. Современные технологии, адаптивный дизайн, SEO оптимизация и админ панель.',
        icon: 'globe',
        features: ['Responsive dizayn', 'SEO optimizatsiya', 'Admin panel', 'Tez yuklash', 'Xavfsizlik'],
        featuresRu: ['Адаптивный дизайн', 'SEO оптимизация', 'Админ панель', 'Быстрая загрузка', 'Безопасность'],
        basePrice: 3000000,
        priceType: 'from',
        order: 1,
        active: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Telegram Bot',
        nameRu: 'Telegram Бот',
        slug: 'telegram-bot',
        description: 'Biznes uchun professional Telegram bot yaratish. Auto-javob, mahsulot katalog, to\'lov qabul va CRM integratsiya.',
        descriptionRu: 'Создание профессионального Telegram бота для бизнеса. Авто-ответ, каталог продуктов, прием платежей и CRM интеграция.',
        icon: 'message-square',
        features: ['Auto-javob', 'To\'lov qabul qilish', 'CRM integratsiya', 'Statistika', '24/7 ishlash'],
        featuresRu: ['Авто-ответ', 'Прием платежей', 'CRM интеграция', 'Статистика', '24/7 работа'],
        basePrice: 2000000,
        priceType: 'from',
        order: 2,
        active: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'AI Chatbot',
        nameRu: 'AI Чат-бот',
        slug: 'ai-chatbot',
        description: '24/7 intelligent mijozlar xizmati. ChatGPT asosida ishlaydigan, ko\'p tillilik va o\'rganuvchi chatbot.',
        descriptionRu: '24/7 интеллектуальное обслуживание клиентов. Чат-бот на основе ChatGPT, многоязычность и самообучение.',
        icon: 'bot',
        features: ['ChatGPT integration', 'Ko\'p tillilik', 'Self-learning', 'Kontekst eslab qolish', 'FAQ database'],
        featuresRu: ['Интеграция ChatGPT', 'Многоязычность', 'Самообучение', 'Запоминание контекста', 'База знаний FAQ'],
        basePrice: 4000000,
        priceType: 'from',
        order: 3,
        active: true,
      },
    }),
    prisma.service.create({
      data: {
        name: 'Biznes Avtomatlashtirish',
        nameRu: 'Автоматизация Бизнеса',
        slug: 'business-automation',
        description: 'CRM, ERP va boshqa biznes jarayonlarini avtomatlashtirish. Hisobotlar, integratsiyalar va analitika.',
        descriptionRu: 'Автоматизация бизнес-процессов CRM, ERP и других систем. Отчеты, интеграции и аналитика.',
        icon: 'workflow',
        features: ['CRM tizimi', 'Avtomatik hisobotlar', 'API integratsiyalar', 'Analitika dashboard', 'Mobil ilova'],
        featuresRu: ['CRM система', 'Автоматические отчеты', 'API интеграции', 'Панель аналитики', 'Мобильное приложение'],
        basePrice: 12000000,
        priceType: 'from',
        order: 4,
        active: true,
      },
    }),
  ]);

  console.log(`✓ Created ${services.length} services`);

  // Create Sample Portfolio
  const portfolio = await prisma.portfolio.create({
    data: {
      title: 'E-commerce Platform',
      titleRu: 'E-commerce Платформа',
      description: 'To\'liq funksional onlayn do\'kon tizimi. To\'lov qabul qilish, buyurtmalarni boshqarish, mahsulot katalogi va admin panel.',
      descriptionRu: 'Полнофункциональная система интернет-магазина. Прием платежей, управление заказами, каталог продуктов и админ панель.',
      category: 'E-commerce',
      client: 'Online Store',
      image: '/images/portfolio/ecommerce.jpg',
      images: [
        '/images/portfolio/ecommerce-1.jpg',
        '/images/portfolio/ecommerce-2.jpg',
      ],
      url: 'https://example.com',
      tags: ['E-commerce', 'Web', 'React', 'Payment'],
      technologies: ['Next.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
      featured: true,
      order: 1,
      completedAt: new Date(),
    },
  });

  console.log(`✓ Created portfolio: ${portfolio.title}`);

  // Create Sample Blog Post
  const post = await prisma.post.create({
    data: {
      title: 'Web Sayt Yaratishda SEO ning Ahamiyati',
      titleRu: 'Важность SEO при Создании Веб-Сайта',
      slug: 'web-sayt-seo-ahamiyati',
      content: `# SEO nima?

SEO (Search Engine Optimization) - bu saytingizni qidiruv tizimlarida yuqori o'rinlarda ko'rsatish uchun optimallashtirishdir.

## Nega SEO muhim?

1. **Organik trafik** - Google orqali bepul mijozlar
2. **Brendni kuchaytirish** - Yuqori pozitsiya ishonch hosil qiladi
3. **Uzoq muddatli natija** - Bir marta invest, uzoq muddat foyda

## Qanday qilib SEO ni yaxshilash mumkin?

- Tez yuklanadigan sayt
- Mobil responsive
- Sifatli content
- Backlinks

Innoweb.uz sizga SEO bo'yicha professional yordam beradi!`,
      contentRu: `# Что такое SEO?

SEO (Search Engine Optimization) - это оптимизация вашего сайта для высоких позиций в поисковых системах.

## Почему SEO важно?

1. **Органический трафик** - Бесплатные клиенты через Google
2. **Укрепление бренда** - Высокая позиция создает доверие
3. **Долгосрочный результат** - Инвестиция один раз, выгода долгое время

## Как улучшить SEO?

- Быстрая загрузка сайта
- Мобильная адаптивность
- Качественный контент
- Обратные ссылки

Innoweb.uz окажет вам профессиональную помощь по SEO!`,
      excerpt: 'SEO saytingizni qidiruv tizimlarida yuqori o\'rinlarga olib chiqadi',
      excerptRu: 'SEO выведет ваш сайт на высокие позиции в поисковых системах',
      metaTitle: 'Web Sayt SEO Optimizatsiyasi - Innoweb.uz',
      metaTitleRu: 'SEO Оптимизация Веб-Сайта - Innoweb.uz',
      metaDescription: 'Professional SEO xizmatlari va maslahatlar. Saytingizni Google TOP 10 ga chiqaring.',
      metaDescriptionRu: 'Профессиональные SEO услуги и советы. Выведите ваш сайт в TOP 10 Google.',
      tags: ['SEO', 'Web Development', 'Marketing', 'Google'],
      category: 'Web Development',
      status: 'published',
      language: 'both',
      publishedAt: new Date(),
      aiGenerated: false,
    },
  });

  console.log(`✓ Created blog post: ${post.title}`);

  console.log('✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
