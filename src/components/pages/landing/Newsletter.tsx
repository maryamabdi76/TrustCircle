import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

export const Newsletter = () => {
  const t = useTranslations('LandingPage');

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="text-muted-foreground mb-8">
            {t('newsletter.subtitle')}
          </p>
          <form className="flex gap-2">
            <Input
              type="email"
              placeholder={t('newsletter.placeholder')}
              className="grow"
            />
            <Button type="submit">{t('newsletter.button')}</Button>
          </form>
        </div>
      </div>
    </section>
  );
};
