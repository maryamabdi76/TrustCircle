import { NextResponse } from 'next/server';

import { validateSession } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { businessSchema } from '../schema';
import { BusinessService } from '../service';

export async function createBusiness(request: Request) {
  const businessService = new BusinessService();
  try {
    await validateSession();
    const json = await request.json();
    const result = businessSchema.safeParse(json);

    if (!result.success) {
      return handleError({
        message: 'Invalid business data',
        details: result.error.format(),
        status: 400,
      });
    }

    const newBusinessData = {
      ...result.data,
      score: 0,
      ratingDistribution: {},
    };
    const newBusiness = businessService.createBusiness(newBusinessData);
    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to create business',
      status: 500,
    });
  }
}
