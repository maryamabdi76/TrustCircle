import { z } from 'zod';

export const reviewSchema = z.object({
  rating: z.number().min(1, 'Rating is required').max(5),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(1000, 'Content is too long'),
});
