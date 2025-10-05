import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Ism kamida 2 ta belgidan iborat bo\'lishi kerak'),
  phone: z.string().regex(/^(\+998|998)?[\s\-]?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/, 'Noto\'g\'ri telefon raqam formati'),
  email: z.string().email('Noto\'g\'ri email format').optional().or(z.literal('')),
  company: z.string().optional(),
  service: z.string().min(1, 'Xizmatni tanlang'),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
