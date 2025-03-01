'use client';

import { Loader2, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useBusinessSelect } from './useBusinessSelect';

interface BusinessSelectProps {
  onSelect: (id: string) => void;
}

export const BusinessSelect = ({ onSelect }: BusinessSelectProps) => {
  const t = useTranslations('Business');
  const {
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    records,
    searchQuery,
    fetchNextPage,
    handleAddBusiness,
    setSearchQuery,
  } = useBusinessSelect();

  return (
    <div className="relative w-full">
      <Select onValueChange={onSelect}>
        <SelectTrigger>
          <SelectValue placeholder={t('selectBusiness')} />
        </SelectTrigger>
        <SelectContent className="max-h-80 w-full overflow-y-auto">
          {/* Search Input */}
          <div className="p-2 sticky top-0 bg-white dark:bg-gray-900 z-10">
            <Input
              placeholder={t('searchBusiness')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Show Loading Spinner on Initial Load */}
          {isLoading && !records.length ? (
            <div className="flex justify-center p-4">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          ) : (
            <div className="overflow-y-auto max-h-60">
              <InfiniteScroll
                hasMore={hasNextPage}
                isLoading={isFetchingNextPage}
                next={fetchNextPage}
              >
                {records.length > 0 ? (
                  records.map((business) => (
                    <SelectItem key={business.id} value={business.id}>
                      {business.name}
                    </SelectItem>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg mb-4">{t('noBusinessesFound')}</p>
                    <Button onClick={handleAddBusiness}>
                      <Plus className="mr-2 h-4 w-4" />
                      {t('addNewBusiness')}
                    </Button>
                  </div>
                )}

                {isFetchingNextPage && (
                  <div className="flex justify-center p-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                )}
              </InfiniteScroll>
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
