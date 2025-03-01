'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { ReviewCardSkeleton } from './ReviewCardSkeleton';

export function BusinessDetailSkeleton() {
  return (
    <>
      {/* Header Section Skeleton */}
      <Card>
        <CardContent>
          <div className="pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex gap-4 items-center">
                {/* Business Logo Skeleton */}
                <Skeleton className="size-28 mt-2 rounded-lg overflow-hidden bg-muted flex-shrink-0" />

                <div className="space-y-3">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-6 w-10 ml-2" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-fit gap-3">
                <Skeleton className="h-12 w-full" />
                <div className="flex justify-center gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <div className="space-y-4">
            <ReviewCardSkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
