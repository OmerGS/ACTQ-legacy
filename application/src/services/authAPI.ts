import { Language } from '@/locales';
import http from './http';

export const verifyIdentity = async (phoneNumber: string, otp: string, lang: Language) => {
  return await http.post('/auth/verify', { phoneNumber, otp, lang });
}