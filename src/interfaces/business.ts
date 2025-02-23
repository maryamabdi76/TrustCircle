export interface IBusiness {
  id: string;
  name: string;
  logo?: string;
  websiteUrl?: string;
  instagram?: string;
  score: number;
  category: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  tags?: string[];
  reviewCount?: number;
  ratingDistribution: {
    [key: number]: number;
  };
}
