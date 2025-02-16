import { Glow, GlowArea } from '@/components/common/glow/Glow';
import { Star, Users, ShoppingBag, Zap } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Authentic Reviews',
    description: 'Real feedback from verified customers',
  },
  {
    icon: ShoppingBag,
    title: 'Shop Ratings',
    description: 'Comprehensive ratings for informed decisions',
  },
  {
    icon: Users,
    title: 'Community Feedback',
    description: 'Engage with a community of shoppers',
  },
  {
    icon: Zap,
    title: 'Enhance Shopping Experience',
    description: 'Make better choices with trusted insights',
  },
];

export const Features = () => {
  return (
    <section className="px-4 py-12 md:py-24 bg-muted dark:bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        Key Features
      </h2>
      <GlowArea>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Glow
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md"
            >
              <feature.icon className="h-12 w-12 mb-4 text-primary dark:text-primary-light" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Glow>
          ))}
        </div>
      </GlowArea>
    </section>
  );
};
