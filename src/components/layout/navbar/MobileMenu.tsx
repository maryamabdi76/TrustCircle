'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { PATHS } from '@/constants/PATHS';
import Link from 'next/link';

export const MobileMenu = () => {
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
          <Link href={PATHS.REVIEW.WRITE}>Write a Review</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={PATHS.BLOG.ROOT}>Blog</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={PATHS.SIGNUP.ROOT}>Login / Register</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/business">Businesses</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
