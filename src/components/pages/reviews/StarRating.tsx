'use client';

import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';

interface StarRatingProps {
  name: string;
  control: Control;
}

export function StarRating({ name, control }: StarRatingProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: 0,
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const t = useTranslations('Reviews');

  const ratingDescriptionKeys = {
    1: 'veryPoor',
    2: 'poor',
    3: 'average',
    4: 'great',
    5: 'excellent',
  } as const;

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-center">
        {t('rateExperience')}
      </label>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="p-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => field.onChange(star)}
          >
            <Star
              className={`w-12 h-12 transition-all ${
                star <= (hoveredRating || field.value)
                  ? 'text-primary fill-primary'
                  : 'text-gray-400 dark:text-gray-600 stroke-[1.5px]'
              }`}
            />
          </button>
        ))}
      </div>
      {field.value > 0 && (
        <div className="text-center text-lg font-medium mt-2 text-primary">
          {t(
            `ratingDescription.${
              ratingDescriptionKeys[
                field.value as keyof typeof ratingDescriptionKeys
              ]
            }`
          )}
        </div>
      )}
    </div>
  );
}
