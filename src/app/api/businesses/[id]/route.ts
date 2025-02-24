import { NextRequest } from 'next/server';

import { getBusinessByIdHandler } from '../handlers/getBusinessByIdHandler';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return getBusinessByIdHandler(request, context);
}
