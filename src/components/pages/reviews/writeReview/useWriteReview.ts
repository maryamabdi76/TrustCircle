'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PATHS } from '@/constants/PATHS';
import { useToast } from '@/hooks/use-toast';
import { useGetBusinessById } from '@/hooks/useBusinesses';
import { useCreateReview } from '@/hooks/useReviews';
import { useReviewSchema } from '@/schemas/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

export function useWriteReview(businessId: string) {
  const t = useTranslations('Reviews');
  const router = useRouter();
  const queryClient = useQueryClient();
  const reviewSchema = useReviewSchema();
  const { toast } = useToast();
  const { data: session, status: sessionStatus } = useSession();
  const { data: business, isPending } = useGetBusinessById(businessId);

  const { mutate: createReview } = useCreateReview({
    onSuccess: () => {
      toast({ title: t('success'), description: t('reviewSubmitted') });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      queryClient.invalidateQueries({ queryKey: ['business'] });
      router.push(PATHS.BUSINESSES.DETAIL(businessId));
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('errorSubmittingReview'),
        variant: 'destructive',
      });
    },
  });

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: '',
      content: '',
    },
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = form;

  const content = watch('content', '');

  const handleSelectBusiness = (businessId: string) => {
    router.push(PATHS.REVIEWS.WRITE(businessId));
  };

  const onSubmit: (
    data: z.infer<typeof reviewSchema>
  ) => Promise<void> = async (data) => {
    createReview({
      businessId,
      authorId: session?.user?.id || '',
      authorName: session?.user?.name || '',
      ...data,
    });
  };

  return {
    business: business?.data,
    content,
    control,
    form,
    isLoading: isPending,
    isSubmitting,
    session,
    sessionStatus,
    handleSelectBusiness,
    handleSubmit: handleSubmit(onSubmit),
  };
}
