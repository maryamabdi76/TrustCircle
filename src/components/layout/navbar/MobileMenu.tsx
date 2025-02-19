'use client';

import { setCookie } from 'cookies-next';
import { LogIn } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PATHS } from '@/constants/PATHS';
import { ToggleThemeIcon } from './ToggleTheme';

export const MobileMenu = () => {
  const t = useTranslations('Navbar');
  const { theme, setTheme } = useTheme();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fa' : 'en';
    setCookie('NEXT_LOCALE', newLocale, { path: '/' });
    window.location.reload();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="md:hidden text-gray-700 hover:text-primary px-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={PATHS.SIGNUP.ROOT}>{t('loginRegister')}</Link>
          <DropdownMenuShortcut>
            <LogIn size={15} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleLanguage}>
          {t('language')}
          <DropdownMenuShortcut>
            {locale === 'en' ? 'EN' : 'FA'}
            {/* <LanguageToggleIcon /> */}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            theme === 'dark' ? setTheme('light') : setTheme('dark')
          }
        >
          {t('theme')}
          <DropdownMenuShortcut>
            <ToggleThemeIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
