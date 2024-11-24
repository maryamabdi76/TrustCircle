import Image from 'next/image';

export const Navbar = () => {
  return (
    <nav className="flex px-6 py-3 justify-between bg-gradient-to-t from-gray-50 to-blue-200 shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-3">
        <Image
          src="/TrustCircle.png"
          alt="TrustCircle Logo"
          width={50}
          height={50}
          priority
        />
        <div className="flex flex-col text-xl mr-4 leading-none font-medium content-stretch">
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
        <button className="text-black font-medium hover:underline">
          Login / Register
        </button>
      </div>
    </nav>
  );
};
