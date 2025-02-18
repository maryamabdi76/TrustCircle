import type { IReview } from '@/types/review';

export const reviews: IReview[] = [
  {
    id: '1',
    authorId: '1',
    businessId: '1',
    authorName: 'John Doe',
    authorNameFA: 'جان دو',
    rating: 5,
    title: 'Excellent service and cutting-edge solutions',
    titleFA: 'خدمات عالی و راه‌حل‌های پیشرفته',
    content:
      'TechNova Solutions provided us with state-of-the-art AI solutions that significantly improved our business processes. Their team was professional and responsive throughout the project.',
    contentFA:
      'راهکارهای نوین تک راه‌حل‌های هوش مصنوعی پیشرفته‌ای را ارائه داد که به طور قابل توجهی فرآیندهای کسب و کار ما را بهبود بخشید. تیم آنها در طول پروژه حرفه‌ای و پاسخگو بودند.',
    date: '2023-05-15T10:30:00Z',
    verifiedPurchase: true,
    helpful: 42,
  },
  {
    id: '2',
    authorId: '1',
    businessId: '1',
    authorName: 'Jane Smith',
    authorNameFA: 'جین اسمیت',
    rating: 4,
    title: 'Great products, slight delay in delivery',
    titleFA: 'محصولات عالی، تأخیر اندک در تحویل',
    content:
      'The cloud solutions we purchased from TechNova are top-notch and have greatly enhanced our infrastructure. However, there was a slight delay in the implementation which caused some inconvenience.',
    contentFA:
      'راه‌حل‌های ابری که از راهکارهای نوین تک خریداری کردیم بسیار عالی هستند و زیرساخت ما را به شدت بهبود بخشیده‌اند. با این حال، تأخیر کمی در اجرا وجود داشت که باعث کمی ناراحتی شد.',
    date: '2023-06-02T14:45:00Z',
    verifiedPurchase: true,
    helpful: 28,
  },
  {
    id: '3',
    authorId: '1',
    businessId: '2',
    authorName: 'Alice Johnson',
    authorNameFA: 'آلیس جانسون',
    rating: 5,
    title: 'Delicious and truly organic products',
    titleFA: 'محصولات خوشمزه و واقعاً ارگانیک',
    content:
      "Green Earth Organics has the best organic produce I've ever tasted. Their commitment to sustainability is evident in every product. I especially love their heirloom tomatoes!",
    contentFA:
      'ارگانیک سبز زمین بهترین محصولات ارگانیکی است که تا به حال چشیده‌ام. تعهد آنها به پایداری در هر محصول مشهود است. من به خصوص گوجه‌فرنگی‌های اصیل آنها را دوست دارم!',
    date: '2023-07-10T09:15:00Z',
    verifiedPurchase: true,
    helpful: 56,
  },
  {
    id: '4',
    authorId: '1',
    businessId: '2',
    authorName: 'Mohammed Al-Fayed',
    authorNameFA: 'محمد الفاید',
    rating: 4,
    title: 'Great products, but packaging could be improved',
    titleFA: 'محصولات عالی، اما بسته‌بندی می‌تواند بهبود یابد',
    content:
      "I love the quality and taste of Green Earth Organics' products. However, I think they could improve their packaging to be even more eco-friendly. Overall, still a great company!",
    contentFA:
      'من کیفیت و طعم محصولات ارگانیک سبز زمین را دوست دارم. با این حال، فکر می‌کنم می‌توانند بسته‌بندی خود را حتی سازگارتر با محیط زیست بهبود دهند. در کل، هنوز هم شرکت عالی است!',
    date: '2023-08-05T16:20:00Z',
    verifiedPurchase: true,
    helpful: 37,
  },
];
