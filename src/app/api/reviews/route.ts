import { NextRequest } from 'next/server';

import { createReviewHandler } from './handlers/createReviewHandler';
import { getReviewsHandler } from './handlers/getReviewsHandler';

export async function GET(req: NextRequest) {
  return getReviewsHandler(req);
}

export async function POST(req: NextRequest) {
  return createReviewHandler(req);
}
