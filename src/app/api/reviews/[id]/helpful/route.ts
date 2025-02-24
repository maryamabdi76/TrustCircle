import { NextRequest } from 'next/server';

import { markReviewHelpfulHandler } from '../../handlers/markReviewHelpfulHandler';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return markReviewHelpfulHandler(req, context);
}
