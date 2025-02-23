import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { SortType } from '@/enums/sortTypes';
import { authOptions } from '@/lib/auth';

import { reviewPostSchema } from './schema';
import {
  createReview,
  deleteReview,
  getReviewById,
  getReviews,
  markReviewAsHelpful,
  updateReview,
} from './service';

/**
 * GET handler for fetching a list of reviews with pagination and sorting.
 *
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response containing the reviews, pagination, and sorting information.
 */
export async function getReviewsHandler(request: Request) {
  try {
    const url = new URL(request.url);
    const businessId = url.searchParams.get('businessId');
    const sort = url.searchParams.get('sort') || SortType.RECENT;
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    // Ensure sort is a valid SortType value
    const validSort = Object.values(SortType).includes(sort as SortType)
      ? (sort as SortType)
      : SortType.RECENT; // Fallback to SortType.RECENT if invalid

    const { reviews, total, totalPages } = getReviews({
      businessId,
      sort: validSort,
      page,
      limit,
    });

    return NextResponse.json({ reviews, total, page, totalPages });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new review.
 *
 * @param {Request} request - The incoming request object.
 * @returns {NextResponse} - The response containing the newly created review.
 */
export async function createReviewHandler(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const parsed = reviewPostSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid review data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const newReview = createReview(parsed.data, session.user);
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}

/**
 * GET handler for fetching a review by its ID.
 *
 * @param {Request} request - The incoming request object.
 * @param {object} context - The route parameters context.
 * @returns {NextResponse} - The response with review data or an error message.
 */
export async function getReviewByIdHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const review = getReviewById(id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review); // Return the review if found
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

export async function updateReviewHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = getReviewById(id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (review.authorName !== session.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const json = await request.json();
    const updatedReview = updateReview(id, json);

    if (!updatedReview) {
      return NextResponse.json(
        { error: 'Invalid review data' },
        { status: 400 }
      );
    }

    return NextResponse.json(updatedReview); // Return the updated review
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

export async function deleteReviewHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = getReviewById(id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    if (review.authorName !== session.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    deleteReview(id);
    return NextResponse.json({ success: true }); // Return success after deletion
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}

export async function markReviewHelpfulHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = getReviewById(id);
    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const helpfulCount = markReviewAsHelpful(id);
    return NextResponse.json({ helpful: helpfulCount }); // Return the updated helpful count
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to mark review as helpful' },
      { status: 500 }
    );
  }
}
