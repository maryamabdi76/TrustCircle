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
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const t = useTranslations('Navbar');
  const tAuth = useTranslations('Auth');
  const { theme } = useTheme();
  const router = useRouter();
  const { data: session } = useSession();

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
        <div className="flex items-center gap-4">
          <Button variant="default" asChild className="hidden md:inline-block">
            <Link href={PATHS.BUSINESSES.ROOT}>{t('businesses')}</Link>
          </Button>

          <LanguageToggleButton />

          <ThemeToggleButton />

          <MobileMenu />

          {session ? (
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
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{tAuth('signOut')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href={PATHS.SIGNIN.ROOT}>{t('loginRegister')}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
