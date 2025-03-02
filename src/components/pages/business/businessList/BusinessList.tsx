'use client';

import clsx from 'clsx';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { PATHS } from '@/constants/PATHS';
import { useGetBusinesses } from '@/hooks/useBusinesses';

import BusinessCard from '../businessCard/BusinessCard';
import { BusinessCardSkeleton } from '../businessCard/BusinessCardSkeleton';

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
      page: Number.parseInt(searchParams.get('page') || '0'),
      size: Number.parseInt(searchParams.get('size') || '10'),
    }),
    [searchParams]
  );
  const { data, isPending } = useGetBusinesses(filters);
  const businesses = data?.data.content ?? [];

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
      return <BusinessCardSkeleton />;
    }

    if (businesses.length === 0) {
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
        {businesses.map((business) => (
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
            {t('businessesFound', { count: businesses.length })}
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
