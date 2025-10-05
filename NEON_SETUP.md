# 🐘 Neon PostgreSQL Database Setup

## Qadamlar:

### 1. Neon.tech ga kirish

1. Browserda oching: **https://neon.tech**
2. **Sign Up** tugmasini bosing
3. GitHub yoki Google akkaunt bilan kirish

### 2. Project Yaratish

1. Dashboard ochilgandan keyin **"Create a project"** ni bosing
2. Quyidagi ma'lumotlarni kiriting:
   - **Project Name**: `innoweb-uz`
   - **Region**: `US East (Ohio)` yoki `EU (Frankfurt)` (Yaqinroqini tanlang)
   - **PostgreSQL Version**: Default (16)

3. **Create Project** tugmasini bosing

### 3. Connection String Olish

Project yaratilgandan keyin:

1. Dashboard da **"Connection Details"** bo'limini oching
2. **Connection string** ni copy qiling
3. Ko'rinishi:
   ```
   postgresql://[user]:[password]@[host]/[database]?sslmode=require
   ```

### 4. .env Faylini Yangilash

`.env` faylini oching va `DATABASE_URL` ni yangilang:

```bash
DATABASE_URL="postgresql://neondb_owner:xxxxx@ep-xxxxx.us-east-2.aws.neon.tech/innoweb?sslmode=require"
```

**IMPORTANT:** 
- Neon dan olgan connection string ni **to'liq copy qiling**
- `?sslmode=require` qismi muhim!

### 5. Prisma Generate va Push

Terminal da:

```bash
# Prisma Client yaratish
npm run db:generate

# Database schema ni push qilish
npm run db:push
```

### 6. Test Ma'lumotlar Qo'shish

```bash
# Seed script ishga tushirish
npm run db:seed
```

### 7. Prisma Studio Ochish

```bash
# Database GUI
npm run db:studio
```

Browser: `http://localhost:5555`

### 8. Test API Tekshirish

Browser: `http://localhost:3000/api/test`

Natija:
```json
{
  "success": true,
  "message": "Database connection successful! 🎉",
  "stats": {
    "services": 4,
    "posts": 1,
    "portfolio": 1
  }
}
```

---

## ✅ Tayyor!

Database to'liq sozlandi va test data bilan to'ldirildi! 🎉
