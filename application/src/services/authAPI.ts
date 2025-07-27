import { Language } from '@/locales';
import http from './http';
import { SignupUser } from '@/Type/SignupUser';

export const verifyIdentity = async (phoneNumber: string, otp: string, lang: Language) => {
  return await http.post('/auth/verify', { phoneNumber, otp, lang });
}

export async function getUserFromSetup(): Promise<SignupUser> {
  const response = await http.post('/setup');
  return response.data;
}