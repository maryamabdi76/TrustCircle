import type React from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar, Footer, ThemeProvider } from '@/components/layout';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';

const iranYekanFont = localFont({
  src: [
    {
      path: './fonts/IRANYekan-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/IRANYekan-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/IRANYekan-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'TrustCircle',
  description: 'پلتفرم نظرات و بررسی‌های معتبر فروشگاه‌ها',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}>
      <body
        className={cn('font-sans antialiased bg-background text-foreground', {
          [iranYekanFont.className]: locale === 'fa',
        })}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
