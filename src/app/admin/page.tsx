import { prisma } from '@/lib/prisma';
import { Card } from '@/components/ui/card';
import { Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';

async function getDashboardStats() {
  const [postsCount, leadsCount, publishedPosts, draftPosts] = await Promise.all([
    prisma.post.count(),
    prisma.lead.count(),
    prisma.post.count({ where: { status: 'published' } }),
    prisma.post.count({ where: { status: 'draft' } }),
  ]);

  const recentLeads = await prisma.lead.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });

  return {
    postsCount,
    leadsCount,
    publishedPosts,
    draftPosts,
    recentLeads,
    recentPosts,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-20 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Loyiha statistikasi va boshqaruv
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.postsCount}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Jami Postlar
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stats.publishedPosts} published, {stats.draftPosts} draft
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.leadsCount}
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Jami Leadlar
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contact form so'rovlari
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                0
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              Chat Xabarlar
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI Chatbot
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                +24%
              </span>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
              O'sish
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              So'nggi 30 kun
            </p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Leads */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              So'nggi Leadlar
            </h2>
            <div className="space-y-4">
              {stats.recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-start justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {lead.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {lead.phone} • {lead.service}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    lead.status === 'new' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    lead.status === 'contacted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Posts */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              So'nggi Postlar
            </h2>
            <div className="space-y-4">
              {stats.recentPosts.map((post) => (
                <div key={post.id} className="flex items-start justify-between pb-4 border-b last:border-0">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {post.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.category} • {post.views} views
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'published' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
