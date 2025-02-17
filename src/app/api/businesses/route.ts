import { NextResponse } from 'next/server';
import { businesses } from '@/data/businesses';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'rating';
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');

    let filteredBusinesses = [...businesses];

    // Filter by category if provided
    if (category) {
      filteredBusinesses = filteredBusinesses.filter(
        (business) => business.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(
        (business) =>
          business.name.toLowerCase().includes(searchLower) ||
          business.nameFA.toLowerCase().includes(searchLower) ||
          business.description?.toLowerCase().includes(searchLower) ||
          business.descriptionFA?.toLowerCase().includes(searchLower)
      );
    }

    // Sort businesses
    filteredBusinesses.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
        default:
          return b.score - a.score;
      }
    });

    // Pagination
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedBusinesses = filteredBusinesses.slice(start, end);

    return NextResponse.json({
      businesses: paginatedBusinesses,
      total: filteredBusinesses.length,
      page,
      totalPages: Math.ceil(filteredBusinesses.length / limit),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}
