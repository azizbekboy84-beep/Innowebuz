import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, CheckCircle2, Calendar, Tag, Layers } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await prisma.portfolio.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    return {
      title: 'Loyiha topilmadi',
    };
  }

  return {
    title: `${project.title} • Innoweb Portfolio`,
    description: project.description,
  };
}

async function getProject(slug: string) {
  return prisma.portfolio.findUnique({
    where: { slug },
  });
}

export default async function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-20 mx-auto">
        <Link href="/portfolio" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Portfolioga qaytish
          </Button>
        </Link>

        <Card className="p-8 md:p-10 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full">
                  <Layers className="w-3 h-3" />
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {project.client || 'Mijoz ma\'lum emas'}
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {project.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card className="p-4 bg-gray-50 dark:bg-gray-800 border-none">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4" />
                    Yakunlanish sanasi
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold mt-1">
                    {project.completedAt ? formatDate(project.completedAt) : 'Davom etmoqda'}
                  </p>
                </Card>
                <Card className="p-4 bg-gray-50 dark:bg-gray-800 border-none">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle2 className="w-4 h-4" />
                    Holat
                  </div>
                  <p className="text-gray-900 dark:text-white font-semibold mt-1">
                    {project.featured ? 'Featured loyiha' : "Standart loyiha"}
                  </p>
                </Card>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Texnologiyalar
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.url && (
                <Link href={project.url} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Loyihani ko\'rish
                  </Button>
                </Link>
              )}
            </div>

            {/* Right column */}
            <div className="space-y-6">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-pink-900/40 flex items-center justify-center text-5xl">
                {project.images.length ? '📷' : '🎨'}
              </div>

              {project.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {project.images.slice(0, 4).map((image, idx) => (
                    <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl">
                      {idx === 0 ? '🖼️' : '🧩'}
                    </div>
                  ))}
                </div>
              )}

              <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-none">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
                  Mijozga taqdim etilgan qiymat
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200/80">
                  Biz bu loyiha orqali mijozning biznes jarayonlarini avtomatlashtirdik, foydalanuvchi tajribasini yaxshiladik va konversiyani oshirdik.
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
