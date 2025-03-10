import { NextResponse } from 'next/server';

import { validateSession } from '@/lib/auth';
import { handleError } from '@/lib/server-utils';

import { businesses } from '../data';
import { businessSchema } from '../schema';
import { BusinessService } from '../service';

export async function createBusiness(request: Request) {
  const businessService = new BusinessService(businesses);
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

    const newBusiness = businessService.createBusiness(result.data);
    return NextResponse.json(newBusiness, { status: 201 });
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to create business',
      status: 500,
    });
  }
}
