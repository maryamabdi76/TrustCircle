import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { ReviewService } from '../service';

export async function markReviewHelpfulHandler(
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

    const helpfulCount = await reviewService.markReviewAsHelpful(id);
    return NextResponse.json({ helpful: helpfulCount });
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to mark review as helpful',
      status: 500,
    });
  }
}
