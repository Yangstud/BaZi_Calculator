import { Gan, Zhi, Elements } from './constants';

export function getStemIndex(year: number): number {
  return (year - 4) % 10;
}

export function getBranchIndex(year: number): number {
  return (year - 4) % 12;
}

export function getHourBranch(hour: number): number {
  return Math.floor((hour + 1) / 2) % 12;
}

export function getDayGanIndex(days: number): number {
  const baseDate = new Date(1900, 0, 1);
  const daysPassed = Math.floor((days - baseDate.getTime()) / (24 * 60 * 60 * 1000));
  return (daysPassed + 10) % 10;
}

export function getMonthGanIndex(yearGanIndex: number, monthBranchIndex: number): number {
  return (yearGanIndex * 2 + monthBranchIndex) % 10;
}

export function getElement(stem: string): keyof typeof Elements {
  return Object.entries(Elements).find(([_, stems]) => 
    stems.includes(stem)
  )?.[0] as keyof typeof Elements || 'earth';
}

export function getStemBranchCombination(stem: string, branch: string): string {
  return `${stem}${branch}`;
}