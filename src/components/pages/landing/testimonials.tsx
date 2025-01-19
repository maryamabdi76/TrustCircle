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

export default function Testimonials() {
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
    <section className=" py-12 md:py-24">
      <h2 className="text-3xl font-bold text-center mb-12">
        What Our Users Say
      </h2>
      <div className="relative">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <blockquote className="text-xl italic mb-4">
              "{testimonials[currentIndex].content}"
            </blockquote>
            <p className="font-semibold">{testimonials[currentIndex].name}</p>
            <p className="text-muted-foreground">
              {testimonials[currentIndex].role}
            </p>
          </CardContent>
        </Card>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
          <Button variant="ghost" onClick={prevTestimonial} className="p-2">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" onClick={nextTestimonial} className="p-2">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
}
