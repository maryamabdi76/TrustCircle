'use client';

import { useState } from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Globe, Star } from 'lucide-react';

export default function BusinessFilters({ className }: { className?: string }) {
  const [rating, setRating] = useState([0]);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Filter Businesses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Business Name
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input id="name" placeholder="Search by name" className="pl-8" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category
          </Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="health">Health & Wellness</SelectItem>
              <SelectItem value="education">Education</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="websiteUrl" className="text-sm font-medium">
            Website or Instagram
          </Label>
          <div className="relative">
            <Globe className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="websiteUrl"
              placeholder="website.com or @username"
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">Minimum Rating</Label>
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
            aria-label="Select minimum rating"
          />
        </div>
      </CardContent>
    </Card>
  );
}
