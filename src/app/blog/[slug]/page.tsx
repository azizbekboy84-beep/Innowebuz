import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) {
    return {
      title: 'Post topilmadi',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.tags.join(', '),
  };
}

async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || post.status !== 'published') {
    return null;
  }

  // Increment views
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  return post;
}

async function getRelatedPosts(category: string, currentId: string) {
  return await prisma.post.findMany({
    where: {
      category,
      status: 'published',
      id: { not: currentId },
    },
    take: 3,
    orderBy: { publishedAt: 'desc' },
  });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-20 mx-auto">
        {/* Back Button */}
        <Link href="/blog" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Blogga qaytish
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <article>
            <Card className="p-8 mb-8">
              {/* Category */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full">
                  {post.category}
                </span>
                {post.aiGenerated && (
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-full">
                    🤖 AI Generated
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  5 min o'qish
                </div>
                <div className="flex items-center gap-2">
                  👁️ {post.views} ko'rildi
                </div>
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content.split('\n').map((paragraph, i) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={i} className="text-3xl font-bold mt-8 mb-4">{paragraph.replace('# ', '')}</h1>;
                  }
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={i} className="text-2xl font-bold mt-6 mb-3">{paragraph.replace('## ', '')}</h2>;
                  }
                  if (paragraph.startsWith('### ')) {
                    return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                  }
                  if (paragraph.startsWith('- ')) {
                    return <li key={i} className="ml-4">{paragraph.replace('- ', '')}</li>;
                  }
                  if (paragraph.trim() === '') {
                    return <br key={i} />;
                  }
                  return <p key={i} className="mb-4 text-gray-700 dark:text-gray-300">{paragraph}</p>;
                })}
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Ulashish
                </Button>
              </div>
            </Card>
          </article>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                O'xshash Maqolalar
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="p-4 hover:shadow-lg transition-shadow">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <Button variant="ghost" size="sm" className="w-full">
                        O'qish
                        <ArrowRight className="ml-2 w-3 h-3" />
                      </Button>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
