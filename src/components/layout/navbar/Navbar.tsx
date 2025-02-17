'use client';

import { PATHS } from '@/constants/PATHS';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from './ThemeToggleButton';
import { MobileMenu } from './MobileMenu';
import { useTranslations } from 'next-intl';
import { LanguageToggleButton } from './LanguageToggleButton';
import { Logo } from '@/components/icons/Logo';
import { useTheme } from 'next-themes';

export const Navbar = () => {
  const { theme } = useTheme();

  const t = useTranslations('Navbar');
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href={PATHS.LANDING.ROOT} className="flex items-center gap-3">
          <Logo
            width={40}
            height={40}
            fill={theme === 'dark' ? '#fff' : '#000'}
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {t('title')}
          </span>
        </Link>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="default" className="hidden md:inline-block">
            <Link href={PATHS.BUSINESSES.ROOT}>{t('businesses')}</Link>
          </Button>

          <Button variant="outline" className="hidden md:inline-block">
            <Link href={PATHS.SIGNUP.ROOT}>{t('loginRegister')}</Link>
          </Button>

          <LanguageToggleButton />

          <ThemeToggleButton />

          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};
