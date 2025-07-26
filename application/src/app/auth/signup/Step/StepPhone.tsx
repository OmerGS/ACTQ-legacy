import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { askCode } from "../signup-logic";
import { Step } from "../signup";
import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

function isValidFrenchNumber(phone: string) {
  const frRegex = /^(?:0)(6|7)\d{8}$/;
  return frRegex.test(phone);
}

function isValidTurkishNumber(phone: string) {
  const trRegex = /^0?5\d{9}$/;
  return trRegex.test(phone);
}

function formatPhoneForSending(phone: string, country: "FR" | "TR") {
  if (country === "FR") {
    if (phone.startsWith("0")) return "+33" + phone.slice(1);
    if (phone.startsWith("+33")) return phone;
  } else {
    if (phone.startsWith("0")) return "+90" + phone.slice(1);
    if (phone.startsWith("+90")) return phone;
    return "+90" + phone;
  }
  return phone;
}

export function StepPhone({
  phone,
  setPhone,
  setStep,
  loading,
  setLoading,
}: {
  phone: string;
  setPhone: (p: string) => void;
  setStep: (s: Step) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
}) {
  const [country, setCountry] = useState<"FR" | "TR">("FR");
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  const handleSend = async () => {
    if (country === "FR" && !isValidFrenchNumber(phone)) {
      toast.error(t("signup.step-signup.1.error-fr"));
      return;
    }
    if (country === "TR" && !isValidTurkishNumber(phone)) {
      toast.error(t("signup.step-signup.1.error-tr"));
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = formatPhoneForSending(phone, country);
      await askCode(formattedPhone);
      toast.success(t("signup.step-signup.1.success"));
      setStep(2);
    } catch {
      toast.error(t("signup.step-signup.1.send-error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Label className="mb-2 block font-medium text-base">
        {t("signup.step-signup.1.country-label")}
      </Label>
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="country"
            value="FR"
            checked={country === "FR"}
            onChange={() => setCountry("FR")}
            disabled={loading}
          />
          {t("signup.step-signup.1.phone-fr")}
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="country"
            value="TR"
            checked={country === "TR"}
            onChange={() => setCountry("TR")}
            disabled={loading}
          />
          {t("signup.step-signup.1.phone-tr")}
        </label>
      </div>

      <Label htmlFor="phone" className="mb-2 text-base font-medium">
        {t("signup.step-signup.1.label")}
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder={
          country === "FR"
            ? t("signup.step-signup.1.placeholder-fr")
            : t("signup.step-signup.1.placeholder-tr")
        }
        className="mb-2 text-lg py-3"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
        inputMode="tel"
      />
      <Button
        className="w-full mt-2 py-3 text-base"
        onClick={handleSend}
        disabled={loading}
      >
        {loading
          ? t("signup.step-signup.1.sending")
          : t("signup.step-signup.1.button")}
      </Button>
    </>
  );
}