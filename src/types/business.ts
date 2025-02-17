export interface IBusiness {
  id: string;
  name: string;
  nameFA: string;
  websiteUrl?: string;
  instagram?: string;
  score: number;
  category: string;
  categoryFA: string;
  description?: string;
  descriptionFA?: string;
  address?: string;
  addressFA?: string;
  phone?: string;
  email?: string;
  tags?: string[];
  tagsFA?: string[];
  reviewCount?: number;
  ratingDistribution?: {
    [key: number]: number;
  };
  openingHours?: string;
  openingHoursFA?: string;
}
