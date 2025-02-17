import { NextResponse } from 'next/server';
import { z } from 'zod';
import { reviews } from '@/data/reviews';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Schema for review validation
const reviewSchema = z.object({
  businessId: z.string(),
  rating: z.number().min(1).max(5),
  title: z.string().min(1).max(100),
  titleFA: z.string().min(1).max(100),
  content: z.string().min(10).max(1000),
  contentFA: z.string().min(10).max(1000),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const businessId = searchParams.get('businessId');
    const sort = searchParams.get('sort') || 'recent';
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');

    let filteredReviews = [...reviews];

    // Filter by business if businessId is provided
    if (businessId) {
      filteredReviews = filteredReviews.filter(
        (review) => review.businessId === businessId
      );
    }

    // Sort reviews
    filteredReviews.sort((a, b) => {
      switch (sort) {
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'recent':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedReviews = filteredReviews.slice(start, end);

    return NextResponse.json({
      reviews: paginatedReviews,
      total: filteredReviews.length,
      page,
      totalPages: Math.ceil(filteredReviews.length / limit),
    });
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const json = await request.json();
    const result = reviewSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid review data', details: result.error.format() },
        { status: 400 }
      );
    }

    const newReview = {
      id: crypto.randomUUID(),
      ...result.data,
      authorName: session.user?.name || 'Anonymous',
      authorNameFA: session.user?.name || 'Anonymous',
      date: new Date().toISOString(),
      verifiedPurchase: false, // This could be checked against orders database
      helpful: 0,
    };

    // In a real app, this would be saved to a database
    reviews.push(newReview);

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    console.log('🚀 ~ POST ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
