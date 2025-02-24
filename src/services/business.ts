import { AxiosResponse } from 'axios';

import { IPagination } from '@/interfaces/api';
import { IBusiness, IGetBusinessesParams } from '@/interfaces/business';

import AxiosManager from './axiosManager';

const api = AxiosManager.getInstance();
const baseUrl = '/businesses';

export const businessApi = {
  getBusinesses: (
    params: IGetBusinessesParams
  ): Promise<AxiosResponse<IPagination<IBusiness>>> =>
    api.get<IPagination<IBusiness>>(baseUrl, { params }),

  getBusinessById: (id: string): Promise<AxiosResponse<IBusiness>> =>
    api.get<IBusiness>(`${baseUrl}/${id}`),

  createBusiness: (data: Omit<IBusiness, 'id' | 'score' | 'reviewCount'>) =>
    api.post<IBusiness>(baseUrl, data),
};
