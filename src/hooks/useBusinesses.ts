'use client';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import { useToast } from '@/hooks/use-toast';

interface FetchBusinessesOptions {
  name?: string;
  category?: string;
  websiteOrInstagram?: string;
  rating?: number;
  sort?: 'rating' | 'name';
  page?: number;
  limit?: number;
}

export function useBusinesses() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('Business');

  const fetchBusinesses = useCallback(
    async ({
      name,
      category,
      websiteOrInstagram,
      rating,
      sort = 'rating',
      page = 1,
      limit = 10,
    }: FetchBusinessesOptions = {}) => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          sort,
          page: page.toString(),
          limit: limit.toString(),
        });

        if (name) {
          params.append('search', name);
        }

        if (websiteOrInstagram) {
          params.append('websiteOrInstagram', websiteOrInstagram);
        }

        if (category) {
          params.append('category', category);
        }

        if (rating) {
          params.append('rating', rating.toString());
        }

        const response = await fetch(`/api/businesses?${params}`);

        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }

        return await response.json();
      } catch (error) {
        console.log('🚀 ~ useBusinesses ~ error:', error);
        toast({
          title: t('error'),
          description: t('errorFetchingBusinesses'),
          variant: 'destructive',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast, t]
  );

  const fetchBusinessById = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const response = await fetch(`/api/businesses/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch business');
        }

        return await response.json();
      } catch (error) {
        console.log('🚀 ~ error:', error);
        toast({
          title: t('error'),
          description: t('errorFetchingBusiness'),
          variant: 'destructive',
        });
        return null;
      } finally {
        setLoading(false);
      }
    },
    [toast, t]
  );

  return {
    loading,
    fetchBusinesses,
    fetchBusinessById,
  };
}
