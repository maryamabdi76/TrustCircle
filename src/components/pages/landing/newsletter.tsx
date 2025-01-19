import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() {
  return (
    <section className=" py-12 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-muted-foreground mb-8">
          Subscribe to our newsletter for the latest features and announcements.
        </p>
        <form className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
