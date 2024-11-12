import React, { memo } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { BaZiChart } from '../types';
import { cn } from '../utils/cn';

interface PillarExplanationProps {
  title: string;
  explanation: string;
  content: string;
}

const PillarExplanation = memo(({ title, explanation, content }: PillarExplanationProps) => (
  <div className={cn(
    "border-l-4 border-gray-800 pl-4",
    "transition-all duration-300"
  )}>
    <h4 className="font-medium mb-2">{title}</h4>
    <p className="text-sm text-gray-600">{explanation}</p>
    <p className="mt-2">{content}</p>
  </div>
));

PillarExplanation.displayName = 'PillarExplanation';

interface ElementExplanationProps {
  chart: BaZiChart;
}

export const ElementExplanation = memo(function ElementExplanation({ chart }: ElementExplanationProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">{t('elementExplanation')}</h3>
      
      <div className="space-y-4">
        <PillarExplanation
          title={t('yearPillar')}
          explanation={t('yearPillarExplanation')}
          content={`${chart.year.heavenlyStem} ${chart.year.earthlyBranch}`}
        />
        <PillarExplanation
          title={t('monthPillar')}
          explanation={t('monthPillarExplanation')}
          content={`${chart.month.heavenlyStem} ${chart.month.earthlyBranch}`}
        />
        <PillarExplanation
          title={t('dayPillar')}
          explanation={t('dayPillarExplanation')}
          content={`${chart.day.heavenlyStem} ${chart.day.earthlyBranch}`}
        />
        <PillarExplanation
          title={t('hourPillar')}
          explanation={t('hourPillarExplanation')}
          content={`${chart.hour.heavenlyStem} ${chart.hour.earthlyBranch}`}
        />
      </div>
    </div>
  );
});