import { NextResponse } from 'next/server';

import { validateSession } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { reviews } from '../data';
import { reviewPostSchema } from '../schema';
import { ReviewService } from '../service';

export async function createReviewHandler(request: Request) {
  const reviewService = new ReviewService(reviews);
  try {
    const session = await validateSession();
    const json = await request.json();
    const parsed = reviewPostSchema.safeParse(json);
    if (!parsed.success) {
      return handleError({
        message: 'Invalid review data',
        details: parsed.error.format(),
        status: 400,
      });
    }
    const newReview = reviewService.createReview(parsed.data, session.user);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return handleError({ error });
  }
}
