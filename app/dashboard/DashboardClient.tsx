'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User, Project } from '@/lib/types';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

async function handleManageSubscription(userId: string) {
  const res = await fetch('/api/subscriptions/portal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userId }),
  });
  const data = await res.json();
  if (data.portal_url) window.location.href = data.portal_url;
}

export default function DashboardClient({
  user,
  isPro,
  projects,
}: {
  user: User;
  isPro: boolean;
  projects: Project[];
}) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [manageLoading, setManageLoading] = useState(false);

  const firstName = user.full_name?.split(' ')[0] ?? 'there';
  const greeting = getGreeting();

  const specCount = useMemo(
    () => projects.reduce((sum, p) => sum + (p.item_count ?? p.items?.length ?? 0), 0),
    [projects],
  );

  function search(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/products?search=${encodeURIComponent(q.trim())}`);
  }

  async function onManage() {
    setManageLoading(true);
    await handleManageSubscription(user.id);
    setManageLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Hero placeholder */}
      <div className="mb-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center h-32">
        <p className="text-slate-500 text-sm">Photo: dashboard-hero.jpg — wide shot for welcome banner</p>
      </div>

      {/* Header + plan badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {greeting}, {firstName}
          </h1>
          <p className="mt-1 text-sm text-subdued">Here's what's happening with your projects.</p>
        </div>
        <div className="flex items-center gap-3">
          {isPro ? (
            <>
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full text-sm font-medium">
                Pro Plan ✦
              </span>
              <button
                onClick={onManage}
                disabled={manageLoading}
                className="btn-secondary text-sm px-4 py-2"
              >
                {manageLoading ? 'Loading…' : 'Manage Subscription'}
              </button>
            </>
          ) : (
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm font-medium">
              Free Plan
            </span>
          )}
        </div>
      </div>

      {/* Upgrade CTA for free users */}
      {!isPro && (
        <div className="card p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-orange/30">
          <div>
            <p className="font-semibold text-white">Unlock submittal PDFs, unlimited projects & more</p>
            <p className="mt-1 text-sm text-subdued">Upgrade to Pro for $29/month — or $290/year.</p>
          </div>
          <Link href="/pricing" className="btn-primary shrink-0">
            Upgrade to Pro
          </Link>
        </div>
      )}

      {/* Search */}
      <form onSubmit={search} className="relative mb-8">
        <svg
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subdued"
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, brands, categories…"
          aria-label="Search products"
          className="input py-4 pl-12 text-lg"
        />
      </form>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3 mb-8">
        <Link href="/products" className="btn-secondary text-sm">
          Search Products
        </Link>
        <Link href="/projects" className="btn-secondary text-sm">
          New Project
        </Link>
        <Link href="/weather" className="btn-secondary text-sm">
          Weather Check
        </Link>
        <Link href="/compare" className="btn-secondary text-sm">
          Compare Specs
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        <div className="card p-5">
          <p className="spec-label">Saved specs</p>
          <p className="mt-1 text-3xl font-bold text-white">{specCount}</p>
        </div>
        <div className="card p-5">
          <p className="spec-label">Projects</p>
          <p className="mt-1 text-3xl font-bold text-white">{projects.length}</p>
        </div>
      </div>

      {/* Recent projects */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Recent projects</h2>
          <Link href="/projects" className="text-sm font-medium text-orange hover:underline">
            View all →
          </Link>
        </div>
        {projects.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="text-subdued">No projects yet. Search for products to build your first one.</p>
            <Link href="/products" className="btn-primary mt-4">Search products</Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 5).map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="card p-4 hover:shadow-cardHover">
                <h3 className="font-semibold text-white truncate">{p.name}</h3>
                <p className="mt-1 text-sm text-subdued">
                  {p.item_count ?? p.items?.length ?? 0} specs
                  {p.updated_at && ` · ${new Date(p.updated_at).toLocaleDateString()}`}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
