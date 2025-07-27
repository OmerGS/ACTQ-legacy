import http from "./http";
import { Language } from "@/locales";

export const requestOTP = async (phoneNumber: string, lang: Language) => {
  return await http.post('/validation/otp/request', { phoneNumber, lang });
};

export const validateOTP = async (phoneNumber: string, otp: string, lang: Language) => {
  return await http.post('/validation/otp/validate', { phoneNumber, otp, lang });
}