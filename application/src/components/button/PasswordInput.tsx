import { useState, useMemo, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "@/hooks/useTranslation";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  autoComplete?: string;
  showStrength?: boolean;
  className?: string;
};

export default function PasswordInput({
  value,
  onChange,
  placeholder,
  name,
  autoComplete,
  showStrength = false,
  className = "",
}: Props) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleVisibility = () => {
    if (!show) {
      setShow(true);
      timerRef.current = setTimeout(() => setShow(false), 3000);
    } else {
      setShow(false);
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const strength = useMemo(() => {
    if (value.length === 0) return { label: "", color: "", width: "0%" };

    if (value.length < 10)
      return { label: t("components.password.strength.weak"), color: "bg-red-500", width: "25%" };

    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?\":{}|<>]/.test(value);
    const checks = [hasUpper, hasLower, hasNumber, hasSymbol].filter(Boolean).length;

    if (checks === 1)
      return { label: t("components.password.strength.medium"), color: "bg-yellow-500", width: "50%" };
    if (checks === 2)
      return { label: t("components.password.strength.good"), color: "bg-yellow-400", width: "75%" };
    if (checks >= 3)
      return { label: t("components.password.strength.strong"), color: "bg-green-600", width: "100%" };

    return { label: t("components.password.strength.weak"), color: "bg-red-500", width: "25%" };
  }, [value, t]);

  return (
    <div className={clsx("w-full max-w-md space-y-2", className)}>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          className={clsx(
            "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
          tabIndex={-1}
          aria-label={show ? t("components.password.hide") : t("components.password.show")}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {showStrength && value.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{t("components.password.strength.label")}</span>
            <span className={clsx("text-sm font-semibold", strength.color.replace("bg-", "text-"))}>
              {strength.label}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className={clsx("h-2 rounded-full transition-all duration-300", strength.color)}
              style={{ width: strength.width }}
            />
          </div>
        </div>
      )}
    </div>
  );
}