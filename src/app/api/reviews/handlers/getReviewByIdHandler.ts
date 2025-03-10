import { NextResponse } from 'next/server';

import { handleError } from '@/lib/server-utils';

import { ReviewService } from '../service';

export async function getReviewByIdHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const reviewService = new ReviewService();
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
