import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isBase64Image = (url: string): boolean => {
  return url?.startsWith('data:image/');
};
