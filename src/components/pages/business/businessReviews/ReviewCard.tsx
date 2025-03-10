'use client';

import { Flag, Star, ThumbsUp } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

import { ImageDialog } from '@/components/common/imageDialog/ImageDialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { isBase64Image } from '@/lib/utils';

interface ReviewCardProps {
  review: {
    id: string;
    rating: number;
    title: string;
    verifiedPurchase?: boolean;
    authorName: string;
    content: string;
    images?: string[];
    createdAt: string;
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
              {!!review.verifiedPurchase && (
                <Badge variant="secondary" color="green">
                  {t('verifiedPurchase')}
                </Badge>
              )}
            </h4>
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4" dir={locale === 'fa' ? 'rtl' : 'ltr'}>
          <span className="text-gray-500">{review.authorName}: </span>
          {review.content}
        </p>

        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-5 gap-2">
              {review.images?.slice(0, 5).map((image, index) => {
                const hasMoreImages =
                  review.images && review.images.length > 5 && index === 4;
                return (
                  <ImageDialog
                    key={index}
                    images={review.images || []}
                    initialIndex={index}
                    className={`relative aspect-square rounded-md overflow-hidden border cursor-pointer hover:opacity-90 transition-opacity ${
                      hasMoreImages ? 'relative' : ''
                    }`}
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`Review image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized={isBase64Image(image)}
                    />
                    {review.images && hasMoreImages && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-lg font-medium">
                          +{review.images.length - 4}
                        </span>
                      </div>
                    )}
                  </ImageDialog>
                );
              })}
            </div>
          </div>
        )}

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
