import { NextResponse } from 'next/server';

import { SortType } from '@/enums/sortTypes';
import { handleError } from '@/lib/server-utils';

import { ReviewService } from '../service';

export async function getReviewsHandler(request: Request) {
  const reviewService = new ReviewService();
  try {
    const url = new URL(request.url);
    const businessId = url.searchParams.get('businessId') || undefined;
    const sort = (url.searchParams.get('sort') as SortType) || SortType.RECENT;
    const page = Number(url.searchParams.get('page')) || 0;
    const size = Number(url.searchParams.get('size')) || 10;

    // Ensure sort is a valid SortType value
    const validSort = Object.values(SortType).includes(sort)
      ? sort
      : SortType.RECENT;

    const { content, total, totalPages } = await reviewService.getReviews({
      businessId,
      sort: validSort,
      page,
      size,
    });

    return NextResponse.json({ content, total, page, totalPages });
  } catch (error) {
    return handleError({ error });
  }
}
