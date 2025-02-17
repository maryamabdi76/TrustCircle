'use client';

import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

interface RatingDistributionProps {
  ratings: {
    [key: number]: number;
  };
}

export function RatingDistribution({ ratings }: RatingDistributionProps) {
  const totalRatings = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = ratings[rating] || 0;
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;

        return (
          <div key={rating} className="flex items-center gap-4">
            <div className="flex items-center gap-1 w-20">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span>{rating}</span>
            </div>
            <Progress value={percentage} className="flex-1" />
            <div className="w-16 text-right text-sm text-muted-foreground">
              {percentage.toFixed(0)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
