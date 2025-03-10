import { getReviewsByBusiness } from '@/app/api/reviews/reviewRepo';
import { IBusiness } from '@/interfaces/business';
import pool from '@/lib/db';

/**
 * Create a new business and update its rating after insertion.
 */
export async function createBusiness(business: Omit<IBusiness, 'id'>) {
  const query = `
    INSERT INTO businesses (
      name, logo, websiteUrl, instagram, score, category,
      description, address, phone, email, reviewCount, ratingDistribution, createdAt
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *;
  `;

  const values = [
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
    new Date().toISOString(),
  ];

  const result = await pool.query(query, values);
  const newBusiness = result.rows[0];

  if (newBusiness) {
    await updateBusinessRating(newBusiness);
  }

  return newBusiness;
}

/**
 * Retrieve all businesses and parse `ratingDistribution`.
 */
export async function getAllBusinesses(): Promise<IBusiness[]> {
  const result = await pool.query('SELECT * FROM businesses');
  const businesses = result.rows as IBusiness[];

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
export async function findBusinessById(
  id: string
): Promise<IBusiness | undefined> {
  const query = 'SELECT * FROM businesses WHERE id = $1';
  const result = await pool.query(query, [id]);
  const business = result.rows[0] as IBusiness | undefined;

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
export async function updateBusinessRating(business: IBusiness) {
  const reviews = await getReviewsByBusiness(business.id);

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
  const query = `
    UPDATE businesses 
    SET score = $1, reviewCount = $2, ratingDistribution = $3
    WHERE id = $4
  `;

  await pool.query(query, [
    business.score,
    business.reviewCount,
    JSON.stringify(business.ratingDistribution),
    business.id,
  ]);
}
