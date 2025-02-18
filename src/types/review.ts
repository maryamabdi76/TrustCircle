export interface IReview {
  id: string;
  businessId: string;
  authorId: string;
  authorName: string;
  authorNameFA: string;
  rating: number;
  title: string;
  titleFA: string;
  content: string;
  contentFA: string;
  date: string;
  verifiedPurchase?: boolean;
  helpful?: number;
}
