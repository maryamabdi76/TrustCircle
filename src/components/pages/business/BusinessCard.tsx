'use client';

import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import { InstagramLink } from '@/components/common/instagramLink/InstagramLink';
import { StarRating } from '@/components/common/starRating/StarRating';
import { WebsiteLink } from '@/components/common/websiteLink/WebsiteLink';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { PATHS } from '@/constants/PATHS';
import { categories } from '@/data/categories';

import type { IBusiness } from '@/types/business';
export default function BusinessCard({ business }: { business: IBusiness }) {
  const t = useTranslations('Business');
  const category = useMemo(
    () => categories.find((category) => category.name === business.category),
    [business.category]
  );

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Business Logo */}
          <div className="relative w-20 h-20 mt-2 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={business.logo || '/placeholder.svg?height=80&width=80'}
              alt={business.name}
              className="object-cover"
              fill
              sizes="80px"
            />
          </div>

          {/* Business Details */}
          <div className="flex flex-col flex-grow min-w-0">
            <div className="flex flex-col xl:flex-row justify-between mb-2">
              <h3 className="text-lg font-semibold truncate">
                {business.name}
              </h3>
              <Badge variant="secondary" className="text-xs w-fit">
                {category?.nameFA}
              </Badge>
            </div>

            <StarRating score={business.score} />

            {/* Social Links */}
            <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-2">
              {business.instagram && (
                <InstagramLink username={business.instagram} />
              )}
              {business.websiteUrl && (
                <WebsiteLink websiteUrl={business.websiteUrl} />
              )}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer Actions */}
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button variant="outline" asChild className="w-full">
            <Link href={PATHS.BUSINESSES.DETAIL(business.id)}>
              {t('viewDetails')}
              <ExternalLink className="w-3 h-3 ml-2" />
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href={PATHS.REVIEWS.WRITE(business.id)}>
              {t('writeReview')}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
