import { Lunar } from 'lunar-javascript';
import { BaZiChart } from '../types';

export function calculateBaZi(birthDate: Date): BaZiChart {
  const lunar = Lunar.fromDate(birthDate);
  const eightChar = lunar.getEightChar();

  return {
    year: {
      heavenlyStem: eightChar.getYear(),
      earthlyBranch: eightChar.getYearZhi()
    },
    month: {
      heavenlyStem: eightChar.getMonth(),
      earthlyBranch: eightChar.getMonthZhi()
    },
    day: {
      heavenlyStem: eightChar.getDay(),
      earthlyBranch: eightChar.getDayZhi()
    },
    hour: {
      heavenlyStem: eightChar.getTime(),
      earthlyBranch: eightChar.getTimeZhi()
    }
  };
}

export function calculateLunarDate(date: Date) {
  const lunar = Lunar.fromDate(date);
  return {
    year: lunar.getYear(),
    month: lunar.getMonth(),
    day: lunar.getDay(),
    yearAnimal: lunar.getYearShengXiao(),
    isLeapMonth: lunar.isLeap()
  };
}

export function calculateSolarTerms(date: Date) {
  const lunar = Lunar.fromDate(date);
  const jieQi = lunar.getJieQi();
  const nextJieQi = lunar.getNextJieQi();

  return {
    currentTerm: jieQi.getName(),
    nextTerm: nextJieQi.getName(),
    nextTermDate: nextJieQi.getSolar().toYmd()
  };
}