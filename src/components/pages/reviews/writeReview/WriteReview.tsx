'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { BusinessPreview } from '@/components/pages/business/BusinessPreview';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { StarRating } from '../starRaring/StarRating';
import { ReviewAuth } from './ReviewAuth';
import { useWriteReview } from './useWriteReview';
import { WriteReviewSkeleton } from './WriteReviewSkeleton';
import { BusinessSelect } from '@/components/common/businessSelect/BusinessSelect ';

export default function WriteReview() {
  const params = useParams<{ businessId: string }>();
  const t = useTranslations('Reviews');
  const {
    business,
    content,
    control,
    errors,
    isLoading,
    isSubmitting,
    session,
    sessionStatus,
    handleSelectBusiness,
    handleSubmit,
    register,
  } = useWriteReview(params.businessId);
  console.log('🚀 ~ WriteReview ~ errors:', errors);

  if (sessionStatus === 'loading' || isLoading) return <WriteReviewSkeleton />;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {business ? (
          <BusinessPreview business={business} />
        ) : (
          <div className="flex flex-col gap-2">
            <BusinessSelect onSelect={handleSelectBusiness} />
            {!business && (
              <p className="text-sm text-destructive">
                {t('pleaseSelectBusiness')}
              </p>
            )}
          </div>
        )}

        <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <CardTitle className="text-2xl">{t('writeReview')}</CardTitle>
            <CardDescription>{t('shareYourExperience')}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <StarRating
                disabled={!business}
                name="rating"
                control={control}
              />
              {errors?.rating && (
                <p className="text-sm text-destructive">
                  {t('pleaseSelectRating')}
                </p>
              )}

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  {t('reviewTitle')}
                </label>
                <Input
                  disabled={!business}
                  id="title"
                  {...register('title')}
                  placeholder={t('reviewTitlePlaceholder')}
                  maxLength={100}
                />
                {errors?.title && (
                  <p className="text-sm text-destructive">{t('titleError')}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-medium">
                  {t('reviewContent')}
                </label>
                <Textarea
                  disabled={!business}
                  id="content"
                  {...register('content')}
                  placeholder={t('reviewContentPlaceholder')}
                  maxLength={1000}
                />
                <div className="text-sm text-muted-foreground text-right">
                  {content.length}/1000
                </div>
                {errors?.content && (
                  <p className="text-sm text-destructive">
                    {t('contentError')}
                  </p>
                )}
              </div>

              {session ? (
                <Button
                  type="submit"
                  className="w-full py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    t('submitReview')
                  )}
                </Button>
              ) : (
                <ReviewAuth />
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
