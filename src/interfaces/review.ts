import { SortType } from '@/enums/sortTypes';

export interface IReview {
  id: string;
  businessId: string;
  authorId: string;
  authorName: string;
  rating: number;
  title: string;
  content: string;
  verifiedPurchase?: boolean;
  helpful?: number;
  images?: string[];
  createdAt: string;
}

export interface IGetReviewsParams {
  businessId?: string | null;
  sort?: SortType;
  page?: number;
  size?: number;
  userId?: string;
}
