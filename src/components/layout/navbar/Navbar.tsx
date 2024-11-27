import Image from 'next/image';

export const Navbar = () => {
  return (
    <nav className="flex px-6 py-3 justify-between bg-gradient-to-r from-blue-200 to-orange-200 w-full fixed z-10 shadow-md font-semibold text-gray-700">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/TrustCircle.png"
          alt="TrustCircle Logo"
          width={50}
          height={50}
          priority
        />
        <div className="flex flex-col text-xl mr-4 leading-none font-semibold content-stretch">
          <span>TRUST</span>
          <span>CIRCLE</span>
        </div>
        <div>Home</div>
        <div>Shops</div>
        <div>Reveiwes</div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        {/* Login/Register */}
        <button className="text-black font-semibold hover:underline">
          Login / Register
        </button>
      </div>
    </nav>
  );
};
