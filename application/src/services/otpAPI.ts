import http from "./http";
import { Language } from "@/locales";

export const requestOTP = async (phoneNumber: string, lang: Language) => {
  return await http.post('/validation/otp/request', { phoneNumber, lang });
};

export const validateOTP = async (phoneNumber: string, otp: string, lang: Language) => {
  return await http.post('/validation/otp/validate', { phoneNumber, otp, lang });
}

export const requestMailValidation = async (email: string, lang: Language) => {
  return await http.post('/validation/mail/request', { email, lang });
}

export const validateMailCode = async (email: string, otp: string, lang: Language) => {
  const response = await http.post('/validation/mail/validate', { email, otp, lang });
  return response;
}