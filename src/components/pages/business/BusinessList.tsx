'use client';

import type { IBusiness } from '@/types/business';
import BusinessCard from './BusinessCard';

const businessesFa: IBusiness[] = [
  {
    id: '2',
    name: 'مزرعه دره سبز',
    websiteUrl: 'https://www.greenvalleyfarms.com',
    instagram: '@greenvalleyfarms',
    score: 4.2,
    category: 'کشاورزی',
  },
  {
    id: '3',
    name: 'طراحی‌های اقیانوس آبی',
    websiteUrl: 'https://www.blueoceandesigns.com',
    instagram: '@blueoceandesigns',
    score: 3.8,
    category: 'طراحی',
  },
  {
    id: '4',
    name: 'نانوایی طلوع',
    websiteUrl: 'https://www.sunrisebakery.com',
    instagram: '@sunrisebakery',
    score: 4.5,
    category: 'غذا و نوشیدنی',
  },
  {
    id: '5',
    name: 'نوآوران فناوری',
    websiteUrl: 'https://www.techinnovators.com',
    instagram: '@techinnovators',
    score: 2.9,
    category: 'تکنولوژی',
  },
];

export default function BusinessList({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {businessesFa.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
