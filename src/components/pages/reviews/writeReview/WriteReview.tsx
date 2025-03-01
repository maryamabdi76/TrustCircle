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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
    form,
    isLoading,
    isSubmitting,
    session,
    sessionStatus,
    handleSelectBusiness,
    handleSubmit,
  } = useWriteReview(params.businessId);

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
            <Form {...form}>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Star Rating Field */}
                <FormField
                  control={control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <StarRating
                          disabled={!business}
                          name={field.name}
                          control={control}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.rating && t('pleaseSelectRating')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Review Title Field */}
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('reviewTitle')}</FormLabel>
                      <FormControl>
                        <Input
                          disabled={!business}
                          {...field}
                          placeholder={t('reviewTitlePlaceholder')}
                          maxLength={100}
                        />
                      </FormControl>
                      <FormMessage>
                        {errors?.title && t('titleError')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Review Content Field */}
                <FormField
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('reviewContent')}</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={!business}
                          {...field}
                          placeholder={t('reviewContentPlaceholder')}
                          maxLength={1000}
                        />
                      </FormControl>
                      <div className="text-sm text-muted-foreground text-right">
                        {content.length}/1000
                      </div>
                      <FormMessage>
                        {errors?.content && t('contentError')}
                      </FormMessage>
                    </FormItem>
                  )}
                />

                {/* Submit Button or Auth Prompt */}
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
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
