import { AxiosError, AxiosResponse } from 'axios';

import { IPagination } from '@/interfaces/api';
import { IGetReviewsParams, IReview } from '@/interfaces/review';
import { reviewApi } from '@/services/review';
import { useMutation, useQuery } from '@tanstack/react-query';

import { IError } from './axios';
import { TMutationOptions, TQueryOptions } from './hooks';

export const useGetReviews = (
  data: IGetReviewsParams,
  queryOptions?: TQueryOptions<IPagination<IReview>>
) =>
  useQuery<AxiosResponse<IPagination<IReview>>, AxiosError<IError>>({
    queryKey: ['reviews', data],
    queryFn: () => reviewApi.getReviews(data),
    ...queryOptions,
  });

export const useCreateReview = (
  mutationOptions?: TMutationOptions<
    AxiosResponse,
    Omit<IReview, 'id' | 'date' | 'helpful'>
  >
) =>
  useMutation({
    mutationKey: ['create-review'],
    mutationFn: (data) => reviewApi.createReview(data),
    ...mutationOptions,
  });

export const useMarkHelpful = (
  mutationOptions?: TMutationOptions<AxiosResponse, string>
) =>
  useMutation({
    mutationKey: ['mark-helpful'],
    mutationFn: (reviewId) => reviewApi.markReviewHelpful(reviewId),
    ...mutationOptions,
  });
