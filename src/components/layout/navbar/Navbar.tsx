'use client';

import { setCookie } from 'cookies-next';
import { LayoutDashboard, LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Logo } from '@/components/icons/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { PATHS } from '@/constants/PATHS';

import { MobileMenu } from './MobileMenu';
import { ToggleLanguageIcon } from './ToggleLanguage';
import { ToggleThemeIcon } from './ToggleTheme';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const tAuth = useTranslations('Auth');
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const { theme, setTheme } = useTheme();
  const locale = useLocale();

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fa' : 'en';
    setCookie('NEXT_LOCALE', newLocale, { path: '/' });
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="mx-auto flex items-center justify-between py-4 px-6">
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

        <div className="flex items-center gap-2">
          <Button variant="default" asChild>
            <Link href={PATHS.BUSINESSES.ROOT}>{t('businesses')}</Link>
          </Button>
          {sessionStatus === 'loading' ? (
            <Skeleton className="size-8 rounded-full" />
          ) : session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session?.user?.image || undefined}
                      alt={session?.user?.name || ''}
                    />
                    <AvatarFallback>
                      {session?.user.name?.charAt(0) || <User />}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => router.push(PATHS.PROFILE.ROOT)}
                >
                  {t('profile')}
                  <DropdownMenuShortcut>
                    <LayoutDashboard size={15} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={toggleLanguage}>
                  {t('language')}
                  <DropdownMenuShortcut>
                    {locale === 'en' ? 'EN' : 'FA'}
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                >
                  {t('theme')}
                  <DropdownMenuShortcut>
                    <ToggleThemeIcon />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => signOut()}>
                  {tAuth('signOut')}
                  <DropdownMenuShortcut>
                    <LogOut size={15} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <MobileMenu />
              <Button
                variant="outline"
                className="hidden md:flex w-full cursor-pointer px-2"
                onClick={toggleLanguage}
              >
                <ToggleLanguageIcon />
                <span className="text-xs">{locale === 'en' ? 'EN' : 'FA'}</span>
              </Button>
              <Button
                variant="outline"
                className="hidden md:flex w-full cursor-pointer px-2"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <ToggleThemeIcon />
              </Button>
              <Button className="hidden md:flex" variant="outline" asChild>
                <Link href={PATHS.SIGNIN.ROOT}>{t('loginRegister')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
