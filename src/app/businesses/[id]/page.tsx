'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import BusinessDetail from '@/components/pages/business/BusinessDetail';
import { businesses } from '@/data/businesses';

export default function BusinessPage() {
  const t = useTranslations('BusinessDetail');
  const params = useParams();
  const business = businesses.find((b) => b.id === params.id);

  if (!business) {
    return <div>{t('businessNotFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BusinessDetail business={business} />
    </div>
  );
}
