import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { PATHS } from '@/constants/PATHS';
import { useInfiniteGetBusinesses } from '@/hooks/useBusinesses';
import { IBusiness } from '@/interfaces/business';

export const useBusinessSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [records, setRecords] = useState<IBusiness[]>([]);

  const handleAddBusiness = () => {
    const returnUrl = encodeURIComponent(pathname);
    router.push(`${PATHS.BUSINESSES.ADD}?returnUrl=${returnUrl}`);
  };

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteGetBusinesses({ search: debouncedSearch });

  // Debounce search query to optimize API calls
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Update records only after data fetch completes
  useEffect(() => {
    if (!isLoading && !isFetchingNextPage) {
      setRecords(
        data?.pages.flatMap(
          (page: { data: { content: IBusiness[] } }) => page.data.content
        ) || []
      );
    }
  }, [data, isLoading, isFetchingNextPage]);

  return {
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    records,
    searchQuery,
    fetchNextPage,
    handleAddBusiness,
    setSearchQuery,
  };
};
