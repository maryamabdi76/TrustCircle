import Benefits from '@/components/pages/landing/benefits';
import CTA from '@/components/pages/landing/cta';
import Features from '@/components/pages/landing/features';
import Hero from '@/components/pages/landing/hero';
import Newsletter from '@/components/pages/landing/newsletter';
import Statistics from '@/components/pages/landing/statistics';
import Testimonials from '@/components/pages/landing/testimonials';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
        <Benefits />
        <Statistics />
        <Newsletter />
      </main>
    </div>
  );
}
