import { NextResponse } from 'next/server';

import { handleError } from '@/lib/utils';

import { businesses } from '../data';
import { BusinessService } from '../service';

export async function getBusinesses(request: Request) {
  const businessService = new BusinessService(businesses);
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const websiteOrInstagram =
      searchParams.get('websiteOrInstagram') || undefined;
    const rating = searchParams.get('rating') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const page = Number.parseInt(searchParams.get('page') || '1', 10);
    const limit = Number.parseInt(searchParams.get('limit') || '10', 10);

    const response = businessService.getBusinesses(
      search,
      category,
      websiteOrInstagram,
      rating,
      sort,
      page,
      limit
    );

    return NextResponse.json(response);
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to fetch businesses',
      status: 500,
    });
  }
}
