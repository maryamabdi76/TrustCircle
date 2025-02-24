import type { BusinessSchema } from './schema';
import { IBusiness } from '@/interfaces/business';

export class BusinessService {
  private businesses: IBusiness[];

  constructor(businesses: IBusiness[]) {
    this.businesses = businesses;
  }

  getBusinesses(
    search?: string,
    category?: string,
    websiteOrInstagram?: string,
    rating?: string,
    sort?: string,
    page: number = 1,
    limit: number = 10
  ) {
    let filteredBusinesses = [...this.businesses];

    if (category) {
      filteredBusinesses = filteredBusinesses.filter(
        (business) => business.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(
        (business) =>
          business.name.toLowerCase().includes(searchLower) ||
          business.description?.toLowerCase().includes(searchLower)
      );
    }

    if (websiteOrInstagram) {
      const searchLower = websiteOrInstagram.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(
        (business) =>
          business.instagram?.toLowerCase().includes(searchLower) ||
          business.websiteUrl?.toLowerCase().includes(searchLower)
      );
    }

    if (rating) {
      filteredBusinesses = filteredBusinesses.filter(
        (business) => business.score >= parseFloat(rating)
      );
    }

    // Sorting
    filteredBusinesses.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'rating':
          return (b.score ?? 0) - (a.score ?? 0);
        default:
          return b.score - a.score;
      }
    });

    // Pagination
    const start = (page - 1) * limit;
    const paginatedBusinesses = filteredBusinesses.slice(start, start + limit);

    return {
      content: paginatedBusinesses,
      total: filteredBusinesses.length,
      page,
      totalPages: Math.ceil(filteredBusinesses.length / limit),
    };
  }

  createBusiness(data: BusinessSchema) {
    const newBusiness: IBusiness = {
      id:
        this.businesses.length > 0
          ? (
              parseInt(this.businesses[this.businesses.length - 1].id) + 1
            ).toString()
          : '1',
      ...data,
      score: 0,
      reviewCount: 0,
      ratingDistribution: {},
    };

    this.businesses.push(newBusiness);
    return newBusiness;
  }

  getBusinessById = (id: string) => {
    return this.businesses.find((b) => b.id === id);
  };
}
