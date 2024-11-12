import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const { t } = useTranslation();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      newDate.setHours(value.getHours(), value.getMinutes());
      onChange(newDate);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(value);
    newDate.setHours(hours, minutes);
    onChange(newDate);
  };

  return (
    <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={value.toISOString().split('T')[0]}
          onChange={handleDateChange}
          aria-label={t('selectDate')}
        />
      </div>
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Clock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="time"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={value.toTimeString().slice(0, 5)}
          onChange={handleTimeChange}
          aria-label={t('selectTime')}
        />
      </div>
    </div>
  );
}