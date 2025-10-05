import { sendTelegramMessage, TelegramUpdate } from '@/lib/telegram';

const ADMIN_CHAT_ID = process.env.TELEGRAM_ADMIN_CHAT_ID;

function isCommand(text?: string) {
  return !!text && text.startsWith('/');
}

async function handleCommand(chatId: number, command: string) {
  switch (command) {
    case '/start':
      await sendTelegramMessage({
        chatId: chatId.toString(),
        text: `Assalomu alaykum!\n\nMen Innoweb.uz telegram botiman. Siz bu yerdan leadlar va yangiliklarni olish uchun foydalanishingiz mumkin.`,
      });
      break;
    case '/help':
      await sendTelegramMessage({
        chatId: chatId.toString(),
        text: `Mumkin bo'lgan kommandalar:\n/start - Botni yoqish\n/help - Yordam\n/status - Leadlar haqida qisqa ma'lumot`,
      });
      break;
    case '/status':
      if (!ADMIN_CHAT_ID || ADMIN_CHAT_ID !== chatId.toString()) {
        await sendTelegramMessage({
          chatId: chatId.toString(),
          text: 'Status komandasi faqat admin uchun mavjud.',
        });
        return;
      }
      await sendTelegramMessage({
        chatId: chatId.toString(),
        text: 'Lead statusi: kechagi kun 4 ta yangi lead.',
      });
      break;
    default:
      await sendTelegramMessage({
        chatId: chatId.toString(),
        text: 'Komanda tushunarsiz. /help ni yuboring.',
      });
  }
}

export async function handleTelegramUpdate(update: TelegramUpdate) {
  const message = update.message;
  if (message?.text) {
    const text = message.text.trim();
    if (isCommand(text)) {
      await handleCommand(message.chat.id, text.split(' ')[0]);
      return;
    }

    await sendTelegramMessage({
      chatId: message.chat.id.toString(),
      text: 'Rahmat! Xabaringiz qabul qilindi. Adminlar ko\'rib chiqishadi.',
    });
  }

  if (update.callback_query) {
    const chatId = update.callback_query.message?.chat.id;
    if (chatId) {
      await sendTelegramMessage({
        chatId: chatId.toString(),
        text: 'Callback qabul qilindi.',
      });
    }
  }
}
