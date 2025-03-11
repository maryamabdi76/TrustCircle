import { NextResponse } from 'next/server';

import { handleError } from '@/lib/server-utils';

import { BusinessService } from '../service';

export async function getBusinessByIdHandler(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const businessService = new BusinessService();
  try {
    const { id } = await context.params;

    const business = await businessService.getBusinessById(id);

    if (!business) {
      return handleError({
        message: 'Business not found',
        status: 404,
      });
    }

    return NextResponse.json(business);
  } catch (error) {
    return handleError({
      error,
      message: 'Failed to fetch business',
      status: 500,
    });
  }
}
