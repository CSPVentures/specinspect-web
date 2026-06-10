import type { Metadata } from 'next';
import { Suspense } from 'react';
import ProductSearchClient from './ProductSearchClient';

export const metadata: Metadata = {
  title: 'Product search',
  description: 'Search 30,000+ verified building material products by name, brand, and category.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10 text-subdued">Loading search…</div>}>
      <ProductSearchClient />
    </Suspense>
  );
}
