'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { Product } from '@/lib/types';

interface CompareItem {
  id: string;
  product_name: string;
  brand: string;
}

interface CompareCtx {
  items: CompareItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

const Ctx = createContext<CompareCtx | null>(null);
const KEY = 'si-compare';
const MAX = 4;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const persist = useCallback((next: CompareItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch { /* ignore */ }
  }, []);

  const add = useCallback(
    (p: Product) => {
      setItems((prev) => {
        if (prev.some((i) => i.id === p.id) || prev.length >= MAX) return prev;
        const next = [...prev, { id: p.id, product_name: p.product_name, brand: p.brand }];
        try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
        return next;
      });
    },
    [],
  );

  const remove = useCallback(
    (id: string) => persist(items.filter((i) => i.id !== id)),
    [items, persist],
  );
  const clear = useCallback(() => persist([]), [persist]);
  const has = useCallback((id: string) => items.some((i) => i.id === id), [items]);

  return <Ctx.Provider value={{ items, add, remove, clear, has }}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCompare must be used inside CompareProvider');
  return ctx;
}
