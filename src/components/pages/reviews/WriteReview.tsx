'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { BusinessPreview } from '@/components/pages/business/BusinessPreview';
import { useBusinesses } from '@/hooks/useBusinesses';
import { useReviews } from '@/hooks/useReviews';
import type { IBusiness } from '@/types/business';

const ratingDescriptionKeys = {
  1: 'veryPoor',
  2: 'poor',
  3: 'average',
  4: 'great',
  5: 'excellent',
} as const;

export default function WriteReview() {
  const params = useParams<{ businessId: string }>();
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('Reviews');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { fetchBusinessById } = useBusinesses();
  const { createReview } = useReviews();

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const data = await fetchBusinessById(params.businessId);
        if (data) {
          setBusiness(data);
        }
      } catch (error) {
        console.log('🚀 ~ loadBusiness ~ error:', error);
        toast({
          title: t('error'),
          description: t('errorLoadingBusiness'),
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadBusiness();
  }, [params.businessId, fetchBusinessById, toast, t]);

  if (sessionStatus === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>{t('loading')}</span>
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
              onClick={() => router.push('/businesses')}
            >
              {t('backToBusinesses')}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: t('error'),
        description: t('pleaseSelectRating'),
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await createReview({
        businessId: params.businessId,
        rating,
        title,
        content,
      });

      if (result) {
        toast({
          title: t('success'),
          description: t('reviewSubmitted'),
        });
        router.push(`/businesses/${params.businessId}`);
      }
    } catch (error) {
      console.log('🚀 ~ handleSubmit ~ error:', error);
      toast({
        title: t('error'),
        description: t('errorSubmittingReview'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <BusinessPreview business={business} />

        <Card>
          <CardHeader>
            <CardTitle>{t('writeReview')}</CardTitle>
            <CardDescription>{t('shareYourExperience')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating Stars */}
              <div className="space-y-4">
                <label className="block text-lg font-medium text-center">
                  {t('rateExperience')}
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-2 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        className={`w-12 h-12 transition-colors ${
                          star <= (hoveredRating || rating)
                            ? 'text-primary fill-primary'
                            : 'text-gray-400 stroke-[1.5px]'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="text-center text-lg font-medium mt-2 text-primary">
                    {t(
                      `ratingDescription.${
                        ratingDescriptionKeys[
                          rating as keyof typeof ratingDescriptionKeys
                        ]
                      }`
                    )}
                  </div>
                )}
              </div>

              {/* Review Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  {t('reviewTitle')}
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('reviewTitlePlaceholder')}
                  required
                  maxLength={100}
                  className="text-lg"
                />
              </div>

              {/* Review Content */}
              <div className="space-y-2">
                <label htmlFor="content" className="block text-sm font-medium">
                  {t('reviewContent')}
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t('reviewContentPlaceholder')}
                  required
                  className="min-h-[200px] text-lg"
                  maxLength={1000}
                />
                <div className="text-sm text-muted-foreground text-right">
                  {content.length}/1000
                </div>
              </div>

              {/* {session && ( */}
              <Button
                type="submit"
                className="w-full py-6 text-lg"
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
              {/* )} */}
            </form>
          </CardContent>
        </Card>
        {!session && (
          <div className="flex items-center justify-center bg-background">
            <Card className="w-full ">
              <CardHeader className="text-center">
                <CardTitle>{t('pleaseSignIn')}</CardTitle>
                <CardDescription>{t('signInToReview')}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-center">
                <Button onClick={() => router.push('/auth/signin')}>
                  {t('signIn')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
