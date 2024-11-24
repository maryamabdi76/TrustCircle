import Image from 'next/image';

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div className="flex px-4 py-2 justify-between bg-gradient-to-tr from-gray-50 to-gray-100">
        <div className="flex gap-2">
          <Image
            src="/TrustCircle.png"
            alt="TrustCircle"
            width={50}
            height={50}
            priority
          />
          <div className="flex flex-col text-lg leading-none font-medium gap-0 justify-center items-stretch">
            <div>Trust</div>
            <div>Circle</div>
          </div>
        </div>

        <div className="flex  justify-center">
          <div className="flex gap-4">
            <div className="flex h-fit p-2 rounded-xl w-20 items-center justify-center bg-black text-white">
              Search
            </div>
            <div className="flex flex-col text-lg leading-none font-medium gap-0 justify-center items-stretch">
              <div>Login/ Register</div>
            </div>
          </div>
        </div>
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
