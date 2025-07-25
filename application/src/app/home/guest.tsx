'use client';

import Image from 'next/image';
import LanguageSwitcher from '@/components/global/LanguageSwitcher';
import { useTranslation } from '@/hooks/useTranslation';
import { useRouter } from "next/navigation";

export default function GuestHome() {
  const { language, setLanguage, t, isReady } = useTranslation();
  const router = useRouter();

  if (!isReady) return null;

  const trad_home_guest = 'home.guest';

  return (
    <main
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-700 via-indigo-700 to-blue-600 px-6 py-12 text-gray-900 font-sans"
      role="main"
      lang={language}
    >
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher language={language} setLanguage={setLanguage} />
      </div>

      <section
        className="bg-white bg-opacity-90 rounded-3xl shadow-xl max-w-md w-full p-10 flex flex-col items-center"
        aria-labelledby="welcome-heading"
      >
        <Image
          src="/assets/logo/actq.png"
          alt="Logo ACTQ, association culturelle turque en Bretagne"
          width={140}
          height={140}
          className="rounded-full mb-6"
          priority
          role="img"
        />

        <h1
          id="welcome-heading"
          className="text-4xl font-extrabold mb-8 select-none"
          tabIndex={-1}
        >
          {t(`${trad_home_guest}.welcome`)}
        </h1>

        <div className="w-full space-y-5">
          <button
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-700 focus:outline focus:outline-4 focus:outline-indigo-300 transition duration-300"
            aria-label={t(`${trad_home_guest}.login`)}
          >
            {t(`${trad_home_guest}.login`)}
          </button>

          <button
            onClick={() => router.push("/auth/signup")}
            className="w-full py-3 rounded-2xl border-2 border-indigo-500 text-indigo-600 font-semibold hover:bg-indigo-50 focus:outline focus:outline-4 focus:outline-indigo-300 transition duration-300"
            aria-label={t(`${trad_home_guest}.signup`)}
          >
            {t(`${trad_home_guest}.signup`)}
          </button>

          <button
            className="text-center w-full text-sm text-indigo-600 hover:text-indigo-800 underline mt-4 focus:outline focus:outline-4 focus:outline-indigo-300"
            aria-label={t(`${trad_home_guest}.forgot`)}
          >
            {t(`${trad_home_guest}.forgot`)}
          </button>
        </div>
      </section>
    </main>
  );
}