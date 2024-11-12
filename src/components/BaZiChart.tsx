import React, { memo, useEffect, useState } from 'react';
import { BaZiChart as BaZiChartType, Gender } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { calculateLunarDate, calculateSolarTerms } from '../utils/baziCalculator';
import { Loader2, Copy, ExternalLink } from 'lucide-react';
import { PillarDisplay } from './PillarDisplay';

interface BaZiChartProps {
  chart: BaZiChartType;
  birthDate: Date;
  gender: Gender;
}

export const BaZiChart = memo(function BaZiChart({ chart, birthDate, gender }: BaZiChartProps) {
  const { t, language } = useTranslation();
  const [lunarDate, setLunarDate] = useState<any>(null);
  const [solarTerms, setSolarTerms] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const lunarData = calculateLunarDate(birthDate);
      const solarData = calculateSolarTerms(birthDate);
      setLunarDate(lunarData);
      setSolarTerms(solarData);
    } catch (error) {
      console.error('Error calculating dates:', error);
    } finally {
      setLoading(false);
    }
  }, [birthDate]);

  const getClipboardContent = () => {
    const genderText = language.startsWith('zh') 
      ? (gender === 'male' ? '男' : '女')
      : language === 'ja'
      ? (gender === 'male' ? '男性' : '女性')
      : language === 'ko'
      ? (gender === 'male' ? '남성' : '여성')
      : (gender === 'male' ? 'Male' : 'Female');

    const baziLabel = language.startsWith('zh') 
      ? '八字：'
      : language === 'ja'
      ? '八字：'
      : language === 'ko'
      ? '사주：'
      : 'BaZi: ';

    const genderLabel = language.startsWith('zh')
      ? '性别：'
      : language === 'ja'
      ? '性別：'
      : language === 'ko'
      ? '성별：'
      : 'Gender: ';

    return `${baziLabel}${chart.year.heavenlyStem}${chart.year.earthlyBranch} ${chart.month.heavenlyStem}${chart.month.earthlyBranch} ${chart.day.heavenlyStem}${chart.day.earthlyBranch} ${chart.hour.heavenlyStem}${chart.hour.earthlyBranch}\n${genderLabel}${genderText}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getClipboardContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <PillarDisplay pillar={chart.year} label={t('yearPillar')} />
        <PillarDisplay pillar={chart.month} label={t('monthPillar')} />
        <PillarDisplay pillar={chart.day} label={t('dayPillar')} />
        <PillarDisplay pillar={chart.hour} label={t('hourPillar')} />
      </div>

      {lunarDate && solarTerms && (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-6 animate-fadeIn">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">农历日期</h3>
              <p className="text-gray-600">
                农历 {lunarDate.year}年 {lunarDate.month}月 {lunarDate.day}日
                {lunarDate.isLeapMonth && ' (闰月)'}
              </p>
              <p className="text-gray-600">生肖：{lunarDate.yearAnimal}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">节气</h3>
              <p className="text-gray-600">当前：{solarTerms.currentTerm}</p>
              <p className="text-gray-600">下一个：{solarTerms.nextTerm}</p>
              <p className="text-gray-600">时间：{solarTerms.nextTermDate}</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleCopy}
          className="inline-flex items-center justify-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Copy className="w-5 h-5 mr-2" />
          {copied ? t('copied') : t('copyToClipboard')}
        </button>
        <a
          href="https://chatgpt.com/g/g-Ya7shmLPJ-xiao-bei-dou"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-black border border-black rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          {t('goToGPT')}
        </a>
      </div>
    </div>
  );
});