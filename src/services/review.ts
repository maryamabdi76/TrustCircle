import { SortType } from '@/enums/sortTypes';
import type { IGetReviewsParams, IReview } from '@/interfaces/review';
import AxiosManager from './axiosManager';
import { IPagination } from '@/interfaces/api';
import { AxiosResponse } from 'axios';

const api = AxiosManager.getInstance();
const baseUrl = '/reviews';

export const reviewApi = {
  getReviews: ({
    sort = SortType.RECENT,
    page = 1,
    limit = 10,
    userId,
    businessId,
  }: IGetReviewsParams = {}): Promise<AxiosResponse<IPagination<IReview>>> => {
    const params = new URLSearchParams({
      sort,
      page: page.toString(),
      limit: limit.toString(),
    });

    if (businessId) params.append('businessId', businessId);
    if (userId) params.append('userId', userId);

    return api.get(`${baseUrl}?${params}`);
  },

  createReview: (data: Omit<IReview, 'id' | 'date' | 'helpful'>) =>
    api.post(baseUrl, data),

  markReviewHelpful: (reviewId: string) =>
    api.post(`${baseUrl}/${reviewId}/helpful`),
};
