export interface IReview {
  id: string;
  businessId: string;
  authorId: string;
  authorName: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verifiedPurchase?: boolean;
  helpful?: number;
}
