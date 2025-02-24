'use client';

import { Flag, Star, ThumbsUp } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    title: string;
    verifiedPurchase?: boolean;
    date: string;
    authorName: string;
    content: string;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const t = useTranslations('BusinessDetail');
  const locale = useLocale();

  return (
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
        <p className="mb-4" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
          <span className="text-gray-500">{review.authorName}: </span>
          {review.content}
        </p>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
  );
}
