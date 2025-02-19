'use client';

import { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { IBusiness } from '@/types/business';

export default function BusinessList({ className }: { className?: string }) {
  const t = useTranslations('Business');
  const { loading, fetchBusinesses } = useBusinesses();
  const [isLoading, setIsLoading] = useState(true);
  const [businesses, setBusinesses] = useState<IBusiness[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadBusinesses() {
      const { businesses } = await fetchBusinesses().finally(() => {
        setIsLoading(false);
      });
      setBusinesses(businesses);
    }

    loadBusinesses();
  }, [fetchBusinesses]);

  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddBusiness = () => {
    router.push('/businesses/add');
  };

  return (
    <div className={className}>
      <div className="mb-4 flex gap-2">
        <Input
          type="text"
          placeholder={t('searchBusinesses')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleAddBusiness}>
          <Plus className="mr-2 h-4 w-4" />
          {t('addNewBusiness')}
        </Button>
      </div>
      {loading || isLoading ? (
        Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-sm space-y-4"
          >
            <Skeleton className="h-6 w-3/4" /> {/* Business Name */}
            <Skeleton className="h-5 w-20" /> {/* Star Rating */}
            <Skeleton className="h-4 w-full" /> {/* Instagram Link */}
            <Skeleton className="h-4 w-full" /> {/* Website Link */}
            <div className="flex gap-2">
              <Skeleton className="h-10 w-1/2" /> {/* View Details Button */}
              <Skeleton className="h-10 w-1/2" /> {/* Write Review Button */}
            </div>
          </div>
        ))
      ) : filteredBusinesses.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg mb-4">{t('noBusinessesFound')}</p>
          <Button onClick={handleAddBusiness}>
            <Plus className="mr-2 h-4 w-4" />
            {t('addNewBusiness')}
          </Button>
        </div>
      )}
    </div>
  );
}
