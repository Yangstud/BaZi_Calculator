import React, { useContext } from 'react';
import { Globe } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';
import { Language } from '../types';
import { useTranslation } from '../hooks/useTranslation';

export function LanguageSwitcher() {
  const { language, setLanguage } = useContext(LanguageContext);
  const { t } = useTranslation();

  const languages: Record<Language, string> = {
    en: 'English',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    ja: '日本語',
    ko: '한국어',
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="relative group">
      <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 border border-black">
        <Globe className="w-5 h-5 text-black" />
        <select
          value={language}
          onChange={handleLanguageChange}
          className="appearance-none bg-transparent border-none focus:ring-0 text-black pr-8 cursor-pointer"
          aria-label={t('language')}
        >
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}