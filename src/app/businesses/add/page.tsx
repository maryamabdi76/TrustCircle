'use client';

import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';
import { PATHS } from '@/constants/PATHS';
import { categories } from '@/data/categories';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

const businessSchema = z
  .object({
    name: z.string().min(1, 'Business name is required'),
    category: z.string().min(1, 'Category is required'),
    instagram: z.string().optional(),
    website: z.string().url().optional(),
  })
  .refine((data) => data.instagram || data.website, {
    message: 'Either Instagram ID or Website is required',
    path: ['instagram'],
  });

type BusinessFormData = z.infer<typeof businessSchema>;

export default function AddBusinessPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const t = useTranslations('Business');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: '',
      category: '',
      instagram: '',
      website: '',
    },
  });

  const onSubmit = async (data: BusinessFormData) => {
    if (!session) {
      toast({
        title: t('error'),
        description: t('pleaseSignIn'),
        variant: 'destructive',
      });
      router.push('/auth/signin');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add business');
      }

      const result = await response.json();
      toast({
        title: t('success'),
        description: t('businessAdded'),
      });
      const returnUrl = searchParams.get('returnUrl')
        ? PATHS.REVIEWS.WRITE(result.id)
        : PATHS.BUSINESSES.DETAIL(result.id);
      router.push(returnUrl);
    } catch (error) {
      console.error('Error adding business:', error);
      toast({
        title: t('error'),
        description: t('errorAddingBusiness'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('addNewBusiness')}</CardTitle>
          <CardDescription>{t('addNewBusinessDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('businessName')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {t('businessNameDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('category')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('selectCategory')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name}>
                            {category.nameFA}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('categoryDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('instagramId')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {t('instagramIdDescription')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('website')}</FormLabel>
                    <FormControl>
                      <Input {...field} type="url" />
                    </FormControl>
                    <FormDescription>{t('websiteDescription')}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('adding')}
              </>
            ) : (
              t('addBusiness')
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
