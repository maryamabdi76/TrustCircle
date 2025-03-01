import { z } from 'zod';

export const businessSchema = z
  .object({
    name: z.string().min(1, 'Business name is required'),
    category: z.string().min(1, 'Category is required'),
    instagram: z.string().optional(),
    website: z.string().url().optional(),
  })
  .refine((data) => data.instagram || data.website, {
    message: 'Either Instagram or Website is required',
  });
