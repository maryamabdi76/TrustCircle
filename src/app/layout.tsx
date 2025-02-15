import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Navbar, Footer, ThemeProvider } from '@/components/layout';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

const vazirFontRegular = localFont({
  src: './fonts/Vazirmatn-Regular.woff2',
  variable: '--font-vazir-regular',
  weight: '400',
});

const vazirFontBold = localFont({
  src: './fonts/Vazirmatn-Bold.woff2',
  variable: '--font-vazir-bold',
  weight: '700',
});

export const metadata: Metadata = {
  title: 'TrustCircle',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${vazirFontRegular.variable} ${vazirFontBold.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Navbar />
            <main className="pt-16 min-h-screen">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
