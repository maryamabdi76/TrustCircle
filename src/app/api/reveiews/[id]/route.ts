import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { reviews } from '@/data/reviews';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const reviewUpdateSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  title: z.string().min(1).max(100).optional(),
  content: z.string().min(10).max(1000).optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Await the params if necessary, here assuming `params` is available directly
    const review = reviews.find((r) => r.id === id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = reviews.find((r) => r.id === id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // Check if the user is the author of the review
    if (review.authorName !== session.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const json = await request.json();
    const result = reviewUpdateSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid review data', details: result.error.format() },
        { status: 400 }
      );
    }

    // Update review
    Object.assign(review, result.data);

    return NextResponse.json(review);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to update review' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const reviewIndex = reviews.findIndex((r) => r.id === id);

    if (reviewIndex === -1) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    const review = reviews[reviewIndex];

    // Check if the user is the author of the review
    if (review.authorName !== session.user?.name) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Remove review
    reviews.splice(reviewIndex, 1);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    );
  }
}
