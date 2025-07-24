import { useState, useEffect } from 'react';
import translations, { Language } from '../locales';

const STORAGE_KEY = 'app-language';

export function useTranslation(initialLang: Language = 'tr') {
  const [language, setLanguage] = useState<Language>(initialLang);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ['fr', 'en', 'tr'].includes(saved)) {
      setLanguage(saved as Language);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language, isReady]);

  function t(key: string, vars?: Record<string, string>): string {
    let str = getValueByPath(translations[language], key) ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        str = str.replace(new RegExp(`{{${k}}}`, 'g'), v);
      });
    }
    return str;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getValueByPath(obj: any, path: string): string | undefined {
    return path.split('.').reduce((acc, part) => {
      if (acc && typeof acc === 'object') {
        return acc[part];
      }
      return undefined;
    }, obj);
  }

  return { language, setLanguage, t, isReady };
}