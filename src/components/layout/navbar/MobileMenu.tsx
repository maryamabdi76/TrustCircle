'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { PATHS } from '@/constants/PATHS';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const MobileMenu = () => {
  const t = useTranslations('Navbar');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="md:hidden text-gray-700 hover:text-primary">
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
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={PATHS.REVIEW.WRITE}>{t('writeReview')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={PATHS.BLOG.ROOT}>{t('blog')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={PATHS.SIGNUP.ROOT}>{t('loginRegister')}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/business">{t('businesses')}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
