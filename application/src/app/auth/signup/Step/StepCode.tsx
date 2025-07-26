import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { checkCode } from "../signup-logic";
import { Step } from "../signup";
import { useTranslation } from "@/hooks/useTranslation";

export function StepCode({
  phone,
  code,
  setCode,
  setStep,
  loading,
  setLoading,
}: {
  phone: string;
  code: string;
  setCode: (c: string) => void;
  setStep: (s: Step) => void;
  loading: boolean;
  setLoading: (l: boolean) => void;
}) {
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  const handleVerify = async () => {
    if (code.length !== 6) {
      toast.error(t("signup.step-signup.2.error-length"));
      return;
    }

    setLoading(true);
    try {
      const valid = await checkCode(phone, code);
      if (valid) {
        toast.success(t("signup.step-signup.2.success"));
        setStep(3);
      } else {
        toast.error(t("signup.step-signup.2.error-invalid"));
      }
    } catch {
      toast.error(t("signup.step-signup.2.error-server"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <p className="mb-4 text-sm text-center" dangerouslySetInnerHTML={{ __html: t("signup.step-signup.2.sent", { phone }) }} />
      <Label htmlFor="code" className="mb-2 text-base font-medium">
        {t("signup.step-signup.2.label")}
      </Label>
      <Input
        id="code"
        type="text"
        placeholder={t("signup.step-signup.2.placeholder")}
        maxLength={6}
        className="mb-2 text-lg py-3 tracking-widest text-center"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        disabled={loading}
        inputMode="numeric"
      />
      <Button className="w-full mt-2 py-3 text-base" onClick={handleVerify} disabled={loading}>
        {loading ? t("signup.step-signup.2.verifying") : t("signup.step-signup.2.button")}
      </Button>
      <button
        className="mt-4 text-sm underline text-indigo-500 hover:text-indigo-600"
        onClick={() => setStep(1)}
        disabled={loading}
      >
        {t("signup.step-signup.2.back")}
      </button>
    </>
  );
}