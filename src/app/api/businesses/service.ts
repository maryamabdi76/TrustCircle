import { IBusiness } from '@/interfaces/business';

import { reviews } from '../reviews/data';
import { ReviewService } from '../reviews/service';

import type { BusinessSchema } from './schema';
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
    page: number = 0,
    size: number = 10
  ) {
    let filteredBusinesses = [...this.businesses];

    filteredBusinesses.forEach((business) =>
      this.updateBusinessRating(business)
    );

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
    const start = page * size;
    const paginatedBusinesses = filteredBusinesses.slice(start, start + size);

    return {
      content: paginatedBusinesses,
      total: filteredBusinesses.length,
      page,
      totalPages: Math.ceil(filteredBusinesses.length / size),
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

    return new Promise<IBusiness>((resolve) => {
      setTimeout(() => {
        console.log('✅ Business successfully added:', newBusiness);
        resolve(newBusiness);
      }, 50);
    });
  }

  getBusinessById = (id: string) => {
    const business = this.businesses?.find((b) => b.id === id);
    if (!business) return undefined;

    this.updateBusinessRating(business);
    return business;
  };

  updateBusinessRating(business: IBusiness) {
    if (!business) {
      throw new Error('Business not found!');
    }

    // Reset rating distribution if undefined
    if (!business.ratingDistribution) {
      business.ratingDistribution = {};
    }

    // Recalculate rating distribution from reviews

    const reviewService = new ReviewService(reviews);
    const reviewsForBusiness = reviewService.getReviews({
      businessId: business.id,
    }).content;

    // Reset rating distribution
    business.ratingDistribution = {};
    reviewsForBusiness.forEach((review) => {
      business.ratingDistribution[review.rating] =
        (business.ratingDistribution[review.rating] || 0) + 1;
    });

    // Recalculate score
    const totalReviews = reviewsForBusiness.length;
    const totalScore = reviewsForBusiness.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    business.score = totalReviews > 0 ? totalScore / totalReviews : 0;
    business.reviewCount = totalReviews;

    this.businesses = this.businesses.map((b) =>
      b.id === business.id ? { ...business } : b
    );
  }
}
