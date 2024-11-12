import React, { memo } from 'react';
import { Pillar } from '../types';
import { getElementColor } from '../utils/elementUtils';
import { cn } from '../utils/cn';

interface PillarDisplayProps {
  pillar: Pillar;
  label: string;
}

export const PillarDisplay = memo(function PillarDisplay({ pillar, label }: PillarDisplayProps) {
  const stemColor = getElementColor(pillar.heavenlyStem);
  
  return (
    <div className="flex flex-col items-center p-6 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 animate-slideUp">
      <span className="text-sm text-gray-500 mb-3">{label}</span>
      <div className="flex items-center justify-center">
        <span className={cn("text-3xl font-semibold", stemColor)}>
          {pillar.heavenlyStem}
        </span>
      </div>
    </div>
  );
});