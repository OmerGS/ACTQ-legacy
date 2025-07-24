import fr from './fr.json';
import en from './en.json';
import tr from './tr.json';

export type Language = 'fr' | 'en' | 'tr';

type Translations = {
  [key: string]: string | Translations;
};

const translations: Record<Language, Translations> = {
  fr,
  en,
  tr,
};

export default translations;