'use client';

import type { IReview } from '@/types/review';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

interface UseReviewsOptions {
  businessId?: string;
}

interface FetchReviewsOptions {
  sort?: 'recent' | 'highest' | 'lowest';
  page?: number;
  limit?: number;
  userId?: string;
}

export function useReviews({ businessId }: UseReviewsOptions = {}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('Reviews');

  const fetchReviews = useCallback(
    async ({
      sort = 'recent',
      page = 1,
      limit = 10,
      userId,
    }: FetchReviewsOptions = {}) => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          sort,
          page: page.toString(),
          limit: limit.toString(),
        });

        if (businessId) {
          params.append('businessId', businessId);
        }

        if (userId) {
          params.append('userId', userId);
        }

        const response = await fetch(`/api/reviews?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }

        return await response.json();
      } catch (error) {
        console.log('🚀 ~ useReviews ~ error:', error);
        toast({
          title: t('error'),
          description: t('errorFetchingReviews'),
          variant: 'destructive',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [businessId, toast, t]
  );

  const createReview = useCallback(
    async (data: Omit<IReview, 'id' | 'date' | 'helpful'>) => {
      try {
        setLoading(true);
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to create review');
        }

        toast({
          title: t('success'),
          description: t('reviewCreated'),
        });

        return await response.json();
      } catch (error) {
        console.log('🚀 ~ error:', error);
        toast({
          title: t('error'),
          description: t('errorCreatingReview'),
          variant: 'destructive',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast, t]
  );

  const markHelpful = useCallback(
    async (reviewId: string) => {
      try {
        const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
          method: 'POST',
        });

        if (!response.ok) {
          throw new Error('Failed to mark review as helpful');
        }

        return await response.json();
      } catch (error) {
        console.log('🚀 ~ error:', error);
        toast({
          title: t('error'),
          description: t('errorMarkingHelpful'),
          variant: 'destructive',
        });
        return null;
      }
    },
    [toast, t]
  );

  return {
    loading,
    fetchReviews,
    createReview,
    markHelpful,
  };
}
