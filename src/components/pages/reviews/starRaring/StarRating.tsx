'use client';

import clsx from 'clsx';
import { Star } from 'lucide-react';
import { Control, FieldValues, Path } from 'react-hook-form';

import { useStarRating } from './useStarRating';

export interface StarRatingProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  disabled?: boolean;
}

export function StarRating<T extends FieldValues>({
  name,
  control,
  disabled,
}: StarRatingProps<T>) {
  const {
    field,
    hoveredRating,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    ratingText,
    t,
  } = useStarRating({ name, control });

  return (
    <div className="space-y-4">
      <label className="block text-lg font-medium text-center">
        {t('rateExperience')}
      </label>
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            title="star"
            type="button"
            disabled={disabled}
            className={clsx(
              'p-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer'
            )}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
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
          {ratingText}
        </div>
      )}
    </div>
  );
}
