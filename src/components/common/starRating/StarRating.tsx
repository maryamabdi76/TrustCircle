import { Star } from 'lucide-react';
import { useLocale } from 'next-intl';

export const StarRating = ({ score }: { score: number }) => {
  const locale = useLocale();
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercentage = Math.min(
            100,
            Math.max(0, (score - star + 1) * 100)
          );
          return (
            <span key={star} className="relative">
              <Star className="w-4 h-4 text-gray-400" />
              <span
                className="absolute top-0 overflow-hidden"
                style={{
                  width: `${fillPercentage}%`,
                  [locale === 'fa' ? 'right' : 'left']: 0,
                }}
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </span>
            </span>
          );
        })}
      </div>
      <span className="text-sm font-medium">{score.toFixed(1)}</span>
    </div>
  );
};
