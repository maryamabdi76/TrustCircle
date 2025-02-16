import { Button } from '@/components/ui/button';

export const CTA = () => {
  return (
    <section className="bg-muted dark:bg-gray-800 text-gray-900 dark:text-white py-12 md:py-24">
      <div className="max-w-3xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Join TrustCircle?
        </h2>
        <p className="text-lg md:text-xl mb-8 text-gray-900 dark:text-white">
          Start reviewing and discovering trustworthy shops today!
        </p>
        <Button size="lg" className="px-8 py-3 text-lg">
          Join TrustCircle
        </Button>
      </div>
    </section>
  );
};
