import { openai } from '@/lib/openai';
import { prisma } from '@/lib/prisma';

interface GenerateBlogPostParams {
  topic: string;
  language?: 'uz' | 'ru';
  category?: string;
  tone?: 'professional' | 'friendly' | 'technical';
  tags?: string[];
  aiGenerated?: boolean;
  scheduledFor?: Date | null;
}

interface GenerateBlogPostResult {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
}

export async function generateBlogPost({
  topic,
  language = 'uz',
  category = 'General',
  tone = 'professional',
  tags = [],
  aiGenerated = true,
  scheduledFor = null,
}: GenerateBlogPostParams): Promise<GenerateBlogPostResult> {
  if (!openai) {
    throw new Error('OpenAI client is not configured.');
  }

  const prompt = `Siz professional AI kontent yozuvchisiz. Siz ${language === 'uz' ? 'o\'zbek' : 'rus'} tilida yozasiz.

Mavzu: ${topic}
Kategoriya: ${category}
Ohang: ${tone}

Iltimos quyidagilarni yarating:
1. Sarlavha (title)
2. Qisqa excerpt (1-2 gap)
3. To\'liq blog kontenti (markdown formatida, sarlavhalar bilan)
4. Meta Title (60 belgigacha)
5. Meta Description (160 belgigacha)
6. 5 tag (kalit so'zlar)

Har bir bo'limni alohida "---" bilan ajrating.`;

  const response = await openai.responses.create({
    model: 'gpt-4.1-mini',
    input: prompt,
  });

  const resultText = response.output_text;

  const sections = resultText.split('---').map((section) => section.trim());

  const [titleSection, excerptSection, contentSection, metaTitleSection, metaDescriptionSection, tagsSection] = sections;

  const title = titleSection?.replace(/^Title:?\s*/i, '').trim() || topic;
  const excerpt = excerptSection?.replace(/^Excerpt:?\s*/i, '').trim() || '';
  const content = contentSection?.replace(/^Content:?\s*/i, '').trim() || '';
  const metaTitle = metaTitleSection?.replace(/^Meta Title:?\s*/i, '').trim() || title;
  const metaDescription = metaDescriptionSection?.replace(/^Meta Description:?\s*/i, '').trim() || excerpt;
  const generatedTags = tagsSection
    ?.replace(/^Tags:?\s*/i, '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean) || [];

  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

  const existingCount = await prisma.post.count({
    where: {
      slug: {
        startsWith: slugBase,
      },
    },
  });

  const slug = existingCount > 0 ? `${slugBase}-${existingCount + 1}` : slugBase;

  return {
    title,
    slug,
    content,
    excerpt,
    metaTitle,
    metaDescription,
    tags: tags.length ? tags : generatedTags,
  };
}
