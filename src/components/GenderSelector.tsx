import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { Gender } from '../types';
import { UserCircle2, User2 } from 'lucide-react';
import { cn } from '../utils/cn';

interface GenderSelectorProps {
  value: Gender;
  onChange: (gender: Gender) => void;
}

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-4">
      <button
        onClick={() => onChange('male')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
          value === 'male'
            ? 'bg-black text-white'
            : 'bg-white text-black border border-black hover:bg-gray-100'
        )}
      >
        <UserCircle2 className="w-5 h-5" />
        {t('male')}
      </button>
      <button
        onClick={() => onChange('female')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
          value === 'female'
            ? 'bg-black text-white'
            : 'bg-white text-black border border-black hover:bg-gray-100'
        )}
      >
        <User2 className="w-5 h-5" />
        {t('female')}
      </button>
    </div>
  );
}