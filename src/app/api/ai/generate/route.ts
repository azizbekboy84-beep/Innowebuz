import { NextRequest, NextResponse } from 'next/server';
import { generateBlogPost } from '@/services/aiBlogGenerator';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.topic) {
      return NextResponse.json(
        {
          success: false,
          error: 'Topic is required',
        },
        { status: 400 }
      );
    }

    const generated = await generateBlogPost({
      topic: body.topic,
      language: body.language,
      category: body.category,
      tone: body.tone,
      tags: body.tags,
      scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : null,
    });

    const post = await prisma.post.create({
      data: {
        title: generated.title,
        slug: generated.slug,
        content: generated.content,
        excerpt: generated.excerpt,
        metaTitle: generated.metaTitle,
        metaDescription: generated.metaDescription,
        tags: generated.tags,
        category: body.category || 'General',
        status: body.publishNow ? 'published' : 'draft',
        language: body.language || 'uz',
        aiGenerated: true,
        publishedAt: body.publishNow ? new Date() : null,
        scheduledFor: body.scheduledFor ? new Date(body.scheduledFor) : null,
      },
    });

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error: any) {
    console.error('AI post generation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to generate post',
      },
      { status: 500 }
    );
  }
}
