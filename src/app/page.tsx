import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-6">
        <h1 className="text-4xl font-bold mb-4">
          Share Your Shopping Stories.
        </h1>
        <h2 className="text-3xl font-extrabold text-blue-900">
          Build a Circle of Trust.
        </h2>
        <div className="mt-8 flex justify-center">
          <input
            type="text"
            placeholder="Search for a shop..."
            className="px-4 py-2 w-72 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition">
            Search
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-12">
        {/* Trusted Shops */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg">
          <Image
            src="/icons/trusted-shops.svg"
            alt="Trusted Shops"
            width={100}
            height={100}
          />
          <h3 className="text-xl font-semibold mt-4">Trusted Shops</h3>
          <p className="text-gray-600 mt-2">
            Discover top-rated and trusted online stores recommended by others.
          </p>
        </div>

        {/* User Stories */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg">
          <Image
            src="/icons/user-stories.svg"
            alt="User Stories"
            width={100}
            height={100}
          />
          <h3 className="text-xl font-semibold mt-4">User Stories</h3>
          <p className="text-gray-600 mt-2">
            Explore real shopping experiences shared by our community.
          </p>
        </div>

        {/* Write a Review */}
        <div className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg">
          <Image
            src="/icons/write-review.svg"
            alt="Write a Review"
            width={100}
            height={100}
          />
          <h3 className="text-xl font-semibold mt-4">Write a Review</h3>
          <p className="text-gray-600 mt-2">
            Share your experience and help others shop smarter.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="flex flex-col items-center bg-blue-500 text-white py-12">
        <h2 className="text-3xl font-bold mb-4">Join TrustCircle Today</h2>
        <p className="text-lg mb-6 text-center">
          Be part of a growing community of shoppers building trust together.
        </p>
        <button className="px-6 py-3 bg-white text-blue-500 rounded-lg hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>
    </main>
  );
}
