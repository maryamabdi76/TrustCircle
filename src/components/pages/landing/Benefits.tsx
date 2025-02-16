import { Glow, GlowArea } from '@/components/common/glow/Glow';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const Benefits = () => {
  const t = useTranslations('LandingPage');

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('benefits.title')}
        </h2>
        <GlowArea>
          <div className="grid md:grid-cols-2 gap-8">
            <Glow color="purple" className="rounded-xl">
              <Card className="bg-card shadow-md h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="text-purple-700" />
                    {t('benefits.forShoppers.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc px-5 space-y-2 text-muted-foreground">
                    <li>{t('benefits.forShoppers.items.0')}</li>
                    <li>{t('benefits.forShoppers.items.1')}</li>
                    <li>{t('benefits.forShoppers.items.2')}</li>
                  </ul>
                </CardContent>
              </Card>
            </Glow>
            <Glow color="green" className="rounded-xl">
              <Card className="bg-card shadow-md h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShieldCheck className="text-green-700" />
                    {t('benefits.forShopOwners.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc px-5 space-y-2 text-muted-foreground">
                    <li>{t('benefits.forShopOwners.items.0')}</li>
                    <li>{t('benefits.forShopOwners.items.1')}</li>
                    <li>{t('benefits.forShopOwners.items.2')}</li>
                  </ul>
                </CardContent>
              </Card>
            </Glow>
          </div>
        </GlowArea>
      </div>
    </section>
  );
};
