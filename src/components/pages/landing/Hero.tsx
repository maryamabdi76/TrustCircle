import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export const Hero = () => {
  const t = useTranslations('LandingPage');

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <Button size="lg" className="text-lg px-8">
              {t('hero.cta')}
            </Button>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="/placeholder.svg"
              alt={t('hero.title')}
              width={550}
              height={300}
              className="rounded-lg object-cover shadow-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/20 dark:from-background dark:to-background/40" />
    </section>
  );
};
