'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Language } from '@/locales/index';

const languages: Record<Language, { label: string; flag: string }> = {
  tr: { label: 'Türkçe', flag: '🇹🇷' },
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'English', flag: '🇬🇧' },
};

export default function LanguageSwitcher({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (lang: Language) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Refs vers les éléments <li> pour gérer le focus clavier
  const itemsRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Focus automatique sur le premier item quand on ouvre
  useEffect(() => {
    if (open && itemsRefs.current[0]) {
      itemsRefs.current[0].focus();
    }
  }, [open]);

  // Gestion navigation clavier dans le menu
  function onKeyDown(
    e: KeyboardEvent<HTMLLIElement>,
    index: number,
    keyLang: Language
  ) {
    const lastIndex = Object.keys(languages).length - 1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        {
          const nextIndex = index === lastIndex ? 0 : index + 1;
          itemsRefs.current[nextIndex]?.focus();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        {
          const prevIndex = index === 0 ? lastIndex : index - 1;
          itemsRefs.current[prevIndex]?.focus();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setLanguage(keyLang);
        setOpen(false);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={ref} className="relative inline-block text-left z-50">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Choisir la langue"
        className="inline-flex items-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-base font-semibold text-gray-900 shadow-sm
          hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
      >
        <span className="mr-3 text-2xl">{languages[language].flag}</span>
        <span className="hidden sm:inline">{languages[language].label}</span>
        <svg
          className={`ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 ${
            open ? 'rotate-180' : 'rotate-0'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul
          className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5
            transition ease-in-out duration-150 transform opacity-100 scale-100 pointer-events-auto"
          role="menu"
          aria-orientation="vertical"
        >
          {Object.entries(languages).map(([key, { label, flag }], index) => (
            <li
              key={key}
              ref={(el) => {
                itemsRefs.current[index] = el;
              }}
              className={`cursor-pointer select-none px-4 py-2 flex items-center space-x-3 text-base
                ${language === key ? 'bg-indigo-600 text-white' : 'text-gray-800 hover:bg-indigo-100'}
              `}
              role="menuitemradio"
              aria-checked={language === key}
              aria-current={language === key ? 'true' : undefined}
              tabIndex={0}
              onClick={() => {
                setLanguage(key as Language);
                setOpen(false);
              }}
              onKeyDown={(e) => onKeyDown(e, index, key as Language)}
            >
              <span className="text-2xl" aria-hidden="true">{flag}</span>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}