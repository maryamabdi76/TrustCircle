import {
    createReview as createReviewRepo, deleteReview as deleteReviewRepo,
    findReviewById as getReviewByIdRepo, getReviewsByBusiness as getReviewsByBusinessRepo,
    markReviewAsHelpful as markReviewAsHelpfulRepo, updateReview as updateReviewRepo
} from '@/app/api/reviews/reviewRepo';
import { SortType } from '@/enums/sortTypes';
import { IReview } from '@/interfaces/review';

export class ReviewService {
  createReview(
    data: Omit<IReview, 'id' | 'createdAt' | 'helpful'>,
    user: { id?: string; name?: string | null }
  ) {
    const newReview: Omit<IReview, 'id'> = {
      businessId: data.businessId,
      authorId: user.id || '1',
      authorName: user.name || 'Anonymous',
      rating: data.rating,
      title: data.title,
      content: data.content,
      verifiedPurchase: false,
      helpful: 0,
      images: data.images ?? [],
      createdAt: new Date().toISOString(),
    };

    return createReviewRepo(newReview);
  }
  getReviews({
    businessId,
    sort = SortType.RECENT,
    page = 0,
    size = 10,
  }: {
    businessId?: string;
    sort?: SortType;
    page?: number;
    size?: number;
  }) {
    const reviews = businessId ? getReviewsByBusinessRepo(businessId) : [];

    // Sorting logic
    switch (sort) {
      case SortType.HIGHEST:
        reviews.sort((a, b) => b.rating - a.rating);
        break;
      case SortType.LOWEST:
        reviews.sort((a, b) => a.rating - b.rating);
        break;
      case SortType.RECENT:
      default:
        reviews.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    // Pagination
    const start = page * size;
    const paginatedReviews = reviews.slice(start, start + size);

    return {
      content: paginatedReviews,
      total: reviews.length,
      totalPages: Math.ceil(reviews.length / size),
    };
  }

  updateReview(businessId: string, updateData: IReview) {
    return updateReviewRepo(businessId, updateData);
  }

  getReviewsByBusiness(businessId: string) {
    return getReviewsByBusinessRepo(businessId);
  }

  getReviewById(id: string) {
    return getReviewByIdRepo(id);
  }

  deleteReview(id: string) {
    return deleteReviewRepo(id);
  }

  markReviewAsHelpful(id: string) {
    return markReviewAsHelpfulRepo(id);
  }
}
