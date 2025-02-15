import { Glow, GlowArea } from '@/components/common/glow/Glow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ShieldCheck } from 'lucide-react';

export const Benefits = () => {
  return (
    <section className="px-4 py-12 md:py-24 bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Benefits for Everyone
      </h2>
      <GlowArea>
        <div className="grid md:grid-cols-2 gap-8">
          <Glow color="red" className="rounded-xl">
            <Card className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <Search className="mr-2" /> For Shoppers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
                  <li>Find trustworthy stores easily</li>
                  <li>Make informed decisions based on real experiences</li>
                  <li>Discover new shops with confidence</li>
                </ul>
              </CardContent>
            </Card>
          </Glow>
          <Glow color="blue" className="rounded-xl">
            <Card className="bg-white dark:bg-gray-800 shadow-md dark:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900 dark:text-white">
                  <ShieldCheck className="mr-2" /> For Shop Owners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-gray-200">
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
};
