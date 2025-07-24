"use client";

import { useTranslation } from "@/hooks/useTranslation";

export default function Spinner() {
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Chargement en cours"
      className="w-10 h-10 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin"
    >
      <span className="sr-only">{t("loading.chargement")}</span>
    </div>
  );
}