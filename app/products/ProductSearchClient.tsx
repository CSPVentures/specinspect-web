'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import type { Product, ProductSearchResponse } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

type Sort = 'relevance' | 'az' | 'brand';

export default function ProductSearchClient() {
  const router = useRouter();
  const params = useSearchParams();

  const [q, setQ] = useState(params.get('search') ?? '');
  const [category, setCategory] = useState(params.get('category') ?? '');
  const [brand, setBrand] = useState(params.get('brand') ?? '');
  const [sort, setSort] = useState<Sort>('relevance');
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    api<{ categories: Array<{ category: string; product_count: number }> }>('/categories')
      .then((d) => setCategories((d.categories ?? []).map((c) => c.category)))
      .catch(() => undefined);
    api<{ brands: Array<{ brand: string; product_count: number }> }>('/brands')
      .then((d) => setBrands((d.brands ?? []).map((b) => b.brand)))
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      setLoading(true);
      setError('');
      const sp = new URLSearchParams({ per_page: '25', page: String(page) });
      if (q.trim()) sp.set('search', q.trim());
      if (category) sp.set('category', category);
      if (brand) sp.set('brand', brand);
      try {
        const data = await api<ProductSearchResponse>(`/products/?${sp.toString()}`);
        setResults(data.products ?? []);
        setTotal(data.total ?? 0);
        setTotalPages(data.total_pages ?? 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed.');
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer.current);
  }, [q, category, brand, page]);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q.trim()) sp.set('search', q.trim());
    if (category) sp.set('category', category);
    if (brand) sp.set('brand', brand);
    router.replace(`/products${sp.size ? `?${sp.toString()}` : ''}`, { scroll: false });
  }, [q, category, brand, router]);

  const sorted = [...results].sort((a, b) => {
    if (sort === 'az') return a.product_name.localeCompare(b.product_name);
    if (sort === 'brand') return a.brand.localeCompare(b.brand);
    return 0;
  });

  function setFilter(setter: (v: string) => void, value: string) {
    setter(value);
    setPage(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy dark:text-white">Product search</h1>

      <div className="relative mt-5">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subdued"
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
          placeholder="Search by product name, brand, or keyword…"
          aria-label="Search products"
          className="input py-4 pl-12 text-lg"
        />
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside>
          <div>
            <h2 className="spec-label mb-2">Category</h2>
            <div className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-1">
              <FilterPill active={category === ''} onClick={() => setFilter(setCategory, '')} label="All categories" />
              {categories.map((c) => (
                <FilterPill key={c} active={category === c} onClick={() => setFilter(setCategory, c)} label={c} />
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h2 className="spec-label mb-2">Brand</h2>
            <select
              value={brand}
              onChange={(e) => setFilter(setBrand, e.target.value)}
              aria-label="Filter by brand"
              className="input text-sm"
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </aside>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-subdued" aria-live="polite">
              {loading ? 'Searching…' : `${total.toLocaleString()} products`}
            </p>
            <label className="flex items-center gap-2 text-sm text-subdued">
              Sort
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="input w-auto py-1.5 text-sm"
              >
                <option value="relevance">Relevance</option>
                <option value="az">A–Z</option>
                <option value="brand">Brand</option>
              </select>
            </label>
          </div>

          {error && (
            <div className="card mt-4 p-6 text-center text-sm text-subdued">{error}</div>
          )}
          {!error && !loading && sorted.length === 0 && (
            <div className="card mt-4 p-8 text-center">
              <p className="font-medium text-navy dark:text-white">No products match this search.</p>
              <p className="mt-1 text-sm text-subdued">Try a shorter term or clear the filters.</p>
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sorted.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-3" aria-label="Pagination">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="btn-secondary px-4 py-2 text-sm"
              >
                ← Previous
              </button>
              <span className="font-mono text-sm text-subdued">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Next →
              </button>
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-left text-sm transition-colors lg:rounded-lg ${
        active
          ? 'bg-orange-light font-semibold text-orange dark:bg-orange/15'
          : 'text-body hover:bg-rowalt dark:text-slate-300 dark:hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}
