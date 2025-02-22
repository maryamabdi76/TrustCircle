'use client';

import { Globe, Search, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

export default function BusinessFilters({ className }: { className?: string }) {
  const [rating, setRating] = useState([0]);
  const t = useTranslations('Business');

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('filterBusinesses')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            {t('businessName')}
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="name" placeholder={t('searchByName')} className="pl-8" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            {t('category')}
          </Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">
                {t('categories.technology')}
              </SelectItem>
              <SelectItem value="food">{t('categories.food')}</SelectItem>
              <SelectItem value="retail">{t('categories.retail')}</SelectItem>
              <SelectItem value="health">{t('categories.health')}</SelectItem>
              <SelectItem value="education">
                {t('categories.education')}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl" className="text-sm font-medium">
            {t('websiteOrInstagram')}
          </Label>
          <div className="relative">
            <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="websiteUrl"
              placeholder={t('websiteOrInstagramPlaceholder')}
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">{t('minimumRating')}</Label>
            <div className="flex items-center bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-semibold">
              <Star className="w-3 h-3 mr-1 fill-current" />
              <span>{rating[0] && rating[0].toFixed(1)}</span>
            </div>
          </div>
          <Slider
            min={0}
            max={5}
            step={0.5}
            value={rating}
            onValueChange={setRating}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label={t('selectMinimumRating')}
          />
        </div>
      </CardContent>
    </Card>
  );
}
