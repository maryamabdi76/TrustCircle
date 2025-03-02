import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { PATHS } from '@/constants/PATHS';
import { categories } from '@/data/categories';
import { useToast } from '@/hooks/use-toast';
import { useCreateBusiness } from '@/hooks/useBusinesses';
import { useBusinessSchema } from '@/schemas/business';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

export const useAddBusiness = () => {
  const t = useTranslations('Business');
  const router = useRouter();
  const businessSchema = useBusinessSchema();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { data: session, status: sessionStatus } = useSession();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search query to optimize API calls
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const filteredCategories = useMemo(() => {
    if (!debouncedSearch) return categories;
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.nameFA.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [debouncedSearch, searchQuery]);

  const form = useForm<z.infer<typeof businessSchema>>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: '',
      category: '',
      instagram: '',
      websiteUrl: '',
    },
  });

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = form;

  const { mutate: createBusiness, isPending } = useCreateBusiness({
    onSuccess: (result) => {
      toast({ title: t('success'), description: t('businessAdded') });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      const returnUrl = searchParams.get('returnUrl')
        ? PATHS.REVIEWS.WRITE(result.data.id)
        : PATHS.BUSINESSES.DETAIL(result.data.id);

      router.push(returnUrl);
    },
    onError: () => {
      toast({
        title: t('error'),
        description: t('errorAddingBusiness'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = async (data: z.infer<typeof businessSchema>) => {
    const { name, category, instagram, websiteUrl } = data;
    createBusiness({ name, category, instagram, websiteUrl });
  };

  return {
    control,
    filteredCategories,
    form,
    isSubmitting: isSubmitting || isPending,
    session,
    sessionStatus,
    searchQuery,
    handleSubmit: handleSubmit(onSubmit),
    setSearchQuery,
  };
};
