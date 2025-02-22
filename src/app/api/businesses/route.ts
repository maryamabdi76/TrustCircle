import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { businesses } from '@/data/businesses';
import { authOptions } from '@/lib/auth';

const businessSchema = z
  .object({
    name: z.string().min(1),
    category: z.string(),
    instagram: z.string().optional(),
    website: z.string().url().optional(),
  })
  .refine((data) => data.instagram || data.website, {
    message: 'Either Instagram ID or Website is required',
  });

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const websiteOrInstagram = searchParams.get('websiteOrInstagram');
    const rating = searchParams.get('rating');
    const sort = searchParams.get('sort');
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '10');

    let filteredBusinesses = [...businesses];

    // Filter by category if provided
    if (category) {
      filteredBusinesses = filteredBusinesses.filter(
        (business) => business.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(
        (business) =>
          business.name.toLowerCase().includes(searchLower) ||
          business.description?.toLowerCase().includes(searchLower)
      );
    }

    if (websiteOrInstagram) {
      const searchLower = websiteOrInstagram.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(
        (business) =>
          business.instagram?.toLowerCase().includes(searchLower) ||
          business.websiteUrl?.toLowerCase().includes(searchLower)
      );
    }

    if (rating) {
      filteredBusinesses = filteredBusinesses.filter(
        (business) => business.score >= parseFloat(rating)
      );
    }

    // Sort businesses
    filteredBusinesses.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.score ?? 0) - (a.score ?? 0);
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
    console.log('🚀 ~ GET ~ error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
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
    const result = businessSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid business data', details: result.error.format() },
        { status: 400 }
      );
    }

    const newBusiness = {
      id:
        businesses.length > 0
          ? (parseInt(businesses[businesses.length - 1].id) + 1).toString()
          : '1',
      ...result.data,
      score: 0,
      reviewCount: 0,
      ratingDistribution: {},
    };

    businesses.push(newBusiness);

    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error) {
    console.error('Error creating business:', error);
    return NextResponse.json(
      { error: 'Failed to create business' },
      { status: 500 }
    );
  }
}
