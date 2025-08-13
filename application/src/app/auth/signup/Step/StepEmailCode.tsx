import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ShieldCheck, Loader, RotateCw } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { validateEmailCode, askEmailCode } from "../signup-logic";
import { motion, AnimatePresence } from "framer-motion";

interface StepEmailCodeProps {
  code: string;
  setCode: (c: string) => void;
  next: () => void;
  back: () => void;
  email: string;
}

export function StepEmailCode({
  code,
  setCode,
  next,
  back,
  email,
}: StepEmailCodeProps) {
  const { t, isReady, language } = useTranslation();
  const [isVerifying, setIsVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const [hasStarted, setHasStarted] = useState(false);
  if (!hasStarted) {
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setHasStarted(true);
  }

  if (!isReady) return null;

  const verifierCode = async () => {
    if (code.length !== 6) {
      toast.error(t("signup.signup-info.email-code-step.error-length"));
      return;
    }

    setIsVerifying(true);

    try {
      const result = await validateEmailCode(email, code, language);
      if (result) {
        toast.success(t("signup.signup-info.email-code-step.success"));
        next();
      } else {
        toast.error(t("signup.signup-info.email-code-step.error-invalid"));
      }
    } catch (err) {
      toast.error(t("signup.signup-info.email-code-step.error-server"));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCode(value);
    }
  };

  const sendAgain = () => {
    if (cooldown > 0) return;

    askEmailCode(email, language)
      .then(() => {
        toast.success(t("signup.signup-info.email-code-step.sent-again"));
        setCooldown(60);

        const interval = setInterval(() => {
          setCooldown(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      })
      .catch(() => {
        toast.error(t("signup.signup-info.email-code-step.error-server"));
      });
  };

  return (
    <>
      <p className="mb-4 text-sm text-center" dangerouslySetInnerHTML={{ __html: t("signup.signup-info.email-code-step.sent", { email }) }} />

      <Label htmlFor="code" className="mb-2 text-base font-medium">
        {t("signup.signup-info.email-code-step.label")}
      </Label>

      <div className="flex gap-2 mb-1">
        <Input
          id="code"
          type="text"
          placeholder={t("signup.signup-info.email-code-step.placeholder")}
          maxLength={6}
          className="text-lg py-3 tracking-widest text-center flex-1"
          value={code}
          onChange={handleInputChange}
          inputMode="numeric"
          pattern="[0-9]*"
        />

        <Button
          variant="outline"
          disabled={cooldown > 0}
          onClick={sendAgain}
          className="w-12 p-0"
          type="button"
        >
          <RotateCw className={`w-4 h-4 ${cooldown > 0 ? "text-muted-foreground opacity-50" : ""}`} />
        </Button>
      </div>

      {cooldown > 0 && (
        <div className="text-sm text-muted-foreground mb-2">
          {t("signup.signup-info.email-code-step.resend-in")} {cooldown}{" "}
          {t("signup.signup-info.email-code-step.seconds")}
        </div>
      )}

      <Button
        className="w-full mt-2 py-3 text-base flex items-center justify-center"
        onClick={verifierCode}
        disabled={isVerifying}
        type="button"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isVerifying ? (
            <motion.span
              key="loader"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              {t("signup.signup-info.email-code-step.verifying")}
            </motion.span>
          ) : (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center"
            >
              <ShieldCheck className="mr-2 h-4 w-4" />
              {t("signup.signup-info.email-code-step.button")}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <Button
        variant="secondary"
        className="w-full mt-4"
        onClick={back}
        type="button"
      >
        {t("signup.signup-info.email-code-step.back")}
      </Button>
    </>
  );
}