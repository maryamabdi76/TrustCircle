import { Globe, Instagram, Mail, MapPin, Phone, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RatingDistribution } from '@/components/pages/business/RatingDistribution';
import { ReviewList } from '@/components/pages/business/ReviewList';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IBusiness } from '@/types/business';

export default function BusinessDetail({ business }: { business: IBusiness }) {
  const t = useTranslations('BusinessDetail');

  return (
    <>
      {/* Header Section */}
      <Card>
        <CardContent>
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{business.nameFA}</h1>
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
                  <Badge variant="outline">{business.categoryFA}</Badge>
                  {business.tagsFA?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button size="lg">{t('writeReview')}</Button>
                <div className="flex gap-2">
                  {business.websiteUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4" />
                      <a
                        href={business.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('visitWebsite')}
                      </a>
                    </Button>
                  )}
                  {business.instagram && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Instagram className="w-4 h-4" />
                      <a
                        href={`https://instagram.com/${business.instagram.replace(
                          '@',
                          ''
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('followOnInstagram')}
                      </a>
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
        {/* Reviews Section */}
        <div className="md:col-span-2">
          <ReviewList businessId={business.id} />
        </div>

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
          <Card>
            <CardHeader>
              <CardTitle>{t('businessInformation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Badge variant="outline">{business.categoryFA}</Badge>
              </div>
              {business.addressFA && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-1" />
                  <span>{business.addressFA}</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{business.phone}</span>
                </div>
              )}
              {business.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{business.email}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
