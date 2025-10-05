import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, Layers, Tag, Sparkles } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';

export const metadata = {
  title: 'Portfolio - Innoweb.uz',
  description:
    "Bizning yakunlangan loyihalar: web saytlar, Telegram botlar, AI chatbotlar va avtomatlashtirish yechimlari.",
};

async function getPortfolioProjects(category?: string) {
  return prisma.portfolio.findMany({
    where: category ? { category } : undefined,
    orderBy: [
      { featured: 'desc' },
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });
}

async function getCategories() {
  const projects = await prisma.portfolio.findMany({
    select: { category: true },
  });
  const categories = Array.from(new Set(projects.map((p) => p.category)));
  return categories;
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams?.category;
  const [projects, categories] = await Promise.all([
    getPortfolioProjects(category),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-20 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-full">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Biz yaratgan yechimlar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Har bir loyiha biznes ehtiyojiga moslashtirilgan va maksimal samaradorlikka yo'naltirilgan.
          </p>
        </div>

        {/* Filters */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Link href="/portfolio" prefetch={false}>
              <Button variant={category ? 'outline' : 'default'} size="sm">
                Barchasi
              </Button>
            </Link>
            {categories.map((cat) => (
              <Link key={cat} href={`/portfolio?category=${encodeURIComponent(cat)}`} prefetch={false}>
                <Button
                  variant={category === cat ? 'default' : 'outline'}
                  size="sm"
                >
                  {cat}
                </Button>
              </Link>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={cn(
                  'overflow-hidden border-2 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl bg-white dark:bg-gray-900',
                  project.featured && 'border-blue-500/60 shadow-2xl'
                )}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-blue-500 dark:text-blue-300" />
                  {project.featured && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {project.category}
                    </p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.client || 'Anonim mijoz'}
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {project.completedAt
                        ? formatDate(project.completedAt)
                        : 'Davom etmoqda'}
                    </span>
                    <span>{project.technologies.join(', ')}</span>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Link href={`/portfolio/${project.slug}`} className="flex-1" prefetch={false}>
                      <Button className="w-full" variant="secondary">
                        Batafsil
                      </Button>
                    </Link>
                    {project.url && (
                      <Link href={project.url} className="flex-1" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full gap-2">
                          <ExternalLink className="w-4 h-4" />
                          Sayt
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-10 text-center text-gray-500 dark:text-gray-400">
            Hozircha portfolioga mos loyihalar topilmadi.
          </Card>
        )}
      </div>
    </div>
  );
}
