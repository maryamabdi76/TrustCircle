import './globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import localFont from 'next/font/local';

import { Footer, Navbar, ThemeProvider } from '@/components/layout';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthProvider';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import type React from 'react';
import type { Metadata } from 'next';
import { QueryClientProvider } from '@tanstack/react-query';

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
        <QueryClientProvider client={queryClient}>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={false}
              >
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow mt-16">{children}</main>
                  <Footer />
                </div>
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </QueryClientProvider>
        <Toaster />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
