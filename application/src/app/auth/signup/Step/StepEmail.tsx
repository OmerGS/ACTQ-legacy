import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { askEmailCode } from '../signup-logic';
import { useTranslation } from '@/hooks/useTranslation';

interface StepEmailProps {
  email: string;
  setEmail: (email: string) => void;
  next: () => void;
}

export const StepEmail: React.FC<StepEmailProps> = ({ email, setEmail, next }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useTranslation();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      toast.error(t("signup.signup-info.email-step.title"));
      return;
    }

    setIsLoading(true);

    try {
      await askEmailCode(email, language);
      toast.success(t("signup.signup-info.email-step.success"));
      next();
    } catch (err: unknown){
      if (err instanceof Error) {
        toast.error(t("signup.signup-info.email-step.error-server"));
      } else {
        toast.error(String(err));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          {t("signup.signup-info.email-step.label")}
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            ref={inputRef}
            id="email"
            type="email"
            placeholder={t("signup.signup-info.email-step.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {t("signup.signup-info.email-step.description")}
        </p>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={!email || isLoading}
      >
        {isLoading ? (
          <>
            <Send className="mr-2 h-4 w-4 animate-spin" />
            {t("signup.signup-info.email-step.sending")}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t("signup.signup-info.email-step.button")}
          </>
        )}
      </Button>
    </form>
  );
};