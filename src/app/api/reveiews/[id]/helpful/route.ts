import { NextResponse } from 'next/server';
import { reviews } from '@/data/reviews';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const review = reviews.find((r) => r.id === params.id);

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    // In a real app, we would track which users have marked which reviews as helpful
    review.helpful = (review.helpful || 0) + 1;

    return NextResponse.json({ helpful: review.helpful });
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to mark review as helpful' },
      { status: 500 }
    );
  }
}
