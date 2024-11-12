type ClassValue = string | number | boolean | undefined | null;

export function classNames(...classes: ClassValue[]) {
  return classes.filter(Boolean).join(' ');
}