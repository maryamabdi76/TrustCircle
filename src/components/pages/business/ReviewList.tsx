'use client';

import { Flag, PenSquare, Star, ThumbsUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PATHS } from '@/constants/PATHS';
import { useGetReviews } from '@/hooks/useReviews';

interface ReviewListProps {
  businessId: string;
}

export function ReviewList({ businessId }: ReviewListProps) {
  const t = useTranslations('BusinessDetail');

  const { data: reviews, isPending } = useGetReviews({ businessId });
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

      {reviews?.data.content?.length ? (
        <div className="space-y-4">
          {reviews?.data.content.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-primary fill-primary'
                              : 'text-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-semibold">
                      {review.title}{' '}
                      {review.verifiedPurchase && (
                        <Badge variant="secondary" color="green">
                          {t('verifiedPurchase')}
                        </Badge>
                      )}
                    </h4>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 flex gap-2">
                  <span className="text-gray-500">{review.authorName}: </span>
                  <span>{review.content}</span>
                </p>
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"></div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {t('helpful')}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Flag className="w-4 h-4 mr-1" />
                      {t('report')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
