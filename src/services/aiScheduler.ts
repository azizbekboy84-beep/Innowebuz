import { prisma } from '@/lib/prisma';
import { generateBlogPost } from '@/services/aiBlogGenerator';

/**
 * Placeholder scheduler function.
 * In production, integrate with cron (e.g. Upstash/Quartz) to run hourly between 07:00-19:00 (Asia/Tashkent).
 */
export async function runHourlyAIGeneration() {
  const now = new Date();
  const hour = now.getUTCHours() + now.getTimezoneOffset() / -60 + 5; // Asia/Tashkent offset
  if (hour < 7 || hour >= 19) {
    console.log('Outside scheduled window, skipping AI generation');
    return;
  }

  const topic = await pickTopic();
  if (!topic) {
    console.log('No topic available for AI generation');
    return;
  }

  const post = await generateBlogPost({
    topic,
    category: 'AI Generated',
    language: 'uz',
    tone: 'professional',
    aiGenerated: true,
  });

  await prisma.post.create({
    data: {
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt,
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      tags: post.tags,
      category: 'AI Generated',
      status: 'published',
      language: 'uz',
      aiGenerated: true,
      publishedAt: new Date(),
    },
  });

  console.log(`Generated AI post for topic: ${topic}`);
}

async function pickTopic(): Promise<string | null> {
  const topics = [
    'AI chatbotlar bilan mijozlarga xizmat ko\'rsatishni yaxshilash',
    'Telegram botlar orqali marketing avtomatlashtirish',
    'O\'zbekistonda biznes uchun web sayt trendlar',
  ];
  return topics[Math.floor(Math.random() * topics.length)] || null;
}
