'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';

import { PATHS } from '@/constants/PATHS';
import { useToast } from '@/hooks/use-toast';
import { useGetBusinessById } from '@/hooks/useBusinesses';
import { useCreateReview } from '@/hooks/useReviews';
import { reviewSchema } from '@/schemas/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

export function useWriteReview(businessId: string) {
  const t = useTranslations('Reviews');
  const router = useRouter();
  const queryClient = useQueryClient();
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

  const {
    control,
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm({
    resolver: zodResolver(reviewSchema),
  });

  const content = watch('content', '');

  const onSubmit: (data: FieldValues) => Promise<void> = async (data) => {
    const { rating, title, content } = data;
    createReview({
      businessId,
      authorId: session?.user?.id || '',
      authorName: session?.user?.name || '',
      rating,
      title,
      content,
      ...data,
    });
  };

  return {
    business: business?.data,
    content,
    control,
    errors,
    isLoading: isPending,
    isSubmitting,
    session,
    sessionStatus,
    handleSubmit: handleSubmit(onSubmit),
    register,
  };
}
