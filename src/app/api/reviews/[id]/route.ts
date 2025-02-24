import { NextRequest } from 'next/server';

import { deleteReviewHandler } from '../handlers/deleteReviewHandler';
import { getReviewByIdHandler } from '../handlers/getReviewByIdHandler';
import { updateReviewHandler } from '../handlers/updateReviewHandler';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return getReviewByIdHandler(req, context);
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return updateReviewHandler(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return deleteReviewHandler(req, context);
}
