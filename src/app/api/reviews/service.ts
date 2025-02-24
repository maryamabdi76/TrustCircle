import { SortType } from '@/enums/sortTypes';
import { IGetReviewsParams, IReview } from '@/interfaces/review';

import { reviewUpdateSchema } from './schema';
import { BusinessService } from '../businesses/service';
import { businesses } from '../businesses/data';

export class ReviewService {
  private reviews: IReview[];

  constructor(reviews: IReview[]) {
    this.reviews = reviews;
  }

  getReviews({
    businessId,
    sort = SortType.RECENT,
    page = 1,
    limit = 10,
  }: IGetReviewsParams) {
    const filteredReviews = businessId
      ? this.reviews.filter((r) => r.businessId === businessId)
      : [...this.reviews];

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
      content: paginatedReviews,
      total: filteredReviews.length,
      totalPages: Math.ceil(filteredReviews.length / limit),
    };
  }

  createReview(
    data: Omit<
      IReview,
      'id' | 'authorId' | 'authorName' | 'date' | 'helpful' | 'verifiedPurchase'
    >,
    user: { id?: string; name?: string | null }
  ) {
    const businessService = new BusinessService(businesses);
    const business = businessService.getBusinessById(data.businessId);
    if (!business) {
      throw new Error('Business not found');
    }

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

    this.reviews.push(newReview);
    businessService.updateBusinessRating(business);

    return newReview;
  }

  getReviewById = (id: string) => {
    return this.reviews.find((r) => r.id === id);
  };

  updateReview = (id: string, updateData: string) => {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) return null;

    const result = reviewUpdateSchema.safeParse(updateData);
    if (!result.success)
      return { error: 'Invalid review data', details: result.error.format() };

    Object.assign(review, result.data);
    return review;
  };

  deleteReview = (id: string) => {
    const reviewIndex = this.reviews.findIndex((r) => r.id === id);
    if (reviewIndex === -1) return null;

    this.reviews.splice(reviewIndex, 1); // Remove the review from the array
    return true;
  };

  markReviewAsHelpful = (id: string) => {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) return null;

    review.helpful = (review.helpful || 0) + 1; // Increment helpful count
    return review.helpful;
  };
}
