'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';
import type { FetchReviewsOptions, IReview } from '@/interfaces/review';
import { SortType } from '@/enums/sortTypes';

interface UseReviewsOptions {
  businessId?: string;
}

export function useReviews({ businessId }: UseReviewsOptions = {}) {
  const { toast } = useToast();
  const t = useTranslations('Reviews');

  // Fetch reviews
  const fetchReviews = async ({
    sort = SortType.RECENT,
    page = 1,
    limit = 10,
    userId,
  }: FetchReviewsOptions = {}) => {
    const params = new URLSearchParams({
      sort,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (businessId) params.append('businessId', businessId);
    if (userId) params.append('userId', userId);

    const response = await fetch(`/api/reviews?${params}`);
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
  };

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['reviews', businessId],
    queryFn: () => fetchReviews({}),
    enabled: !!businessId, // Only fetch if businessId exists
    retry: 2, // Optional: Retry failed requests twice
  });

  // Create a review
  const createReviewMutation = useMutation({
    mutationFn: async (data: Omit<IReview, 'id' | 'date' | 'helpful'>) => {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to create review');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: t('success'), description: t('reviewCreated') });
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('errorCreatingReview'),
        variant: 'destructive',
      });
    },
  });

  // Mark review as helpful
  const markHelpfulMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      const response = await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to mark review as helpful');
      return response.json();
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('errorMarkingHelpful'),
        variant: 'destructive',
      });
    },
  });

  return {
    reviews,
    isLoading,
    createReview: createReviewMutation.mutateAsync,
    markHelpful: markHelpfulMutation.mutateAsync,
  };
}
