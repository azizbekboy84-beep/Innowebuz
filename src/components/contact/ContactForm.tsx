'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const selectedService = watch('service');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
        
        // Reset after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="p-8 border-2 border-green-200 bg-green-50 dark:bg-green-900/20">
        <div className="text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
            Muvaffaqiyatli!
          </h3>
          <p className="text-green-700 dark:text-green-300 mb-6">
            Arizangiz qabul qilindi! Tez orada siz bilan bog'lanamiz.
          </p>
          <Button 
            onClick={() => setSubmitStatus('idle')}
            variant="outline"
          >
            Yana Ariza Yuborish
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name & Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Ismingiz *
            </label>
            <Input {...register('name')} placeholder="Ismingiz" />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Telefon raqam *
            </label>
            <Input {...register('phone')} placeholder="+998 90 123 45 67" />
            {errors.phone && (
              <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Email & Company */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <Input {...register('email')} type="email" placeholder="email@example.com" />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Kompaniya
            </label>
            <Input {...register('company')} placeholder="Kompaniya nomi" />
          </div>
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Qaysi xizmat kerak? *
          </label>
          <Select
            value={selectedService}
            onValueChange={(value) => setValue('service', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Xizmatni tanlang" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-sayt">Web Sayt</SelectItem>
              <SelectItem value="telegram-bot">Telegram Bot</SelectItem>
              <SelectItem value="ai-chatbot">AI Chatbot</SelectItem>
              <SelectItem value="crm-tizimi">CRM Tizimi</SelectItem>
              <SelectItem value="avtomatlashtirish">Biznes Avtomatlashtirish</SelectItem>
              <SelectItem value="boshqa">Boshqa</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && (
            <p className="text-sm text-red-600 mt-1">{errors.service.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Xabar
          </label>
          <Textarea {...register('message')} placeholder="Loyihangiz haqida qisqacha..." rows={5} />
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-800 dark:text-red-400">
                  Xatolik yuz berdi
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Iltimos qaytadan urinib ko'ring yoki telefon orqali bog'laning
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" size="lg" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Yuborilmoqda...
            </>
          ) : (
            'Yuborish'
          )}
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-center text-gray-600 dark:text-gray-400">
          Yuborish orqali siz{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Maxfiylik siyosati
          </a>
          ga rozilik bildirasiz
        </p>
      </form>
    </Card>
  );
}
