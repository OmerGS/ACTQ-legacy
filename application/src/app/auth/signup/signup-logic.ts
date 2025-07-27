import { Language } from "@/locales";
import { verifyIdentity } from "@/services/authAPI";
import { requestOTP } from "@/services/otpAPI";

export async function askCode(phone: string, lang: Language): Promise<void> {
  const response = await requestOTP(phone, lang);

  if (response.status !== 200) {
    throw new Error(response.data.error || "Unknown error");
  }
}

type VerifyResult = {
  success: true;
  firstName: string;
  lastName: string;
};

type VerifyError = {
  success: false;
  error: string;
};

export async function checkCode(
  phone: string,
  code: string,
  lang: Language
): Promise<VerifyResult | VerifyError> {
  try {
    const response = await verifyIdentity(phone, code, lang);

    if (response.status === 200) {
      return {
        success: true,
        firstName: response.data.member.firstname,
        lastName: response.data.member.lastname,
      };
    } else {
      return {
        success: false,
        error: response.data?.error || "Code invalide.",
      };
    }
  } catch (error: any) {
    console.error("Erreur /auth/verify :", error);
    return {
      success: false,
      error: error.response?.data?.error || "Erreur serveur.",
    };
  }
}