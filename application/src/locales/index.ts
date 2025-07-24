import fr from './fr.json';
import en from './en.json';
import tr from './tr.json';

export type Language = 'fr' | 'en' | 'tr';

const translations: Record<Language, Record<string, string>> = {
  fr,
  en,
  tr,
};

export default translations;