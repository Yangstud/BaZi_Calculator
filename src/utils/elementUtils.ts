import { Elements, ElementColors } from './constants';

export function getElement(stem: string) {
  return Object.entries(Elements).find(([_, stems]) => 
    stems.includes(stem)
  )?.[0] || 'earth';
}

export function getElementColor(stem: string) {
  const element = getElement(stem);
  return ElementColors[element as keyof typeof ElementColors];
}