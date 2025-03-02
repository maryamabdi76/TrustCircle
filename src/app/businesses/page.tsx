import { useTranslations } from 'next-intl';

import BusinessFilters from '@/components/pages/business/BusinessFilters';
import BusinessList from '@/components/pages/business/businessList/BusinessList';

export default function BusinessesPage() {
  const t = useTranslations('Business');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('businesses')}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <BusinessFilters className="w-full lg:w-1/4" />
        <BusinessList className="w-full lg:w-3/4 h-full" />
      </div>
    </div>
  );
}
