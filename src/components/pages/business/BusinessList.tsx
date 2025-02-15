import type { IBusiness } from '@/types/business';
import BusinessCard from './BusinessCard';
const businesses: IBusiness[] = [
  {
    id: '1',
    name: 'Acme Corp',
    websiteUrl: 'https://www.acmecorp.com',
    instagram: '@acmecorp',
    score: 1.6,
    category: 'Technology',
  },
  {
    id: '2',
    name: 'Beta Innovations',
    websiteUrl: 'https://www.betainnovations.com',
    instagram: '@betainnovations',
    score: 2.5,
    category: 'Finance',
  },
  {
    id: '3',
    name: 'Gamma Enterprises',
    websiteUrl: 'https://www.gammaenterprises.com',
    instagram: '@gammaenterprises',
    score: 4.5,
    category: 'Healthcare',
  },
  {
    id: '4',
    name: 'Delta Solutions',
    websiteUrl: 'https://www.deltasolutions.com',
    instagram: '@deltasolutions',
    score: 4.1,
    category: 'Marketing',
  },
  {
    id: '5',
    name: 'Omega Industries',
    websiteUrl: 'https://www.omegaindustries.com',
    instagram: '@omegaindustries',
    score: 3.8,
    category: 'Manufacturing',
  },
  {
    id: '6',
    name: 'Sigma Technologies',
    websiteUrl: 'https://www.sigmatechnologies.com',
    instagram: '@sigmatechnologies',
    score: 4.7,
    category: 'Software Development',
  },
  {
    id: '7',
    name: 'Zeta Labs',
    websiteUrl: 'https://www.zetalabs.com',
    instagram: '@zetalabs',
    score: 2.9,
    category: 'Research',
  },
  {
    id: '8',
    name: 'Epsilon Enterprises',
    websiteUrl: 'https://www.epsilonenterprises.com',
    instagram: '@epsilonenterprises',
    score: 3.4,
    category: 'Consulting',
  },
  {
    id: '9',
    name: 'Theta Solutions',
    websiteUrl: 'https://www.thetasolutions.com',
    instagram: '@thetasolutions',
    score: 4.2,
    category: 'Finance',
  },
  {
    id: '10',
    name: 'Kappa Corporation',
    websiteUrl: 'https://www.kappacorp.com',
    instagram: '@kappacorp',
    score: 3.1,
    category: 'Retail',
  },
];

export default function BusinessList({ className }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {businesses.map((business) => (
        <BusinessCard key={business.id} business={business} />
      ))}
    </div>
  );
}
