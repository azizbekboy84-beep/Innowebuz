import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch blog posts
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.post.count({ where });

    return NextResponse.json({
      success: true,
      posts,
      total,
      limit,
      offset,
    });
  } catch (error: any) {
    console.error('Posts fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - Create new post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const post = await prisma.post.create({
      data: {
        title: body.title,
        titleRu: body.titleRu,
        slug: body.slug,
        content: body.content,
        contentRu: body.contentRu,
        excerpt: body.excerpt,
        excerptRu: body.excerptRu,
        imageUrl: body.imageUrl,
        category: body.category,
        tags: body.tags || [],
        status: body.status || 'draft',
        language: body.language || 'uz',
        metaTitle: body.metaTitle,
        metaDescription: body.metaDescription,
        aiGenerated: body.aiGenerated || false,
      },
    });

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error: any) {
    console.error('Post creation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
