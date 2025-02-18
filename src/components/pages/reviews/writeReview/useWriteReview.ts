'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';
import { useBusinesses } from '@/hooks/useBusinesses';
import { useReviews } from '@/hooks/useReviews';
import { z } from 'zod';
import type { IBusiness } from '@/types/business';

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(1000),
});

export function useWriteReview(businessId: string) {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations('Reviews');
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [business, setBusiness] = useState<IBusiness | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<z.ZodIssue[]>([]);

  const { fetchBusinessById } = useBusinesses();
  const { createReview } = useReviews();

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

  const validateForm = () => {
    const result = reviewSchema.safeParse({ rating, title, content });
    if (!result.success) {
      setErrors(result.error.issues);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await createReview({
        businessId,
        authorId: session?.user?.id || '',
        authorNameFA: session?.user?.name || '',
        rating,
        title,
        titleFA: title,
        content,
        contentFA: content,
      });

      if (result) {
        toast({
          title: t('success'),
          description: t('reviewSubmitted'),
        });
        router.push(`/businesses/${businessId}`);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: t('error'),
        description: t('errorSubmittingReview'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    session,
    sessionStatus,
    rating,
    setRating,
    title,
    setTitle,
    content,
    setContent,
    isSubmitting,
    business,
    isLoading,
    errors,
    handleSubmit,
  };
}
