'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Glow, GlowArea } from '@/components/common/glow/Glow';
function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => {
    const radius = 200 + i * 5; // Adjust radius for each path

    return {
      id: i,
      d: `M ${350 - radius * position} 200
          A ${radius} ${radius} 0 1 1 ${350 + radius * position} 200
          A ${radius} ${radius} 0 1 1 ${350 - radius * position} 200`,
      color: `rgba(15,23,42,${0.1 + i * 0.03})`,
      width: 0.5 + i * 0.03,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-slate-950 dark:text-white"
        viewBox="0 0 700 400"
        fill="none"
      >
        <title>Floating Circles</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 0.7,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 30 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'linear',
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
        <FloatingPaths position={1} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <GlowArea className="lg:w-1/2 shadow-2xl bg-muted/50">
            <Glow className="p-4 rounded-sm flex flex-col gap-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                {t('hero.title')}
              </h1>
              <p className="text-xl text-muted-foreground">
                {t('hero.subtitle')}
              </p>
              <Button size="lg" className="text-lg px-8 w-fit">
                {t('hero.cta')}
              </Button>
            </Glow>
          </GlowArea>
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
