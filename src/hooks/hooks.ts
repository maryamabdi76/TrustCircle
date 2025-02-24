import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { IError } from './axios';

/**
 * Options for the useQuery hook.
 * @see https://tanstack.com/query/latest/docs/reference/useQuery
 * @template T The type of data returned by the query
 * @template U The keys to omit from the options
 */
export type TQueryOptions<
  T,
  U extends keyof UseQueryOptions<AxiosResponse<T>, AxiosError<IError>> = never
> = Omit<
  UseQueryOptions<AxiosResponse<T>, AxiosError<IError>>,
  'queryKey' | 'queryFn' | U
>;

/**
 * Options for the useMutation hook.
 * @see https://tanstack.com/query/latest/docs/reference/useMutation
 * @template T The type of data returned by the mutation
 * @template P The type of the payload to be sent with the mutation
 * @template U The keys to omit from the options
 */
export type TMutationOptions<
  T,
  P,
  U extends keyof UseMutationOptions<
    AxiosResponse<T>,
    AxiosError<IError>,
    P
  > = never
> = Omit<
  UseMutationOptions<AxiosResponse<T>, AxiosError<IError>, P>,
  'queryKey' | 'queryFn' | U
>;

/**
 * Options for the useInfiniteQuery hook.
 * @see https://tanstack.com/query/latest/docs/reference/useInfiniteQuery
 * @template T The type of data returned by the query
 */
export type TInfiniteQueryOptions<
  T,
  U extends keyof UseInfiniteQueryOptions<
    AxiosResponse<T>,
    AxiosError<IError>
  > = never
> = Omit<
  UseInfiniteQueryOptions<AxiosResponse<T>, AxiosError<IError>>,
  | 'queryKey'
  | 'queryFn'
  | 'pageParam'
  | 'getNextPageParam'
  | 'initialPageParam'
  | U
>;
