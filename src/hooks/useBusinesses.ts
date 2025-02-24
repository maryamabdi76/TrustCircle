'use client';

import { AxiosError, AxiosResponse } from 'axios';

import { IPagination } from '@/interfaces/api';
import { IBusiness, IGetBusinessesParams } from '@/interfaces/business';
import { businessApi } from '@/services/business';
import { useMutation, useQuery } from '@tanstack/react-query';

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
