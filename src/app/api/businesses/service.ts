import {
    createBusiness as createBusinessRepo, findBusinessById as getBusinessByIdRepo,
    getAllBusinesses as getBusinessesRepo, updateBusinessRating as updateBusinessRatingRepo
} from '@/app/api/businesses/businessRepo';
import { IBusiness } from '@/interfaces/business';

export class BusinessService {
  getBusinesses(
    search?: string,
    category?: string,
    websiteOrInstagram?: string,
    rating?: string,
    sort?: string,
    page: number = 0,
    size: number = 10
  ) {
    let businesses = getBusinessesRepo();

    // Filtering
    if (category) {
      businesses = businesses.filter(
        (business) => business.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      businesses = businesses.filter(
        (business) =>
          business.name.toLowerCase().includes(searchLower) ||
          business.description?.toLowerCase().includes(searchLower)
      );
    }

    if (websiteOrInstagram) {
      const searchLower = websiteOrInstagram.toLowerCase();
      businesses = businesses.filter(
        (business) =>
          business.instagram?.toLowerCase().includes(searchLower) ||
          business.websiteUrl?.toLowerCase().includes(searchLower)
      );
    }

    if (rating) {
      businesses = businesses.filter(
        (business) => business.score >= parseFloat(rating)
      );
    }

    // Sorting
    businesses.sort((a, b) => {
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
    const paginatedBusinesses = businesses.slice(start, start + size);

    return {
      content: paginatedBusinesses,
      total: businesses.length,
      page,
      totalPages: Math.ceil(businesses.length / size),
    };
  }

  createBusiness(data: Omit<IBusiness, 'id'>) {
    return createBusinessRepo(data);
  }

  getBusinessById(id: string) {
    return getBusinessByIdRepo(id);
  }

  updateBusinessRating(business: IBusiness) {
    if (!business) {
      throw new Error('Business not found!');
    }
    updateBusinessRatingRepo(business);
    return business;
  }
}
