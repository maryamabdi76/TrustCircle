import { Card, CardContent } from '@/components/ui/card';
import { Star, Globe, Instagram } from 'lucide-react';
import type { IBusiness } from '@/types/business';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface BusinessPreviewProps {
  business: IBusiness;
  className?: string;
}

export function BusinessPreview({ business, className }: BusinessPreviewProps) {
  return (
    <Card
      className={`overflow-hidden shadow-lg transition-all hover:shadow-xl ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <Image
              src={business.logo || '/placeholder.svg?height=96&width=96'}
              alt={business.name}
              className="object-cover"
              fill
              sizes="96px"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-2xl font-semibold truncate mb-2">
              {business.nameFA}
            </h2>
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2 py-1">
                <Star className="w-4 h-4 text-primary fill-primary mr-1" />
                <span className="font-medium">{business.score.toFixed(1)}</span>
              </div>
              <Badge variant="secondary">{business.categoryFA}</Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              {business.websiteUrl && (
                <a
                  href={business.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="truncate">
                    {new URL(business.websiteUrl).hostname}
                  </span>
                </a>
              )}
              {business.instagram && (
                <a
                  href={`https://instagram.com/${business.instagram.replace(
                    '@',
                    ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span className="truncate" dir="ltr">
                    {business.instagram}
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
