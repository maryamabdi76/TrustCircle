import { NextResponse } from 'next/server';

import { validateSession } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { reviewPostSchema } from '../schema';
import { ReviewService } from '../service';

export async function createReviewHandler(request: Request) {
  const reviewService = new ReviewService();
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
    const reviewData = {
      ...parsed.data,
      authorId: session.user.id,
      authorName: session.user.name || 'Anonymous',
    };
    const newReview = reviewService.createReview(reviewData, session.user);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return handleError({ error });
  }
}
