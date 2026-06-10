'use client';

import Link from 'next/link';
import type { Product } from '@/lib/types';
import VerifiedBadge from './VerifiedBadge';
import { useCompare } from './CompareProvider';

export default function ProductCard({
  product,
  onRemove,
}: {
  product: Product;
  onRemove?: () => void;
}) {
  const { add, has, items } = useCompare();
  const inCompare = has(product.id);

  return (
    <div className="card group p-4 hover:shadow-cardHover">
      <div className="flex items-start justify-between gap-2">
        <Link href={`/products/${product.id}`} className="min-w-0">
          <h3 className="flex items-center gap-1.5 font-semibold text-navy group-hover:text-orange dark:text-white">
            <span className="truncate">{product.product_name}</span>
            {product.verified !== false && <VerifiedBadge />}
          </h3>
          <p className="mt-0.5 text-sm text-subdued">{product.brand}</p>
        </Link>
        {onRemove && (
          <button
            onClick={onRemove}
            aria-label={`Remove ${product.product_name}`}
            className="rounded-lg p-1.5 text-subdued transition-colors hover:bg-orange-light hover:text-orange dark:hover:bg-white/10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" />
            </svg>
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-rowalt px-2.5 py-0.5 text-xs font-medium text-body dark:bg-white/10 dark:text-slate-300">
          {product.category}
        </span>
        {product.subcategory && (
          <span className="rounded-full bg-rowalt px-2.5 py-0.5 text-xs text-subdued dark:bg-white/10">
            {product.subcategory}
          </span>
        )}
        {!onRemove && (
          <button
            onClick={() => add(product)}
            disabled={inCompare || items.length >= 4}
            className="ml-auto text-xs font-medium text-subdued transition-colors hover:text-orange disabled:opacity-40"
          >
            {inCompare ? 'In compare' : '+ Compare'}
          </button>
        )}
      </div>
    </div>
  );
}
