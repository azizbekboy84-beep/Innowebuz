# Innoweb.uz - Professional Automation Website

## 📋 Loyiha Haqida

Professional automation website - Web saytlar, Telegram botlar, AI chatbotlar va biznes avtomatlashtirishni taqdim etuvchi kompaniya.

### 🎯 Asosiy Xususiyatlar:
- ✅ Homepage + Services + Portfolio + Blog
- ✅ AI Blog Generator (GPT-4) - har soat 1 ta post (7:00-19:00)
- ✅ AI Image Generator (DALL-E 3)
- ✅ Telegram Bot + Channel integratsiya
- ✅ AI Chatbot (kompaniya bo'yicha o'rgatilgan)
- ✅ Lead Management (Telegram notifikatsiya)
- ✅ Admin Dashboard
- ✅ Ikki tillilik (O'zbek + Rus)
- ✅ SEO optimizatsiya

### 📞 Kontakt:
- Telefon: +998 99 644 84 44
- Email: akramjon10000@gmail.com
- Manzil: Toshkent shahri, Nurafshon yo'li 12
- Telegram: @Innoweb_uz

### 🎨 Tech Stack:
- Frontend: Next.js 14 (App Router) + Tailwind CSS + ShadCN UI
- Backend: Neon PostgreSQL + Prisma ORM
- Auth: NextAuth
- AI: OpenAI (GPT-4 + DALL-E 3)
- Deployment: Vercel / Ubuntu Server

## 🚀 Ishga Tushirish

```bash
# Dependencies o'rnatish
npm install

# .env fayl yaratish
cp .env.example .env

# Development server
npm run dev
```

### 🌐 Deployment (Render.com)

1. **Repositoryni ulash**: GitHub dagi ushbu projectni Render accountingizga import qiling.
2. **`render.yaml` fayli**: Render avtomatik `render.yaml` ni o'qib, `innoweb-uz` nomli web servisini yaratadi.
3. **Environment Variables**: `DATABASE_URL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ADMIN_CHAT_ID`, `TELEGRAM_CHANNEL_ID`, `OPENAI_API_KEY`, `NEXTAUTH_SECRET` qiymatlarini Render dashboardida qo'shing. `NEXTAUTH_URL` avtomatik `https://innoweb-uz.onrender.com` qilib qo'yilgan bo'lishi mumkin; kerak bo'lsa o'zgartiring.
4. **Build & Start**: `npm install && npm run build` build command, `npm run start` start command sifatida ishlaydi. Render Node 20 muhitini qo'llab-quvvatlaydi (`package.json` dagi `engines`).
5. **Cron/Scheduler**: AI post generatorni ishga tushirish uchun Render Cron Jobs xizmatidan foydalanib, `/api/ai/generate` yoki server funksiyasini chaqiring.

## 📁 Folder Struktura

```
innoweb-uz/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── admin/
│   │   ├── uz/
│   │   └── ru/
│   ├── components/
│   │   ├── ui/
│   │   ├── homepage/
│   │   ├── services/
│   │   ├── blog/
│   │   ├── admin/
│   │   ├── chatbot/
│   │   ├── contact/
│   │   └── layout/
│   ├── lib/
│   ├── services/
│   ├── dictionaries/
│   └── types/
├── scripts/
└── public/
```

## 📝 License

Private - Innoweb.uz © 2025
