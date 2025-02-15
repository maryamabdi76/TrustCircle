import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import type { IBusiness } from '@/types/business';

// This would typically come from an API or database
const businesses: IBusiness[] = [
  {
    id: '1',
    name: 'Acme Corp',
    websiteUrl: '123 Main St',
    instagram: '@acmecorp',
    score: 4.5,
    category: 'Technology',
    description:
      'A leading technology company specializing in innovative solutions.',
  },
  // Add more businesses here
];

export default function BusinessDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const business = businesses.find((b) => b.id === params.id);

  if (!business) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{business.name}</h1>
      <div className="flex items-center mb-4">
        <Star className="w-6 h-6 text-yellow-400 mr-2" />
        <span className="text-xl">{business.score.toFixed(1)}</span>
      </div>
      <p className="mb-4">{business.websiteUrl || business.instagram}</p>
      <p className="mb-4">{business.description}</p>
      <Button>Add Review</Button>
    </div>
  );
}
