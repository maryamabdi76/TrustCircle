import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function ReviewSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Business Preview Skeleton */}
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-6 space-y-8">
            <div className="flex items-start gap-6">
              <Skeleton className="w-24 h-24 rounded-full" />
              <div className="flex-grow min-w-0">
                <Skeleton className="h-8 w-full" />
                <div className="flex items-center gap-2 my-3">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div className="flex items-center gap-4 my-3">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Skeleton */}
        <Card className="overflow-hidden shadow-lg">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mb-2" /> {/* Title Skeleton */}
            <Skeleton className="h-4 w-1/2" /> {/* Description Skeleton */}
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Skeleton key={star} className="w-12 h-12 rounded-full" />
              ))}
            </div>
            <Skeleton className="h-10 w-full" /> {/* Title Input Skeleton */}
            <Skeleton className="h-40 w-full" />{' '}
            {/* Content Textarea Skeleton */}
            <Skeleton className="h-12 w-full" /> {/* Submit Button Skeleton */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
