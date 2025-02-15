'use client';

import { PATHS } from '@/constants/PATHS';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { ThemeToggleButton } from './ThemeToggleButton';
import { MobileMenu } from './MobileMenu';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href={PATHS.LANDING.ROOT} className="flex items-center gap-3">
          <Image
            src="/TrustCircle.svg"
            alt="TrustCircle Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            TrustCircle
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={PATHS.REVIEW.WRITE}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition"
          >
            Write a Review
          </Link>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition">
                Categories
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <DropdownMenuItem>
                <Link
                  href="/categories/tech"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Tech
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/categories/fashion"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Fashion
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/categories/home"
                  className="text-gray-700 dark:text-gray-300"
                >
                  Home
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={PATHS.BLOG.ROOT}
            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition"
          >
            Blog
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden md:inline-block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light"
          >
            <Link href={PATHS.SIGNUP.ROOT}>Login / Register</Link>
          </Button>

          <Button variant="default" className="hidden md:inline-block">
            <Link href={PATHS.BUSINESSES.ROOT}>Businesses</Link>
          </Button>

          <ThemeToggleButton />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};
