import ContactForm from '@/components/contact/ContactForm';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export const metadata = {
  title: 'Aloqa - Innoweb.uz',
  description: 'Biz bilan bog\'laning. Bepul konsultatsiya va professional maslahat.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-20 mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bog'lanish
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Loyihangiz haqida gaplashaylik. Bepul konsultatsiya va professional maslahat.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Phone */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Telefon
                  </h3>
                  <a href="tel:+998996448444" className="text-blue-600 hover:underline">
                    +998 99 644 84 44
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Dushanba-Shanba, 09:00-18:00
                  </p>
                </div>
              </div>
            </Card>

            {/* Email */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Email
                  </h3>
                  <a href="mailto:akramjon10000@gmail.com" className="text-blue-600 hover:underline break-all">
                    akramjon10000@gmail.com
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    24 soat ichida javob beramiz
                  </p>
                </div>
              </div>
            </Card>

            {/* Telegram */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Telegram
                  </h3>
                  <a href="https://t.me/Innoweb_uz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    @Innoweb_uz
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Tezkor javob
                  </p>
                </div>
              </div>
            </Card>

            {/* Address */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Manzil
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Toshkent shahri,
                    <br />
                    Nurafshon yo'li 12
                  </p>
                </div>
              </div>
            </Card>

            {/* Working Hours */}
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Ish vaqti
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Dushanba-Shanba
                    <br />
                    09:00 - 18:00
                    <br />
                    Yakshanba: Dam olish
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        {/* Map (Optional) */}
        <div className="mt-16 max-w-7xl mx-auto">
          <Card className="overflow-hidden">
            <div className="h-96 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Google Maps placeholder (ixtiyoriy)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
