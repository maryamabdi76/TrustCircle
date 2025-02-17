'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

function FloatingCirclePaths() {
  const circles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    radius: 80 + i * 80, // Increasing radius for each circle
    color: `rgba(15,23,42,${0.1 + i * 0.02})`,
    width: 0.5 + i * 0.1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="-600 -600 1200 1200"
        fill="none"
      >
        <title>Background Circle Paths</title>
        {circles.map((circle) => (
          <motion.circle
            key={circle.id}
            cx="0"
            cy="0"
            r={circle.radius}
            stroke="currentColor"
            strokeWidth={circle.width}
            strokeOpacity={0.1 + circle.id * 0.02}
            fill="none"
            initial={{ pathLength: 0, rotate: 0 }}
            animate={{
              pathLength: [0, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
              delay: circle.id * 0.05,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export const Hero = () => {
  const t = useTranslations('LandingPage');

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-background">
      <div className="absolute inset-0">
        <FloatingCirclePaths />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2 shadow-2xl bg-muted/50">
            <div className="p-8 rounded-sm flex flex-col gap-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('hero.subtitle')}
              </p>
              <Button size="lg" className="text-lg px-8 w-fit">
                {t('hero.cta')}
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mx-auto flex items-center justify-center">
            <Image
              src="/placeholder.svg"
              alt={t('hero.title')}
              width={470}
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
