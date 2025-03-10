import { NextResponse } from 'next/server';

import { validateSession } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { reviews } from '../data';
import { ReviewService } from '../service';

export async function updateReviewHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const reviewService = new ReviewService(reviews);
  try {
    const { id } = await context.params;
    const session = await validateSession();
    const review = reviewService.getReviewById(id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (review.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const json = await request.json();
    const updatedReview = reviewService.updateReview(id, json);

    if (!updatedReview) {
      return NextResponse.json(
        { error: 'Invalid review data' },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedReview);
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to update review',
      status: 500,
    });
  }
}
