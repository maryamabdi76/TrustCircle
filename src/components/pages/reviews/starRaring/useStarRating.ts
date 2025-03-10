import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';

import { StarRatingProps } from './StarRating';

export function useStarRating<T extends FieldValues>({
  name,
  control,
}: StarRatingProps<T>) {
  const { field } = useController({
    name,
    control,
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

  const handleMouseEnter = (rating: number) => setHoveredRating(rating);
  const handleMouseLeave = () => setHoveredRating(0);
  const handleClick = (rating: number) => field.onChange(rating);

  const ratingText =
    field.value > 0
      ? t(
          `ratingDescription.${
            ratingDescriptionKeys[
              field.value as keyof typeof ratingDescriptionKeys
            ]
          }`
        )
      : '';

  return {
    field,
    hoveredRating,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    ratingText,
    t,
  };
}
