'use client';

import { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { useBusinesses } from '@/hooks/useBusinesses';
import { Skeleton } from '@/components/ui/skeleton';

export default function BusinessList({ className }: { className?: string }) {
  const { loading, fetchBusinesses } = useBusinesses();
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function loadBusinesses() {
      const { businesses } = await fetchBusinesses();
      setBusinesses(businesses);
    }

    loadBusinesses();
  }, [fetchBusinesses]);

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${className}`}>
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
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
        : businesses.map((business, index) => (
            <BusinessCard key={index} business={business} />
          ))}
    </div>
  );
}
