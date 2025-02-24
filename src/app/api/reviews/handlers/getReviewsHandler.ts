import { NextResponse } from 'next/server';

import { SortType } from '@/enums/sortTypes';
import { handleError } from '@/lib/utils';

import { reviews } from '../data';
import { ReviewService } from '../service';

export async function getReviewsHandler(request: Request) {
  const reviewService = new ReviewService(reviews);
  try {
    const url = new URL(request.url);
    const businessId = url.searchParams.get('businessId');
    const sort = (url.searchParams.get('sort') as SortType) || SortType.RECENT;
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;

    // Ensure sort is a valid SortType value
    const validSort = Object.values(SortType).includes(sort)
      ? sort
      : SortType.RECENT;

    const { content, total, totalPages } = reviewService.getReviews({
      businessId,
      sort: validSort,
      page,
      limit,
    });

    return NextResponse.json({ content, total, page, totalPages });
  } catch (error) {
    return handleError({ error });
  }
}
