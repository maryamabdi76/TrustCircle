import Image from 'next/image';

export const Landing = () => {
  return (
    <div className="bg-gray-50">
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/TrustCircleLanding1.png)' }}
      >
        {/* Hero Section */}
        <section className="bg-white flex flex-col items-center justify-center text-center py-16 px-6 absolute top-2/3 left-1/3">
          <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
            Share Your Shopping Stories.
          </h1>
          <h2 className="text-3xl font-extrabold text-blue-900 drop-shadow-lg">
            Build a Circle of Trust.
          </h2>
          <div className="mt-2 flex justify-center">
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
      </div>
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-16 py-12">
        {/* Feature Cards */}
        {[
          {
            icon: '/images/bag-2.jpg',
            title: 'Trusted Shops',
            description:
              'Discover top-rated and trusted online stores recommended by others.',
          },
          {
            icon: '/images/sphere-3.jpg',
            title: 'User Stories',
            description:
              'Explore real shopping experiences shared by our community.',
          },
          {
            icon: '/images/phone.jpg',
            title: 'Write a Review',
            description: 'Share your experience and help others shop smarter.',
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white shadow-lg p-6 rounded-lg hover:shadow-xl transition"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={100}
              height={100}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </div>
        ))}
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
    </div>
  );
};
