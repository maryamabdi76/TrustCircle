import {
  findBusinessById,
  updateBusinessRating,
} from '@/app/api/businesses/businessRepo';
import { IReview } from '@/interfaces/review';
import pool from '@/lib/db';

/**
 * Create a new review and update the associated business rating.
 */
export async function createReview(review: Omit<IReview, 'id'>) {
  const query = `
    INSERT INTO reviews (
      "businessId", "authorId", "authorName", rating, title, content,
      "verifiedPurchase", helpful, images, "createdAt"
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *;
  `;

  const values = [
    review.businessId,
    review.authorId,
    review.authorName,
    review.rating,
    review.title,
    review.content,
    review.verifiedPurchase ? 1 : 0,
    review.helpful ?? 0,
    JSON.stringify(review.images ?? []),
    review.createdAt ?? new Date().toISOString(),
  ];

  const result = await pool.query(query, values);
  const newReview = result.rows[0];

  if (newReview) {
    const business = await findBusinessById(newReview.businessId);
    if (business) {
      await updateBusinessRating(business);
    }
  }

  return newReview;
}

/**
 * Retrieve all reviews for a business and parse `images`.
 */
export async function getReviewsByBusiness(
  businessId: string
): Promise<IReview[]> {
  const query = 'SELECT * FROM reviews WHERE "businessId" = $1';
  const result = await pool.query(query, [businessId]);

  return result.rows.map((review) => ({
    ...review,
    images:
      typeof review.images === 'string'
        ? JSON.parse(review.images)
        : review.images || [],
  }));
}

/**
 * Update an existing review.
 */
export async function updateReview(id: string, updateData: Partial<IReview>) {
  const review = await findReviewById(id);
  if (!review) return null;

  const query = `
    UPDATE reviews 
    SET rating = $1, title = $2, content = $3, images = $4
    WHERE id = $5
    RETURNING *;
  `;

  const values = [
    updateData.rating ?? review.rating,
    updateData.title ?? review.title,
    updateData.content ?? review.content,
    JSON.stringify(updateData.images ?? review.images),
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Find a review by ID and parse `images`.
 */
export async function findReviewById(id: string): Promise<IReview | undefined> {
  const query = 'SELECT * FROM reviews WHERE id = $1';
  const result = await pool.query(query, [id]);

  if (result.rows[0]) {
    const review = result.rows[0];
    review.images = review.images ? JSON.parse(review.images) : [];
    return review;
  }

  return undefined;
}

/**
 * Delete a review and return `true` if successful.
 */
export async function deleteReview(id: string): Promise<boolean> {
  const query = 'DELETE FROM reviews WHERE id = $1';
  const result = await pool.query(query, [id]);
  return (result.rowCount ?? 0) > 0;
}

/**
 * Mark a review as helpful by increasing the count.
 */
export async function markReviewAsHelpful(
  id: string
): Promise<IReview | undefined> {
  const query =
    'UPDATE reviews SET helpful = helpful + 1 WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
}
