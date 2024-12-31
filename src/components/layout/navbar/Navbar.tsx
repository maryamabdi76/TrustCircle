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

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href={PATHS.LANDING.ROOT} className="flex items-center gap-3">
          <Image
            src="/TrustCircle.svg"
            alt="TrustCircle Logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold text-gray-800">TrustCircle</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href={PATHS.REVIEW.WRITE}
            className="text-gray-700 hover:text-primary transition"
          >
            Write a Review
          </Link>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-gray-700 hover:text-primary transition">
                Categories
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/categories/tech">Tech</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/categories/fashion">Fashion</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/categories/home">Home</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href={PATHS.BLOG.ROOT}
            className="text-gray-700 hover:text-primary transition"
          >
            Blog
          </Link>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="hidden md:inline-block text-gray-700 hover:text-primary"
          >
            Login / Register
          </Button>
          <Button variant="default" className="hidden md:inline-block">
            Businesses
          </Button>

          {/* Mobile Menu */}
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
        </div>
      </div>
    </nav>
  );
};
