import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Blog - Innoweb.uz',
  description: 'Web development, AI, automation va texnologiya bo\'yicha maqolalar',
};

async function getBlogPosts() {
  const posts = await prisma.post.findMany({
    where: {
      status: 'published',
    },
    orderBy: {
      publishedAt: 'desc',
    },
    take: 20,
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-20 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Web development, AI, automation va texnologiya bo'yicha foydali maqolalar
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                {/* Image */}
                {post.imageUrl && (
                  <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
                      {post.aiGenerated ? '🤖' : '📝'}
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {/* Category & Tags */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                    {post.aiGenerated && (
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded-full">
                        AI Generated
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.publishedAt ? formatDate(post.publishedAt) : 'Draft'}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      5 min
                    </div>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read More */}
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="w-full group/btn">
                      O'qish
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Hozircha maqolalar yo'q
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
