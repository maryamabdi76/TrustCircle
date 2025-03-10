import { NextResponse } from 'next/server';

import { handleError } from '@/lib/server-utils';

import { BusinessService } from '../service';

export async function getBusinesses(request: Request) {
  const businessService = new BusinessService();
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || undefined;
    const category = searchParams.get('category') || undefined;
    const websiteOrInstagram =
      searchParams.get('websiteOrInstagram') || undefined;
    const rating = searchParams.get('rating') || undefined;
    const sort = searchParams.get('sort') || undefined;
    const page = Number.parseInt(searchParams.get('page') || '0');
    const size = Number.parseInt(searchParams.get('size') || '10');

    const response = businessService.getBusinesses(
      search,
      category,
      websiteOrInstagram,
      rating,
      sort,
      page,
      size
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
