'use client';

import { AxiosError, AxiosResponse } from 'axios';

import { IPagination } from '@/interfaces/api';
import { IBusiness, IGetBusinessesParams } from '@/interfaces/business';
import { businessApi } from '@/services/business';
import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import { IError } from './axios';
import { TMutationOptions, TQueryOptions } from './hooks';

export const useGetBusinesses = (
  params: IGetBusinessesParams,
  queryOptions?: TQueryOptions<IPagination<IBusiness>>
) =>
  useQuery<AxiosResponse<IPagination<IBusiness>>, AxiosError<IError>>({
    queryKey: ['businesses', params],
    queryFn: () => businessApi.getBusinesses(params),
    ...queryOptions,
  });

export const useInfiniteGetBusinesses = (
  { search }: { search: string },
  queryOptions?: object
) => {
  return useInfiniteQuery({
    queryKey: ['businesses', search],
    queryFn: async ({ pageParam = 0 }) =>
      businessApi.getBusinesses({
        search,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const { page: currentPage, totalPages } = lastPage.data;
      return currentPage + 1 < totalPages ? currentPage + 1 : undefined;
    },
    ...queryOptions,
  });
};

export const useGetBusinessById = (
  id: string,
  queryOptions?: TQueryOptions<IBusiness>
) =>
  useQuery<AxiosResponse<IBusiness>, AxiosError<IError>>({
    queryKey: ['business', id],
    queryFn: () => businessApi.getBusinessById(id),
    ...queryOptions,
  });

export const useCreateBusiness = (
  mutationOptions?: TMutationOptions<
    IBusiness,
    Omit<IBusiness, 'id' | 'score' | 'reviewCount'>
  >
) =>
  useMutation({
    mutationKey: ['create-business'],
    mutationFn: (data) => businessApi.createBusiness(data),
    ...mutationOptions,
  });
