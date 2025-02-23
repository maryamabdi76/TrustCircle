import { SortType } from '@/enums/sortTypes';
import { reviews } from './data';
import { GetReviewsParams, IReview } from '@/interfaces/review';
import { reviewUpdateSchema } from './schema';

export function getReviews({
  businessId,
  sort = SortType.RECENT,
  page = 1,
  limit = 10,
}: GetReviewsParams) {
  const filteredReviews = businessId
    ? reviews.filter((r) => r.businessId === businessId)
    : [...reviews];

  filteredReviews.sort((a, b) => {
    switch (sort) {
      case SortType.HIGHEST:
        return b.rating - a.rating;
      case SortType.LOWEST:
        return a.rating - b.rating;
      case SortType.RECENT:
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const start = (page - 1) * limit;
  const paginatedReviews = filteredReviews.slice(start, start + limit);

  return {
    reviews: paginatedReviews,
    total: filteredReviews.length,
    totalPages: Math.ceil(filteredReviews.length / limit),
  };
}

export function createReview(
  data: Omit<
    IReview,
    'id' | 'authorId' | 'authorName' | 'date' | 'helpful' | 'verifiedPurchase'
  >,
  user: { id?: string; name?: string | null }
) {
  const newReview: IReview = {
    id: crypto.randomUUID(),
    businessId: data.businessId,
    rating: data.rating,
    title: data.title,
    content: data.content,
    authorId: user.id || '1',
    authorName: user.name || 'Anonymous',
    date: new Date().toISOString(),
    helpful: 0,
    verifiedPurchase: false,
  };

  reviews.push(newReview);
  return newReview;
}

/**
 * Retrieves a review by its ID.
 *
 * @param {string} id - The ID of the review to retrieve.
 * @returns {object|null} - The review object or null if not found.
 */
export const getReviewById = (id: string) => {
  return reviews.find((r) => r.id === id);
};

/**
 * Updates a review by its ID with the provided data.
 *
 * @param {string} id - The ID of the review to update.
 * @param {object} updateData - The new data for the review.
 * @returns {object|null} - The updated review or an error message if invalid data was provided.
 */
export const updateReview = (id: string, updateData: string) => {
  const review = reviews.find((r) => r.id === id);
  if (!review) return null;

  const result = reviewUpdateSchema.safeParse(updateData);
  if (!result.success)
    return { error: 'Invalid review data', details: result.error.format() };

  Object.assign(review, result.data); // Update the review with the validated data
  return review;
};

/**
 * Deletes a review by its ID.
 *
 * @param {string} id - The ID of the review to delete.
 * @returns {boolean} - True if the review was deleted, or null if not found.
 */
export const deleteReview = (id: string) => {
  const reviewIndex = reviews.findIndex((r) => r.id === id);
  if (reviewIndex === -1) return null;

  reviews.splice(reviewIndex, 1); // Remove the review from the array
  return true;
};

/**
 * Increments the helpful count of a review by 1.
 *
 * @param {string} id - The ID of the review to mark as helpful.
 * @returns {number|null} - The updated helpful count or null if the review was not found.
 */
export const markReviewAsHelpful = (id: string) => {
  const review = reviews.find((r) => r.id === id);
  if (!review) return null;

  review.helpful = (review.helpful || 0) + 1; // Increment helpful count
  return review.helpful;
};
