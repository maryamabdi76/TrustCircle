'use client';

import { useLocale } from 'next-intl';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

import { DirectionProvider } from '@radix-ui/react-direction';

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const locale = useLocale();
  return (
    <DirectionProvider dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </DirectionProvider>
  );
}
