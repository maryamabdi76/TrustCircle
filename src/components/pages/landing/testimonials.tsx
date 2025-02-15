'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: 'Alice Johnson',
    role: 'Frequent Shopper',
    content:
      'TrustCircle has completely changed how I shop. I feel more confident in my purchases knowing I can rely on genuine reviews.',
  },
  {
    name: 'Bob Smith',
    role: 'Shop Owner',
    content:
      'As a business owner, TrustCircle has helped me build trust with my customers. The authentic reviews have boosted my sales significantly.',
  },
  {
    name: 'Carol Davis',
    role: 'First-time User',
    content:
      "I was skeptical at first, but TrustCircle's community feedback helped me find a great local shop I wouldn't have discovered otherwise.",
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
        What Our Users Say
      </h2>
      <div className="relative max-w-2xl mx-auto">
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-xl">
          <CardContent className="p-8 text-center">
            <blockquote className="text-xl italic text-gray-800 dark:text-gray-200 mb-4">
              "{testimonials[currentIndex].content}"
            </blockquote>
            <p className="font-semibold text-gray-900 dark:text-white">
              {testimonials[currentIndex].name}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {testimonials[currentIndex].role}
            </p>
          </CardContent>
        </Card>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
          <Button
            variant="ghost"
            onClick={prevTestimonial}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <ChevronLeft className="h-6 w-6 text-gray-900 dark:text-white" />
          </Button>
          <Button
            variant="ghost"
            onClick={nextTestimonial}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            <ChevronRight className="h-6 w-6 text-gray-900 dark:text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};
