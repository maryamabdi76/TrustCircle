import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Control, useController } from 'react-hook-form';

interface UseStarRatingProps {
  name: string;
  control: Control;
}

export function useStarRating({ name, control }: UseStarRatingProps) {
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
