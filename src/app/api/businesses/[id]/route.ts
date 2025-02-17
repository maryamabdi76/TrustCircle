import { NextResponse } from 'next/server';
import { businesses } from '@/data/businesses';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const business = businesses.find((b) => b.id === params.id);

    if (!business) {
      return NextResponse.json(
        { error: 'Business not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(business);
  } catch (error) {
    console.log('🚀 ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    );
  }
}
