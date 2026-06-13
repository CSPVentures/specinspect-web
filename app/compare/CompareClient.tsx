'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { SPEC_FIELDS, hasValue, type Product } from '@/lib/types';
import { useCompare } from '@/components/CompareProvider';
import VerifiedBadge from '@/components/VerifiedBadge';

export default function CompareClient() {
  const { items, remove } = useCompare();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (items.length === 0) {
        setProducts([]);
        return;
      }
      setLoading(true);
      const loaded = await Promise.all(
        items.map((i) =>
          api<Product | { product: Product }>(`/products/${i.id}`)
            .then((d) => ('product' in d ? d.product : d))
            .catch(() => null),
        ),
      );
      if (!cancelled) {
        setProducts(loaded.filter((p): p is Product => p !== null));
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [items]);

  if (items.length < 2) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Compare products</h1>
        <p className="mt-2 text-subdued">
          Add 2–4 products to the compare tray from search results or product pages, then come back here.
        </p>
        <Link href="/products" className="btn-primary mt-6">Search products</Link>
      </div>
    );
  }

  const rows = SPEC_FIELDS.filter((f) => products.some((p) => hasValue(p[f.key])));

  function differs(key: keyof Product): boolean {
    const values = products.map((p) => (hasValue(p[key]) ? String(p[key]) : '—'));
    return new Set(values).size > 1;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">Compare products</h1>
      <p className="mt-1 text-sm text-subdued">Differences are highlighted in orange.</p>
      {loading && <p className="mt-4 text-subdued">Loading specs…</p>}

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-44 p-3 text-left align-bottom">
                <span className="spec-label">Spec field</span>
              </th>
              {products.map((p) => (
                <th key={p.id} className="card rounded-b-none p-4 text-left align-top">
                  <div className="flex items-start justify-between gap-2">
                    <Link href={`/products/${p.id}`} className="min-w-0">
                      <span className="flex items-center gap-1.5 font-semibold text-white hover:text-orange">
                        <span className="truncate">{p.product_name}</span>
                        {p.verified !== false && <VerifiedBadge />}
                      </span>
                      <span className="mt-0.5 block text-xs font-normal text-subdued">
                        {p.brand} · {p.category}
                      </span>
                    </Link>
                    <button
                      onClick={() => remove(p.id)}
                      aria-label={`Remove ${p.product_name} from comparison`}
                      className="text-subdued hover:text-orange"
                    >
                      ×
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((f, i) => {
              const highlight = differs(f.key);
              return (
                <tr key={String(f.key)} className={i % 2 === 1 ? 'bg-rowalt' : ''}>
                  <th scope="row" className="spec-label p-3 text-left align-top font-normal">
                    {f.label}
                  </th>
                  {products.map((p) => (
                    <td
                      key={p.id}
                      className={`border-l border-divider p-3 align-top ${
                        highlight
                          ? 'bg-orange/10 font-medium text-orange'
                          : 'text-body'
                      }`}
                    >
                      {hasValue(p[f.key]) ? String(p[f.key]) : <span className="text-subdued">—</span>}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {items.length < 4 && (
        <Link href="/products" className="btn-secondary mt-6">
          + Add another product
        </Link>
      )}
    </div>
  );
}
