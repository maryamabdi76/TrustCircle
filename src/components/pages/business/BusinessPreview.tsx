'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Star, Globe, Instagram } from 'lucide-react';
import type { IBusiness } from '@/types/business';
import Image from 'next/image';

interface BusinessPreviewProps {
  business: IBusiness;
  className?: string;
}

export function BusinessPreview({ business, className }: BusinessPreviewProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
            <Image
              src={business.logo || '/placeholder.svg?height=80&width=80'}
              alt={business.nameFA}
              className="object-cover"
              fill
              sizes="80px"
            />
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-xl font-semibold truncate">{business.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-primary fill-primary mr-1" />
                <span>{business.score.toFixed(1)}</span>
              </div>
              <span className="text-sm">•</span>
              <span className="text-sm">{business.categoryFA}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              {business.websiteUrl && (
                <a
                  href={business.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="w-4 h-4 mr-1" />
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
                  className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4 mr-1" />
                  <span dir="ltr" className="truncate">
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
