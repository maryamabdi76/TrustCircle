'use client';

import { Badge } from '@/components/ui/badge';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { reviews } from '@/data/reviews';

interface ReviewListProps {
  businessId: string;
}

export function ReviewList({ businessId }: ReviewListProps) {
  const t = useTranslations('BusinessDetail');
  const businessReviews = reviews.filter(
    (review) => review.businessId === businessId
  );

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

      <div className="space-y-4">
        {businessReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col  gap-2">
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
                  <h4 className="font-semibold">{review.title}</h4>
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{review.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{review.authorName}</span>
                  {review.verifiedPurchase && (
                    <Badge variant="secondary">{t('verifiedPurchase')}</Badge>
                  )}
                </div>
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
    </div>
  );
}
