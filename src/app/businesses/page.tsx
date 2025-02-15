import BusinessFilters from '@/components/pages/business/BusinessFilters';
import BusinessList from '@/components/pages/business/BusinessList';

export default function BusinessesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Businesses</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <BusinessFilters className="w-full md:w-1/4" />
        <BusinessList className="w-full md:w-3/4" />
      </div>
    </div>
  );
}
