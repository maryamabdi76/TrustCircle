'use client';

import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PATHS } from '@/constants/PATHS';
import { useGetBusinesses } from '@/hooks/useBusinesses';

import BusinessCard from './BusinessCard';

export default function BusinessList({ className }: { className?: string }) {
  const t = useTranslations('Business');
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = useMemo(
    () => ({
      name: searchParams.get('name') || '',
      category: searchParams.get('category') || '',
      websiteOrInstagram: searchParams.get('websiteOrInstagram') || '',
      rating: Number.parseFloat(searchParams.get('rating') || '0'),
      page: Number.parseInt(searchParams.get('page') || '1'),
      limit: Number.parseInt(searchParams.get('limit') || '10'),
    }),
    [searchParams]
  );
  const { data: businesses, isPending } = useGetBusinesses(filters);

  const hasFilters = useMemo(
    () =>
      filters.name ||
      filters.category ||
      filters.websiteOrInstagram ||
      filters.rating > 0,
    [filters]
  );

  const handleAddBusiness = () => {
    router.push(PATHS.BUSINESSES.ADD);
  };

  const renderBusinesses = () => {
    if (isPending) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm space-y-4"
            >
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-1/2" />
                <Skeleton className="h-10 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (businesses?.data.content.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-lg mb-4">{t('noBusinessesFound')}</p>
          <Button onClick={handleAddBusiness}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addNewBusiness')}
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {businesses?.data.content.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <div
        className={clsx(
          'mb-4 flex items-center',
          hasFilters ? 'justify-between' : 'justify-end'
        )}
      >
        {hasFilters && (
          <h1 className="text-sm font-bold">
            {t('businessesFound', { count: businesses?.data.content.length })}
          </h1>
        )}
        <Button onClick={handleAddBusiness}>
          <Plus className="mr-2 h-4 w-4" />
          {t('addNewBusiness')}
        </Button>
      </div>
      {renderBusinesses()}
    </div>
  );
}
