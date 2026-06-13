'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCompare } from './CompareProvider';

export default function CompareTray() {
  const { items, remove, clear } = useCompare();
  const pathname = usePathname();

  if (items.length === 0 || pathname === '/compare') return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-divider bg-navy-900/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <span className="spec-label">Compare ({items.length}/4)</span>
        <div className="flex flex-1 flex-wrap gap-2">
          {items.map((i) => (
            <span
              key={i.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-rowalt px-3 py-1 text-sm text-body"
            >
              {i.product_name}
              <button
                onClick={() => remove(i.id)}
                aria-label={`Remove ${i.product_name} from compare`}
                className="text-subdued hover:text-gold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <button onClick={clear} className="text-sm text-subdued hover:text-gold">
          Clear
        </button>
        <Link
          href="/compare"
          className={`btn-primary px-4 py-2 text-sm ${items.length < 2 ? 'pointer-events-none opacity-50' : ''}`}
          aria-disabled={items.length < 2}
        >
          Compare {items.length >= 2 ? `${items.length} products` : ''}
        </Link>
      </div>
    </div>
  );
}
