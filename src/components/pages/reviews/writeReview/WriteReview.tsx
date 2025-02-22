'use client';

import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';

import { BusinessPreview } from '@/components/pages/business/BusinessPreview';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { PATHS } from '@/constants/PATHS';

import { StarRating } from '../StarRating';
import { useWriteReview } from './useWriteReview';

export default function WriteReview() {
  const params = useParams<{ businessId: string }>();
  const router = useRouter();
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
    handleSubmit,
    register,
  } = useWriteReview(params.businessId);

  if (sessionStatus === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Business Preview Skeleton */}
          <Card className="overflow-hidden shadow-lg">
            <CardContent className="p-6 space-y-8">
              <div className="flex items-start gap-6">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-grow min-w-0">
                  <Skeleton className="h-8 w-full" />
                  <div className="flex items-center gap-2 my-3">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                  <div className="flex items-center gap-4 my-3">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Skeleton */}
          <Card className="overflow-hidden shadow-lg">
            <CardHeader>
              <Skeleton className="h-8 w-3/4 mb-2" /> {/* Title Skeleton */}
              <Skeleton className="h-4 w-1/2" /> {/* Description Skeleton */}
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Skeleton key={star} className="w-12 h-12 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-10 w-full" /> {/* Title Input Skeleton */}
              <Skeleton className="h-40 w-full" />{' '}
              {/* Content Textarea Skeleton */}
              <Skeleton className="h-12 w-full" />{' '}
              {/* Submit Button Skeleton */}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>{t('businessNotFound')}</CardTitle>
            <CardDescription>
              {t('businessNotFoundDescription')}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => router.push(PATHS.BUSINESSES.ROOT)}
            >
              {t('backToBusinesses')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <BusinessPreview business={business} />

        <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
            <CardTitle className="text-2xl">{t('writeReview')}</CardTitle>
            <CardDescription>{t('shareYourExperience')}</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              <StarRating name="rating" control={control} />
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
                  id="title"
                  {...register('title')}
                  placeholder={t('reviewTitlePlaceholder')}
                  maxLength={100}
                  className="text-lg transition-all focus:ring-2 focus:ring-primary"
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
                  id="content"
                  {...register('content')}
                  placeholder={t('reviewContentPlaceholder')}
                  className="min-h-[200px] text-lg transition-all focus:ring-2 focus:ring-primary"
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
                  className="w-full py-6 text-lg bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t('submitting')}
                    </div>
                  ) : (
                    t('submitReview')
                  )}
                </Button>
              ) : (
                <div className="bg-muted p-4 rounded-lg">
                  <CardTitle className="text-center mb-2">
                    {t('pleaseSignIn')}
                  </CardTitle>
                  <CardDescription className="text-center mb-4">
                    {t('signInToReview')}
                  </CardDescription>
                  <Button
                    onClick={() => router.push(PATHS.SIGNIN.ROOT)}
                    className="w-full"
                  >
                    {t('signIn')}
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
