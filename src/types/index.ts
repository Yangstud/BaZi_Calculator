export type Pillar = {
  heavenlyStem: string;
  earthlyBranch: string;
};

export type BaZiChart = {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  hour: Pillar;
};

export type Language = 'en' | 'zh-CN' | 'zh-TW' | 'ja' | 'ko';

export type Gender = 'male' | 'female';

export type LunarDate = {
  year: number;
  month: number;
  day: number;
  isLeapMonth: boolean;
  yearAnimal: string;
};

export type SolarTerms = {
  currentTerm: string;
  nextTerm: string;
  nextTermDate: string;
  allTerms?: Record<string, string>;
};