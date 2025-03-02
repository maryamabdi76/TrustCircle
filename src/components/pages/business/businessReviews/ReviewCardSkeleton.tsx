'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ReviewCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-5 w-3/4" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-1/2 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
