import frHome from './fr/home.json';
import frLoading from './fr/loading.json';
import frSignup from './fr/signup';
import frPassword from './fr/components/PasswordInput.json';

import enHome from './en/home.json';
import enLoading from './en/loading.json';
import enSignup from './en/signup';
import enPassword from './en/components/PasswordInput.json';

import trHome from './tr/home.json';
import trLoading from './tr/loading.json';
import trSignup from './tr/signup';
import trPassword from './tr/components/PasswordInput.json';

export type Language = 'fr' | 'en' | 'tr';

type Translations = {
  [key: string]: string | Translations;
};

const translations: Record<Language, Translations> = {
  fr: {
    home: frHome,
    loading: frLoading,
    signup: frSignup,
    components: {
      password: frPassword,
    },
  },
  en: {
    home: enHome,
    loading: enLoading,
    signup: enSignup,
    components: {
      password: enPassword,
    },
  },
  tr: {
    home: trHome,
    loading: trLoading,
    signup: trSignup,
    components: {
      password: trPassword,
    },
  },
};

export default translations;