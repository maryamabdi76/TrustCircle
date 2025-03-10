import { findBusinessById, updateBusinessRating } from '@/app/api/businesses/businessRepo';
import { IReview } from '@/interfaces/review';
import db from '@/lib/db';

/**
 * Create a new review and update the associated business rating.
 */
export function createReview(review: Omit<IReview, 'id'>) {
  const stmt = db.prepare(`
    INSERT INTO reviews (
      businessId, authorId, authorName, rating, title, content,
      verifiedPurchase, helpful, images, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    review.businessId,
    review.authorId,
    review.authorName,
    review.rating,
    review.title,
    review.content,
    review.verifiedPurchase ? 1 : 0,
    review.helpful ?? 0,
    JSON.stringify(review.images ?? []),
    review.createdAt ?? new Date().toISOString()
  );

  const newReview = findReviewById(result.lastInsertRowid.toString());

  if (newReview) {
    const business = findBusinessById(newReview.businessId);
    if (business) {
      updateBusinessRating(business);
    }
  }

  return newReview;
}

/**
 * Retrieve all reviews for a business and parse `images`.
 */
export function getReviewsByBusiness(businessId: string): IReview[] {
  const reviews = db
    .prepare(`SELECT * FROM reviews WHERE businessId = ?`)
    .all(businessId) as IReview[];

  return reviews.map((review) => ({
    ...review,
    images: review.images ? JSON.parse(review.images as unknown as string) : [],
  }));
}

/**
 * Update an existing review.
 */
export function updateReview(id: string, updateData: IReview) {
  const review = findReviewById(id);
  if (!review) return null;

  const stmt = db.prepare(`
    UPDATE reviews 
    SET rating = ?, title = ?, content = ?, images = ?
    WHERE id = ?
  `);

  stmt.run(
    updateData.rating ?? review.rating,
    updateData.title ?? review.title,
    updateData.content ?? review.content,
    JSON.stringify(updateData.images ?? review.images),
    id
  );

  return findReviewById(id);
}

/**
 * Find a review by ID and parse `images`.
 */
export function findReviewById(id: string): IReview | undefined {
  const review = db.prepare(`SELECT * FROM reviews WHERE id = ?`).get(id) as
    | IReview
    | undefined;

  if (review) {
    review.images = review.images
      ? JSON.parse(review.images as unknown as string)
      : [];
  }

  return review;
}

/**
 * Delete a review and return `true` if successful.
 */
export function deleteReview(id: string) {
  return db.prepare(`DELETE FROM reviews WHERE id = ?`).run(id).changes > 0;
}

/**
 * Mark a review as helpful by increasing the count.
 */
export function markReviewAsHelpful(id: string) {
  db.prepare(`UPDATE reviews SET helpful = helpful + 1 WHERE id = ?`).run(id);
  return findReviewById(id);
}
