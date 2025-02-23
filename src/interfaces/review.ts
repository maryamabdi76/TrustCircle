import { SortType } from '@/enums/sortTypes';

export interface IReview {
  id: string;
  businessId: string;
  authorId: string;
  authorName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verifiedPurchase?: boolean;
  helpful?: number;
}

export interface FetchReviewsOptions {
  sort?: SortType;
  page?: number;
  limit?: number;
  userId?: string;
}

export interface GetReviewsParams {
  businessId?: string | null;
  sort?: SortType;
  page?: number;
  limit?: number;
}
