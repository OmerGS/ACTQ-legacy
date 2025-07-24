"use client";

import Spinner from "./Spinner";
import { useTranslation } from "@/hooks/useTranslation";

export default function SpinnerScreen() {
  const { t, isReady } = useTranslation();

  if (!isReady) return null;

  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 px-6">
      <section className="w-full max-w-md flex flex-col items-center space-y-10 rounded-3xl bg-white p-10 shadow-lg">
        <Spinner />

        <h2 className="text-xl font-semibold text-gray-900 select-none">
          {t("loading.title")}
        </h2>

        <p className="text-center text-gray-600 text-base leading-relaxed max-w-[280px]">
          {t("loading.message")}
        </p>
      </section>
    </main>
  );
}