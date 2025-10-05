import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

interface LeadNotification {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service: string;
  message?: string;
}

export async function sendLeadNotification(lead: LeadNotification) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_ADMIN_CHAT_ID) {
    console.warn('Telegram credentials not configured');
    return { success: false, error: 'Telegram not configured' };
  }

  try {
    const text = `
🎯 <b>Yangi Buyurtma!</b>

👤 <b>Ism:</b> ${lead.name}
📞 <b>Telefon:</b> ${lead.phone}
${lead.email ? `📧 <b>Email:</b> ${lead.email}\n` : ''}${lead.company ? `🏢 <b>Kompaniya:</b> ${lead.company}\n` : ''}💼 <b>Xizmat:</b> ${lead.service}
${lead.message ? `\n💬 <b>Xabar:</b>\n${lead.message}\n` : ''}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}

#yangi_lead
    `.trim();

    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: TELEGRAM_ADMIN_CHAT_ID,
        text,
        parse_mode: 'HTML',
      },
      {
        timeout: 5000,
      }
    );

    return { 
      success: true, 
      messageId: response.data.result.message_id 
    };
  } catch (error: any) {
    console.error('Telegram notification error:', error.message);
    return { 
      success: false, 
      error: error.response?.data?.description || error.message 
    };
  }
}
