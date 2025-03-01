import { AxiosResponse } from 'axios';

import { SortType } from '@/enums/sortTypes';
import { IPagination } from '@/interfaces/api';

import AxiosManager from './axiosManager';

import type { IGetReviewsParams, IReview } from '@/interfaces/review';
const api = AxiosManager.getInstance();
const baseUrl = '/reviews';

export const reviewApi = {
  getReviews: ({
    sort = SortType.RECENT,
    page = 0,
    size = 10,
    userId,
    businessId,
  }: IGetReviewsParams = {}): Promise<AxiosResponse<IPagination<IReview>>> => {
    const params = new URLSearchParams({
      sort,
      page: page.toString(),
      size: size.toString(),
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
