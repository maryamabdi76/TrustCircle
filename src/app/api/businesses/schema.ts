import { z } from 'zod';

export const businessSchema = z
  .object({
    name: z.string().min(1, 'Business name is required'),
    category: z.string().min(1, 'Category is required'),
    instagram: z.string().optional(),
    websiteUrl: z
      .string()
      .optional()
      .refine((val) => !val || /^https?:\/\/[^\s$.?#].[^\s]*$/.test(val), {
        message: 'Invalid website URL',
      }),
  })
  .superRefine((data, ctx) => {
    if (!data.instagram && !data.websiteUrl) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['instagram'],
        message: 'Require at least one contact',
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['websiteUrl'],
        message: 'Require at least one contact',
      });
    }
  });

export type BusinessSchema = z.infer<typeof businessSchema>;
