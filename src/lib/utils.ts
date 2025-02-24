import { ClassValue, clsx } from 'clsx';
import { NextResponse } from 'next/server';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function handleError({
  error,
  message = 'Internal server error',
  status = 500,
  details,
}: {
  error?: unknown;
  message?: string;
  status?: number;
  details?: unknown;
}) {
  console.error('Error:', error || message, details || '');

  return NextResponse.json(
    details ? { error: message, details } : { error: message },
    { status }
  );
}
