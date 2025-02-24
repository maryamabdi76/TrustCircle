import { NextResponse } from 'next/server';

import { handleError } from '@/lib/utils';

import { reviews } from '../data';
import { ReviewService } from '../service';

export async function getReviewByIdHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const reviewService = new ReviewService(reviews);
  try {
    const { id } = await context.params;
    const review = reviewService.getReviewById(id);

    if (!review) {
      return handleError({ error: 'Review not found', status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to fetch review',
      status: 500,
    });
  }
}
