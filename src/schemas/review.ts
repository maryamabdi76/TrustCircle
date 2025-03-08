import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useReviewSchema = () => {
  const t = useTranslations('Reviews');

  return z.object({
    rating: z
      .number()
      .min(1, { message: t('pleaseSelectRating') })
      .max(5),
    title: z
      .string()
      .min(1, { message: t('titleError') })
      .max(100, { message: t('titleError') }),
    content: z
      .string()
      .min(10, { message: t('contentError') })
      .max(1000, { message: t('contentError') }),
    images: z
      .array(z.string())
      .max(5, t('maxImagesAllowed'))
      .optional()
      .default([]),
  });
};
