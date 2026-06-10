'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import type { Product, ProductSearchResponse } from '@/lib/types';

export default function LiveSearchDemo() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timer.current);
    if (!q.trim()) {
      setResults([]);
      setError('');
      return;
    }
    timer.current = setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api<ProductSearchResponse>(
          `/products/?search=${encodeURIComponent(q.trim())}&per_page=6&page=1`,
        );
        setResults(data.products ?? []);
      } catch {
        setError('Search is unavailable right now. Try again in a moment.');
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer.current);
  }, [q]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="relative">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try “TPO membrane” or “polyurethane sealant”…"
          aria-label="Search the product database"
          className="w-full rounded-xl border border-white/15 bg-white/10 py-4 pl-12 pr-4 text-lg text-white placeholder:text-slate-400 backdrop-blur focus:border-orange"
        />
        {loading && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-xs text-slate-400">
            searching…
          </span>
        )}
      </div>

      {(results.length > 0 || error) && (
        <div className="mt-2 overflow-hidden rounded-xl border border-white/15 bg-navy-900 text-left shadow-cardHover">
          {error && <p className="px-4 py-3 text-sm text-slate-400">{error}</p>}
          {results.map((p) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 transition-colors last:border-0 hover:bg-white/5"
            >
              <span className="truncate font-medium text-white">{p.product_name}</span>
              <span className="shrink-0 font-mono text-xs text-slate-400">
                {p.brand} · {p.category}
              </span>
            </Link>
          ))}
          {results.length > 0 && (
            <Link
              href={`/products?search=${encodeURIComponent(q)}`}
              className="block px-4 py-3 text-center text-sm font-semibold text-orange hover:bg-white/5"
            >
              See all results →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
