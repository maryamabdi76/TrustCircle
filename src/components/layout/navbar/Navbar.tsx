import { PATHS } from '@/constants/PATHS';
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="flex px-6 py-3 justify-between bg-white w-full fixed z-10 shadow-md font-semibold text-gray-700">
      {/* Logo and Title */}
      <Link href={PATHS.LANDING.ROOT} className="flex items-center gap-3">
        <Image
          src="/TrustCircle.svg"
          alt="TrustCircle Logo"
          width={50}
          height={50}
          priority
        />
        <div className="flex flex-col text-xl mr-4 leading-none font-semibold content-stretch">
          <span>TrustCircle</span>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <div>Write a Review</div>
        <div>Categories</div>
        <div>Blog</div>
        {/* Login/Register */}
        <button className="text-black font-semibold bg-orange-400/20 hover:bg-orange-500/40 backdrop-blur-lg shadow-xl rounded-lg p-2">
          Login / Register
        </button>
        {/* Login/Register */}
        <button className="text-black font-semibold bg-orange-400/20 hover:bg-orange-500/40 backdrop-blur-lg shadow-xl rounded-lg p-2">
          Businesses
        </button>
      </div>
    </nav>
  );
};
