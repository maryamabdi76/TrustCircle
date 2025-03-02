'use client';

import { PenSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PATHS } from '@/constants/PATHS';
import { useGetReviews } from '@/hooks/useReviews';

import { ReviewCard } from './ReviewCard';
import { ReviewCardSkeleton } from './ReviewCardSkeleton';

interface ReviewListProps {
  businessId: string;
}

export function ReviewList({ businessId }: ReviewListProps) {
  const t = useTranslations('BusinessDetail');

  const { data, isPending } = useGetReviews({ businessId });
  const reviews = data?.data.content ?? [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{t('reviews')}</h3>
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('sortBy')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">
              {t('sortOptions.mostRecent')}
            </SelectItem>
            <SelectItem value="highest">
              {t('sortOptions.highestRated')}
            </SelectItem>
            <SelectItem value="lowest">
              {t('sortOptions.lowestRated')}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReviewCardSkeleton key={i} />
          ))}
        </div>
      ) : reviews.length ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-lg mb-4 text-center">{t('noReviews')}</p>
            <Button asChild>
              <Link href={PATHS.REVIEWS.WRITE(businessId)}>
                <PenSquare className="w-4 h-4 mr-2" />
                {t('beFirstToReview')}
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
