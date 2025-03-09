import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { render } from '@testing-library/react';
import enMessages from '../../public/messages/en.json';
import faMessages from '../../public/messages/fa.json';

const messagesMap: { [key: string]: any } = {
  en: enMessages,
  fa: faMessages,
};

// Custom render function to include NextIntlClientProvider
export function customRender(
  ui: React.ReactElement,
  { locale = 'en' }: { locale?: 'en' | 'fa' } = {}
) {
  return render(
    <NextIntlClientProvider messages={messagesMap[locale]} locale={locale}>
      {ui}
    </NextIntlClientProvider>
  );
}

export * from '@testing-library/react';
export { customRender as render };
