'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const testimonialKeys = ['alice', 'bob', 'carol'];

export const Testimonials = () => {
  const t = useTranslations('LandingPage');
  const locale = useLocale();
  const isRTL = locale === 'fa';

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialKeys.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonialKeys.length) % testimonialKeys.length
    );
  };

  const currentTestimonial = testimonialKeys[currentIndex];

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('testimonials.title')}
        </h2>
        <div className="relative max-w-2xl mx-auto">
          <Card className="bg-card shadow-lg rounded-xl">
            <CardContent className="p-8 text-center">
              <blockquote className="text-xl italic mb-4">
                {t(`testimonials.${currentTestimonial}.content`)}
              </blockquote>
              <p className="font-semibold">
                {t(`testimonials.${currentTestimonial}.name`)}
              </p>
              <p className="text-muted-foreground">
                {t(`testimonials.${currentTestimonial}.role`)}
              </p>
            </CardContent>
          </Card>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <Button
              variant="ghost"
              onClick={isRTL ? nextTestimonial : prevTestimonial}
              className="p-2 rounded-full hover:bg-muted"
            >
              {isRTL ? (
                <ChevronRight className="h-6 w-6" />
              ) : (
                <ChevronLeft className="h-6 w-6" />
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={isRTL ? prevTestimonial : nextTestimonial}
              className="p-2 rounded-full hover:bg-muted"
            >
              {isRTL ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
