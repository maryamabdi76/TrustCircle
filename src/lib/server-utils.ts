import { NextResponse } from 'next/server';

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
