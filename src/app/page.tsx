import {
  Hero,
  Features,
  Testimonials,
  CTA,
  Benefits,
  Statistics,
  Newsletter,
} from '../components/pages/landing';

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
