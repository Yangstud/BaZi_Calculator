import React, { useState, useCallback, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { DateTimePicker } from './components/DateTimePicker';
import { BaZiChart } from './components/BaZiChart';
import { GenderSelector } from './components/GenderSelector';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { YinYangSpinner } from './components/YinYangSpinner';
import { calculateBaZi } from './utils/baziCalculator';
import { useTranslation } from './hooks/useTranslation';
import { BaZiChart as BaZiChartType, Gender } from './types';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [birthDate, setBirthDate] = useState(() => new Date());
  const [gender, setGender] = useState<Gender>('male');
  const [chart, setChart] = useState<BaZiChartType | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  
  const handleDateChange = useCallback((newDate: Date) => {
    setBirthDate(newDate);
    setLoading(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newChart = calculateBaZi(birthDate);
      setChart(newChart);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [birthDate]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-6 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTAwIiByPSI5OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMTAwIDJDMTAwIDIgMTAwIDEwMCAxMDAgMTAwQzEwMCAxMDAgMiAxMDAgMiAxMDBDMiAxMDAgMTAwIDIgMTAwIDJaIiBmaWxsPSIjMDAwIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNTAiIHI9IjEwIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iMTUwIiByPSIxMCIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] bg-repeat opacity-10"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <header className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-2 text-center sm:text-left">
                <Calendar className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" />
                {t('fortuneTellingTitle')}
              </h1>
              <LanguageSwitcher />
            </div>
            <p className="text-gray-600 text-center sm:text-left text-sm sm:text-base">
              {t('instructions')}
            </p>
          </header>

          <main className="space-y-6 sm:space-y-8">
            <section className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-xl">
              <div className="space-y-4 sm:space-y-6">
                <DateTimePicker value={birthDate} onChange={handleDateChange} />
                <GenderSelector value={gender} onChange={setGender} />
              </div>
            </section>

            <section className="relative min-h-[200px]">
              {loading ? (
                <YinYangSpinner />
              ) : (
                chart && (
                  <div className="animate-fadeIn">
                    <BaZiChart 
                      chart={chart} 
                      birthDate={birthDate}
                      gender={gender}
                    />
                  </div>
                )
              )}
            </section>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}