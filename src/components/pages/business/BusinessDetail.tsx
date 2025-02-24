import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { InstagramLink } from '@/components/common/instagramLink/InstagramLink';
import { WebsiteLink } from '@/components/common/websiteLink/WebsiteLink';
import { RatingDistribution } from '@/components/pages/business/RatingDistribution';
import { ReviewList } from '@/components/pages/business/ReviewList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PATHS } from '@/constants/PATHS';
import { IBusiness } from '@/interfaces/business';

export default function BusinessDetail({ business }: { business: IBusiness }) {
  const t = useTranslations('BusinessDetail');

  return (
    <>
      {/* Header Section */}
      <Card>
        <CardContent>
          <div className="pt-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex gap-4">
                {/* Business Logo */}
                <div className="relative size-28 mt-2 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={business.logo || '/placeholder.svg?height=80&width=80'}
                    alt={business.name}
                    className="object-cover"
                    fill
                    sizes="80px"
                  />
                </div>
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold">{business.name}</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-primary fill-primary" />
                      <span className="text-2xl font-bold ml-2">
                        {business.score.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-muted-foreground">
                      {t('basedOn', { count: business.reviewCount || 0 })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{business.category}</Badge>
                    {business.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full md:w-fit gap-3">
                <Button asChild className="w-full" size="lg">
                  <Link href={PATHS.REVIEWS.WRITE(business.id)}>
                    {t('writeReview')}
                  </Link>
                </Button>

                <div className="flex justify-center gap-2">
                  {business.websiteUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 w-full"
                    >
                      <WebsiteLink
                        websiteUrl={business.websiteUrl}
                        label={t('visitWebsite')}
                      />
                    </Button>
                  )}
                  {business.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 w-full"
                    >
                      <InstagramLink
                        username={business.instagram}
                        label={t('followOnInstagram')}
                      />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('ratingDistribution')}</CardTitle>
            </CardHeader>
            <CardContent>
              <RatingDistribution ratings={business.ratingDistribution} />
            </CardContent>
          </Card>
        </div>
        {/* Reviews Section */}
        <div className="md:col-span-2">
          <ReviewList businessId={business.id} />
        </div>
      </div>
    </>
  );
}
