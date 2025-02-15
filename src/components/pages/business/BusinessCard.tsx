import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Globe, Instagram, ExternalLink } from 'lucide-react';
import type { IBusiness } from '@/types/business';

const StarRating = ({ score }: { score: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <span
            style={{
              width: `${Math.max(0, Math.min(100, (score - star + 1) * 100))}%`,
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </span>
        </span>
      ))}
      <span className="ml-1 text-sm font-medium">{score.toFixed(1)}</span>
    </div>
  );
};

export default function BusinessCard({ business }: { business: IBusiness }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="flex-grow p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold truncate mr-2">
            {business.name}
          </h3>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              {business.category}
            </Badge>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <StarRating score={business.score} />
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          {business.instagram && (
            <a
              href={`https://instagram.com/${business.instagram.replace(
                '@',
                ''
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center mr-4 hover:text-primary transition-colors duration-200"
            >
              <Instagram className="w-4 h-4 mr-1" />
              <span className="truncate">{business.instagram}</span>
            </a>
          )}
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          {business.websiteUrl && (
            <a
              href={business.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center hover:text-primary transition-colors duration-200"
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="truncate">{business.websiteUrl}</span>
            </a>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex justify-between items-center w-full space-x-2">
          <Button variant="outline" asChild className="w-full">
            <Link href={`/businesses/${business.id}`}>
              View Details
              <ExternalLink className="w-3 h-3 ml-2" />
            </Link>
          </Button>
          <Button variant="secondary" className="w-full cursor-pointer">
            Add Review
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
