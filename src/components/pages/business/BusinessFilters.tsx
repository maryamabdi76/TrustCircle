'use client';

import { Globe, Search, Star, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { PATHS } from '@/constants/PATHS';
import { categories } from '@/data/categories';

export default function BusinessFilters({ className }: { className?: string }) {
  const t = useTranslations('Business');
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get('name') || '');
  const [category, setCategory] = useState(
    searchParams.get('category') || 'all'
  );
  const [websiteOrInstagram, setWebsiteOrInstagram] = useState(
    searchParams.get('websiteOrInstagram') || ''
  );
  const [rating, setRating] = useState([
    Number(searchParams.get('rating') || '0'),
  ]);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    if (category && category !== 'all') params.set('category', category);
    if (websiteOrInstagram)
      params.set('websiteOrInstagram', websiteOrInstagram);
    if (rating[0] > 0) params.set('rating', rating[0].toString());

    router.push(
      `${PATHS.BUSINESSES.ROOT}${
        params.toString() ? `?${params.toString()}` : ''
      }`
    );
  }, [name, category, websiteOrInstagram, rating, router]);

  const clearFilters = useCallback(() => {
    setName('');
    setCategory('all');
    setWebsiteOrInstagram('');
    setRating([0]);
    router.push(PATHS.BUSINESSES.ROOT);
  }, [router]);

  useEffect(() => {
    setName(searchParams.get('name') || '');
    setCategory(searchParams.get('category') || 'all');
    setWebsiteOrInstagram(searchParams.get('websiteOrInstagram') || '');
    setRating([Number(searchParams.get('rating') || '0')]);
  }, [searchParams]);

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
            <Input
              id="name"
              placeholder={t('searchByName')}
              className="pl-8"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            {t('category')}
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder={t('selectCategory')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCategories')}</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.nameFA}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteOrInstagram" className="text-sm font-medium">
            {t('websiteOrInstagram')}
          </Label>
          <div className="relative">
            <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="websiteOrInstagram"
              placeholder={t('websiteOrInstagramPlaceholder')}
              className="pl-8"
              value={websiteOrInstagram}
              onChange={(e) => setWebsiteOrInstagram(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">{t('minimumRating')}</Label>
            <div className="flex items-center bg-muted text-muted-foreground rounded-md px-2 py-0.5 text-xs font-semibold">
              <Star className="w-3 h-3 mr-1 fill-current" />
              <span>{rating[0]?.toFixed(1)}</span>
            </div>
          </div>
          <Slider
            min={0}
            max={5}
            step={0.1}
            value={rating}
            onValueChange={setRating}
            className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
            aria-label={t('selectMinimumRating')}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={applyFilters} className="flex-1">
            {t('applyFilters')}
          </Button>
          <Button onClick={clearFilters} variant="outline" className="flex-1">
            <X className="w-4 h-4 mr-2" />
            {t('clearFilters')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
