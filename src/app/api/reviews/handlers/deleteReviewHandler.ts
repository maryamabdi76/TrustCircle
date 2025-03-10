import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { ReviewService } from '../service';

export async function deleteReviewHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const reviewService = new ReviewService();
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return handleError({ message: 'Unauthorized', status: 401 });
    }

    const review = await reviewService.getReviewById(id);
    if (!review) {
      return handleError({ error: 'Review not found', status: 404 });
    }

    if (review.authorName !== session.user?.name) {
      return handleError({ message: 'Unauthorized', status: 403 });
    }

    reviewService.deleteReview(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to delete review',
      status: 500,
    });
  }
}
