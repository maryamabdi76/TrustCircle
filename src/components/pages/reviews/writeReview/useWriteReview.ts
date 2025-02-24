'use client';

import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';

import { PATHS } from '@/constants/PATHS';
import { useToast } from '@/hooks/use-toast';
import { useBusinesses } from '@/hooks/useBusinesses';
import { zodResolver } from '@hookform/resolvers/zod';

import type { IBusiness } from '@/interfaces/business';
import { useCreateReview } from '@/hooks/useReviews';
import { useQueryClient } from '@tanstack/react-query';
// Define review schema for validation
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(1000),
});

export function useWriteReview(businessId: string) {
  const query = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('Reviews');
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchBusinessById } = useBusinesses();
  const { mutate: createReview } = useCreateReview({
    onSuccess: () => {
      toast({
        title: t('success'),
        description: t('reviewSubmitted'),
      });
      query.invalidateQueries({
        queryKey: ['reviews'],
      });
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

  // Set up react-hook-form with Zod validation
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

  // Load business details
  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const data = await fetchBusinessById(businessId);
        if (data) {
          setBusiness(data);
        }
      } catch (error) {
        console.error('Error loading business:', error);
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
  }, [businessId, fetchBusinessById, toast, t]);

  // Form submit handler
  const onSubmit: (data: FieldValues) => Promise<void> = async (data) => {
    const { rating, title, content } = data;
    createReview({
      businessId,
      authorId: session?.user?.id || '',
      authorName: session?.user?.name || '',
      rating,
      title,
      content,
    });
  };

  return {
    business,
    content,
    control,
    errors,
    isLoading,
    isSubmitting,
    session,
    sessionStatus,
    handleSubmit: handleSubmit(onSubmit), // using react-hook-form's handleSubmit
    register,
  };
}
