'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { DirectionProvider } from '@radix-ui/react-direction';
import { useLocale } from 'next-intl';

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
