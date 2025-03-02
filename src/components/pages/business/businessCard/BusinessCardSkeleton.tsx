'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function BusinessCardSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm space-y-4">
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
