import { Button } from '@/components/ui/button';

export default function CTA() {
  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-24">
      <div className=" text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join TrustCircle?</h2>
        <p className="text-xl mb-8">
          Start reviewing and discovering trustworthy shops today!
        </p>
        <Button size="lg" variant="secondary">
          Join TrustCircle
        </Button>
      </div>
    </section>
  );
}
