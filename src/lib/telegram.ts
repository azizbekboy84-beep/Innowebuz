import axios from 'axios';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;
const TELEGRAM_CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID;

interface LeadNotification {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  service: string;
  message?: string;
}

export async function sendTelegramMessage({
  chatId,
  text,
  parseMode = 'HTML',
}: {
  chatId: string;
  text: string;
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
}) {
  if (!TELEGRAM_BOT_TOKEN) {
    console.warn('Telegram bot token is not configured');
    return { success: false, error: 'Telegram not configured' };
  }

  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      },
      { timeout: 5000 }
    );

    return {
      success: true,
      messageId: response.data.result.message_id,
    };
  } catch (error: any) {
    console.error('Telegram send message error:', error?.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data?.description || error.message,
    };
  }
}

export async function sendLeadNotification(lead: LeadNotification) {
  if (!TELEGRAM_ADMIN_CHAT_ID) {
    console.warn('TELEGRAM_ADMIN_CHAT_ID is not configured');
    return { success: false, error: 'Telegram admin chat not configured' };
  }

  const text = `
🎯 <b>Yangi Buyurtma!</b>

👤 <b>Ism:</b> ${lead.name}
📞 <b>Telefon:</b> ${lead.phone}
${lead.email ? `📧 <b>Email:</b> ${lead.email}\n` : ''}${lead.company ? `🏢 <b>Kompaniya:</b> ${lead.company}\n` : ''}💼 <b>Xizmat:</b> ${lead.service}
${lead.message ? `\n💬 <b>Xabar:</b>\n${lead.message}\n` : ''}
⏰ <b>Vaqt:</b> ${new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })}

#yangi_lead
  `.trim();

  return sendTelegramMessage({ chatId: TELEGRAM_ADMIN_CHAT_ID, text });
}

export async function notifyChannel(text: string) {
  if (!TELEGRAM_CHANNEL_ID) {
    console.warn('TELEGRAM_CHANNEL_ID is not configured');
    return { success: false, error: 'Telegram channel not configured' };
  }

  return sendTelegramMessage({ chatId: TELEGRAM_CHANNEL_ID, text });
}

export async function setWebhook(url: string) {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram bot token missing');
  }

  return axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`, {
    params: { url },
  });
}

export async function deleteWebhook() {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error('Telegram bot token missing');
  }

  return axios.get(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/deleteWebhook`);
}

export type TelegramUpdate = {
  message?: {
    message_id: number;
    chat: { id: number; type: string; username?: string };
    text?: string;
    from?: { id: number; username?: string; first_name?: string };
  };
  callback_query?: {
    id: string;
    data?: string;
    message?: {
      chat: { id: number };
    };
  };
};
