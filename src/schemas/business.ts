import { useTranslations } from 'next-intl';
import { z } from 'zod';

export const useBusinessSchema = () => {
  const t = useTranslations('Business');

  return z
    .object({
      name: z.string().min(1, { message: t('nameRequired') }),
      category: z.string().min(1, { message: t('categoryRequired') }),
      instagram: z.string().optional(),
      websiteUrl: z
        .string()
        .optional()
        .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
          message: t('websiteInvalid'),
        }),
    })
    .superRefine((data, ctx) => {
      if (!data.instagram && !data.websiteUrl) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['instagram'],
          message: t('requireOneContact'),
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['websiteUrl'],
          message: t('requireOneContact'),
        });
      }
    });
};
