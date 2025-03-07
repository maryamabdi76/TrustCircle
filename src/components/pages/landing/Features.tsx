import { ShoppingBag, Star, Users, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Glow, GlowArea } from '@/components/common/glow/Glow';

const featureIcons = {
  authenticReviews: Star,
  shopRatings: ShoppingBag,
  communityFeedback: Users,
  enhanceShopping: Zap,
};

export const Features = () => {
  const t = useTranslations('LandingPage');

  const features = [
    {
      id: 'authenticReviews',
      color: 'yellow',
      iconColor: 'text-yellow-400',
    },
    {
      id: 'shopRatings',
      color: 'blue',
      iconColor: 'text-blue-400',
    },
    {
      id: 'communityFeedback',
      color: 'green',
      iconColor: 'text-green-400',
    },
    {
      id: 'enhanceShopping',
      color: 'purple',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('features.title')}
        </h2>
        <GlowArea>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon =
                featureIcons[feature.id as keyof typeof featureIcons];
              return (
                <Glow
                  key={feature.id}
                  color={feature.color}
                  className="flex flex-col items-center text-center p-6 bg-card rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <Icon className={`h-12 w-12 mb-4 ${feature.iconColor}`} />
                  <h3 className="text-xl font-semibold mb-2">
                    {t(`features.${feature.id}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`features.${feature.id}.description`)}
                  </p>
                </Glow>
              );
            })}
          </div>
        </GlowArea>
      </div>
    </section>
  );
};
