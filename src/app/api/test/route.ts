// src/app/api/test/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test database connection
    const servicesCount = await prisma.service.count();
    const postsCount = await prisma.post.count();
    const portfolioCount = await prisma.portfolio.count();

    return NextResponse.json({
      success: true,
      message: 'Database connection successful! 🎉',
      stats: {
        services: servicesCount,
        posts: postsCount,
        portfolio: portfolioCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        hint: 'Make sure DATABASE_URL is set in .env and database is accessible',
      },
      { status: 500 }
    );
  }
}
