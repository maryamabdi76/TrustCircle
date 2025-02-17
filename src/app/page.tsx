import {
  Hero,
  Features,
  Testimonials,
  Cta,
  Benefits,
  Statistics,
  Newsletter,
} from '../components/pages/landing';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <Testimonials />
      <Cta />
      <Benefits />
      <Statistics />
      <Newsletter />
    </div>
  );
}
