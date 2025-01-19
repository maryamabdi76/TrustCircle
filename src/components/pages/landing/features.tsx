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

export default function Features() {
  return (
    <section className=" py-12 md:py-24">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <feature.icon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
