import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

export const Cta = () => {
  const t = useTranslations('LandingPage');

  return (
    <section className="bg-primary text-primary-foreground py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg sm:text-xl mb-8 text-primary-foreground/80">
            {t('cta.subtitle')}
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
            {t('cta.button')}
          </Button>
        </div>
      </div>
    </section>
  );
};
