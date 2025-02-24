'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { PATHS } from '@/constants/PATHS';
import { useToast } from '@/hooks/use-toast';
import { useGetBusinessById } from '@/hooks/useBusinesses';
import { useCreateReview } from '@/hooks/useReviews';
import { ReviewSchema, reviewSchema } from '@/schemas/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

export function useWriteReview(businessId: string) {
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('Reviews');
  const { data: business, isPending } = useGetBusinessById(businessId);

  const { mutate: createReview } = useCreateReview({
    onSuccess: () => {
      toast({ title: t('success'), description: t('reviewSubmitted') });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
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
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
  });

  const content = watch('content', '');

  const onSubmit = (data: ReviewSchema) => {
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
    errors,
    isLoading: isPending,
    isSubmitting,
    session,
    sessionStatus,
    handleSubmit: handleSubmit(onSubmit),
    register,
  };
}
