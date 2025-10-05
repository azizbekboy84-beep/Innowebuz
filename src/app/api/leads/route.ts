import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { notifyChannel, sendLeadNotification } from '@/lib/telegram';
import { contactFormSchema } from '@/lib/validations';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate input
    const validatedData = contactFormSchema.parse(body);

    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        company: validatedData.company || null,
        service: validatedData.service,
        message: validatedData.message || null,
        source: 'website',
        status: 'new',
        priority: 'medium',
      },
    });

    // Send Telegram notification
    const telegramResult = await sendLeadNotification({
      name: validatedData.name,
      phone: validatedData.phone,
      email: validatedData.email,
      company: validatedData.company,
      service: validatedData.service,
      message: validatedData.message,
    });

    if (!telegramResult.success) {
      console.error('Telegram notification failed, retrying once...');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await sendLeadNotification({
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email,
        company: validatedData.company,
        service: validatedData.service,
        message: validatedData.message,
      });
    }

    // Update lead with Telegram status
    if (telegramResult.success && process.env.TELEGRAM_ADMIN_CHAT_ID) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: { 
          telegramSent: true,
          telegramChatId: process.env.TELEGRAM_ADMIN_CHAT_ID,
        },
      });
    }

    notifyChannel(
      `✅ Yangi lead: ${validatedData.name} (${validatedData.service})\nTelefon: ${validatedData.phone}`
    ).catch((error) => {
      console.warn('Failed to notify channel:', error);
    });

    // Track analytics
    await prisma.analytics.create({
      data: {
        page: '/aloqa',
        event: 'lead_created',
        metadata: {
          service: validatedData.service,
          source: 'contact_form',
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Arizangiz qabul qilindi! Tez orada siz bilan bog\'lanamiz.',
      leadId: lead.id,
    });
  } catch (error: any) {
    console.error('Lead creation error:', error);

    if (error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Forma ma\'lumotlarida xatolik',
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.' 
      },
      { status: 500 }
    );
  }
}

// GET endpoint for admin (optional)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};
    if (status) where.status = status;

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    const total = await prisma.lead.count({ where });

    return NextResponse.json({
      success: true,
      leads,
      total,
    });
  } catch (error: any) {
    console.error('Leads fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
