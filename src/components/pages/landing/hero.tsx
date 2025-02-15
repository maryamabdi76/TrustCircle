import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-24 bg-white dark:bg-gray-900">
      <div className="md:w-1/2 space-y-4 px-8">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-gray-900 dark:text-white">
          Build Trust with Authentic Shop Reviews
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          TrustCircle empowers shoppers with genuine reviews and helps
          businesses build credibility.
        </p>
        <Button size="lg">Get Started</Button>
      </div>
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          src="/placeholder.svg"
          alt="Happy customers in a shop"
          width={600}
          height={400}
          className="rounded-lg object-cover dark:brightness-90"
        />
      </div>
    </section>
  );
};
