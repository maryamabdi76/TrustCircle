'use client';

import { useState, useEffect } from 'react';
import BusinessCard from './BusinessCard';
import { useBusinesses } from '@/hooks/useBusinesses';

export default function BusinessList({ className }: { className?: string }) {
  const { loading, fetchBusinesses } = useBusinesses();
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    async function loadBusinesses() {
      const { businesses } = await fetchBusinesses();
      setBusinesses(businesses);
    }

    loadBusinesses();
  }, [fetchBusinesses]);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      {loading ? (
        <p>Loading...</p>
      ) : businesses.length === 0 ? (
        <p>No Businesses exist</p>
      ) : (
        businesses.map((business, index) => (
          <BusinessCard key={index} business={business} />
        ))
      )}
    </div>
  );
}
