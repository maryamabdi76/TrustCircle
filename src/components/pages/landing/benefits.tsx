import { Glow, GlowArea } from '@/components/glow/glow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ShieldCheck } from 'lucide-react';

export default function Benefits() {
  return (
    <section className=" py-12 md:py-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        Benefits for Everyone
      </h2>
      <GlowArea>
        <div className="grid md:grid-cols-2 gap-8">
          <Glow color="red">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="mr-2" /> For Shoppers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Find trustworthy stores easily</li>
                  <li>Make informed decisions based on real experiences</li>
                  <li>Discover new shops with confidence</li>
                </ul>
              </CardContent>
            </Card>
          </Glow>
          <Glow color="blue">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldCheck className="mr-2" /> For Shop Owners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Build customer trust through authentic reviews</li>
                  <li>Improve your services based on genuine feedback</li>
                  <li>Increase visibility among potential customers</li>
                </ul>
              </CardContent>
            </Card>
          </Glow>
        </div>
      </GlowArea>
    </section>
  );
}
