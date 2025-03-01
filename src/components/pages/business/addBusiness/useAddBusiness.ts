import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';

import { PATHS } from '@/constants/PATHS';
import { useToast } from '@/hooks/use-toast';
import { businessSchema } from '@/schemas/business';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateBusiness } from '@/hooks/useBusinesses';
import { useQueryClient } from '@tanstack/react-query';

export const useAddBusiness = () => {
  const t = useTranslations('Business');
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(businessSchema),
  });

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

  const onSubmit = async (data: FieldValues) => {
    const { name, category, instagram, websiteUrl } = data;
    createBusiness({ name, category, instagram, websiteUrl });
  };

  return {
    form,
    isSubmitting: isPending,
    onSubmit,
  };
};
