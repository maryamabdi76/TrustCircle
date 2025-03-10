import type { IReview } from '@/interfaces/review';
import db from '@/lib/db';

/**
 * Mock data representing reviews.
 * In a real application, this would be fetched from a database.
 */
export const reviews: IReview[] = [
  {
    id: '1',
    authorId: '1',
    businessId: '1',
    authorName: 'جان دو',
    rating: 5,
    title: 'خدمات فوق‌العاده و نوآوری بی‌نظیر',
    content:
      'راهکارهای نوین تک واقعاً فراتر از انتظارات ما عمل کرد. سیستم‌های هوش مصنوعی آن‌ها توانستند فرآیندهای ما را بهینه کنند و بهره‌وری را افزایش دهند. تیم پشتیبانی بسیار حرفه‌ای و پاسخگو بود.',
    createdAt: '2023-05-15T10:30:00Z',
    verifiedPurchase: true,
    helpful: 52,
    images: [],
  },
  {
    id: '2',
    authorId: '2',
    businessId: '1',
    authorName: 'جین اسمیت',
    rating: 4,
    title: 'کیفیت عالی اما کمی تأخیر در پیاده‌سازی',
    content:
      'محصولات ابری این شرکت بسیار کارآمد و پایدار هستند. ما تغییرات مثبتی در کسب‌وکار خود دیدیم، اما مراحل اجرایی کمی بیشتر از حد انتظار طول کشید. امیدوارم در آینده روند پیاده‌سازی سریع‌تر شود.',
    createdAt: '2023-06-02T14:45:00Z',
    verifiedPurchase: true,
    helpful: 34,
    images: [],
  },
  {
    id: '3',
    authorId: '3',
    businessId: '2',
    authorName: 'آلیس جانسون',
    rating: 5,
    title: 'کیفیت واقعی محصولات ارگانیک',
    content:
      'سبزیجات و میوه‌های ارگانیک سبز زمین بهترین گزینه برای کسانی است که به سلامت و محیط‌ زیست اهمیت می‌دهند. طعم محصولات بسیار تازه و طبیعی است و نسبت به رقبا کیفیت بالاتری دارد.',
    createdAt: '2023-07-10T09:15:00Z',
    verifiedPurchase: true,
    helpful: 64,
    images: [],
  },
  {
    id: '4',
    authorId: '4',
    businessId: '2',
    authorName: 'محمد الفاید',
    rating: 4,
    title: 'طعم بی‌نظیر، اما بسته‌بندی جای پیشرفت دارد',
    content:
      'کیفیت مواد غذایی این برند فوق‌العاده است، اما انتظار داشتم بسته‌بندی‌ها کمی پایدارتر باشند. اگر بتوانند از مواد تجزیه‌پذیر بیشتری استفاده کنند، بی‌نقص خواهند شد.',
    createdAt: '2023-08-05T16:20:00Z',
    verifiedPurchase: true,
    helpful: 41,
    images: [],
  },
  {
    id: '5',
    authorId: '5',
    businessId: '1',
    authorName: 'سارا کریمی',
    rating: 3,
    title: 'قابلیت‌ها خوب، اما پشتیبانی می‌توانست بهتر باشد',
    content:
      'سیستم‌های راهکارهای نوین تک عالی کار می‌کنند، اما زمانی که برای مشکل فنی با تیم پشتیبانی تماس گرفتم، پاسخ‌دهی کند بود. امیدوارم پشتیبانی سریع‌تر و مؤثرتر شود.',
    createdAt: '2023-09-12T11:00:00Z',
    verifiedPurchase: true,
    helpful: 29,
    images: [],
  },
  {
    id: '6',
    authorId: '6',
    businessId: '2',
    authorName: 'امیررضا نوری',
    rating: 5,
    title: 'بهترین انتخاب برای سبک زندگی سالم',
    content:
      'من مدت‌هاست که از محصولات این شرکت استفاده می‌کنم و کاملاً راضی هستم. محصولات همیشه تازه و باکیفیت هستند. خرید از آن‌ها حس حمایت از محیط زیست را به من می‌دهد.',
    createdAt: '2023-10-01T08:40:00Z',
    verifiedPurchase: true,
    helpful: 48,
    images: [],
  },
];

// Function to seed reviews if not already present
export function seedReviews() {
  const result = db.prepare(`SELECT COUNT(*) AS count FROM reviews`).get() as {
    count: number;
  };

  if (result.count === 0) {
    console.log('No reviews found, inserting seed data...');

    const stmt = db.prepare(`
      INSERT INTO reviews (
        businessId, authorId, authorName, rating, title, content,
        verifiedPurchase, helpful, images, createdAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const review of items) {
        stmt.run(
          review.businessId,
          review.authorId,
          review.authorName,
          review.rating,
          review.title,
          review.content,
          review.verifiedPurchase ? 1 : 0,
          review.helpful ?? 0,
          JSON.stringify(review.images ?? []),
          review.createdAt ?? new Date().toISOString()
        );
      }
    });

    insertMany(reviews);
    console.log('✅ Seeded initial review data.');
  } else {
    console.log('✅ Reviews already exist, skipping seeding.');
  }
}

// Run the seeding function on app startup
seedReviews();
