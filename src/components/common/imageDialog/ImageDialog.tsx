import { Button } from '@/components/ui/button';
import { isBase64Image } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export const ImageDialog = ({
  images,
  initialIndex = 0,
  children,
  className,
}: {
  images: string[];
  initialIndex: number;
  children: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext(e as unknown as React.MouseEvent);
    if (e.key === 'ArrowLeft') handlePrevious(e as unknown as React.MouseEvent);
    if (e.key === 'Escape') setIsOpen(false);
  };

  return (
    <>
      <div
        className={className}
        onClick={() => {
          setCurrentIndex(initialIndex);
          setIsOpen(true);
        }}
      >
        {children}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <Button
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <div className="relative h-[80vh] w-[80vw] max-w-5xl">
            <Image
              src={images[currentIndex] || '/placeholder.svg'}
              alt={`Image ${currentIndex + 1} of ${images.length}`}
              fill
              className="object-contain"
              unoptimized={isBase64Image(images[currentIndex])}
              sizes="80vw"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          <Button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  );
};
