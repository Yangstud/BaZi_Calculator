import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import translations from '../locales';

export function useTranslation() {
  const { language } = useContext(LanguageContext);

  const t = (key: string): string => {
    const translation = translations[language]?.[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`);
      return key;
    }
    return translation;
  };

  return { t, language };
}