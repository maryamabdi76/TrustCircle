import { z } from 'zod';

export const reviewPostSchema = z.object({
  businessId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  content: z.string().min(10).max(1000),
});

export const reviewUpdateSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(10).max(1000).optional(),
});
