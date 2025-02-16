import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  // Await cookies() before accessing .get()
  const storedLocale = (await cookies()).get('NEXT_LOCALE')?.value;
  const defaultLocale = 'fa';

  const locale = storedLocale || defaultLocale;

  return {
    locale,
    messages: (await import(`../../public/messages/${locale}.json`)).default,
  };
});
