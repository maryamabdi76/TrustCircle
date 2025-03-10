import db from '@/lib/db';
import { IBusiness } from '@/interfaces/business';
import { getReviewsByBusiness } from '@/app/api/reviews/reviewRepo';

/**
 * Create a new business and update its rating after insertion.
 */
export function createBusiness(business: Omit<IBusiness, 'id'>) {
  const stmt = db.prepare(`
    INSERT INTO businesses (
      name, logo, websiteUrl, instagram, score, category,
      description, address, phone, email, reviewCount, ratingDistribution, createdAt
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    business.name,
    business.logo ?? null,
    business.websiteUrl ?? null,
    business.instagram ?? null,
    0,
    business.category,
    business.description ?? null,
    business.address ?? null,
    business.phone ?? null,
    business.email ?? null,
    0,
    JSON.stringify({}),
    new Date().toISOString()
  );

  const newBusiness = findBusinessById(result.lastInsertRowid.toString());

  if (newBusiness) {
    updateBusinessRating(newBusiness);
  }

  return newBusiness;
}

/**
 * Retrieve all businesses and parse `ratingDistribution`.
 */
export function getAllBusinesses(): IBusiness[] {
  const businesses = db
    .prepare(`SELECT * FROM businesses`)
    .all() as IBusiness[];

  return businesses.map((business) => ({
    ...business,
    ratingDistribution: business.ratingDistribution
      ? JSON.parse(business.ratingDistribution as unknown as string)
      : {},
  }));
}

/**
 * Find a business by ID and parse `ratingDistribution`.
 */
export function findBusinessById(id: string): IBusiness | undefined {
  const business = db
    .prepare(`SELECT * FROM businesses WHERE id = ?`)
    .get(id) as IBusiness | undefined;

  if (business) {
    business.ratingDistribution = business.ratingDistribution
      ? JSON.parse(business.ratingDistribution as unknown as string)
      : {};
  }

  return business;
}

/**
 * Update a business's `score`, `reviewCount`, and `ratingDistribution`.
 */
export function updateBusinessRating(business: IBusiness) {
  const reviews = getReviewsByBusiness(business.id);
  console.log('🚀 ~ updateBusinessRating ~ reviews:', reviews);

  // ✅ Recalculate rating distribution
  const ratingDistribution: { [key: number]: number } = {};
  reviews.forEach((review) => {
    ratingDistribution[review.rating] =
      (ratingDistribution[review.rating] || 0) + 1;
  });

  // ✅ Recalculate score
  const totalReviews = reviews.length;
  const totalScore = reviews.reduce((sum, review) => sum + review.rating, 0);

  business.score = totalReviews > 0 ? totalScore / totalReviews : 0;
  business.reviewCount = totalReviews;
  business.ratingDistribution = ratingDistribution;

  // ✅ Ensure `ratingDistribution` is stored as a JSON string
  return db
    .prepare(
      `UPDATE businesses 
       SET score = ?, reviewCount = ?, ratingDistribution = ?
       WHERE id = ?`
    )
    .run(
      business.score,
      business.reviewCount,
      JSON.stringify(business.ratingDistribution),
      business.id
    );
}
