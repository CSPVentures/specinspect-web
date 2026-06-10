'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import type { Project } from '@/lib/types';
import WeatherWidget from '@/components/WeatherWidget';

const RECENT_KEY = 'si-recent-searches';

export default function DashboardClient({ userName }: { userName: string }) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [recent, setRecent] = useState<string[]>([]);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [projectsError, setProjectsError] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecent(JSON.parse(stored));
    } catch { /* ignore */ }
    api<{ projects: Project[] } | Project[]>('/projects')
      .then((data) => setProjects(Array.isArray(data) ? data : data.projects ?? []))
      .catch(() => setProjectsError('Could not load projects.'));
  }, []);

  const specCount = useMemo(
    () => (projects ?? []).reduce((sum, p) => sum + (p.item_count ?? p.items?.length ?? 0), 0),
    [projects],
  );

  function search(term: string) {
    const value = term.trim();
    if (!value) return;
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 8);
    setRecent(next);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch { /* ignore */ }
    router.push(`/products?search=${encodeURIComponent(value)}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy dark:text-white">
        Welcome back, {userName.split(' ')[0]}
      </h1>

      <form
        onSubmit={(e) => { e.preventDefault(); search(q); }}
        className="relative mt-6"
      >
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

      {recent.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="spec-label">Recent</span>
          {recent.map((r) => (
            <button
              key={r}
              onClick={() => search(r)}
              className="rounded-full bg-rowalt px-3 py-1 text-sm text-body transition-colors hover:bg-orange-light hover:text-orange dark:bg-white/10 dark:text-slate-300 dark:hover:bg-orange/15"
            >
              {r}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card p-5">
          <p className="spec-label">Saved specs</p>
          <p className="mt-1 text-3xl font-bold text-navy dark:text-white">
            {projects === null ? '—' : specCount}
          </p>
        </div>
        <div className="card p-5">
          <p className="spec-label">Projects</p>
          <p className="mt-1 text-3xl font-bold text-navy dark:text-white">
            {projects === null ? '—' : projects.length}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy dark:text-white">Saved projects</h2>
            <Link href="/projects" className="text-sm font-medium text-orange hover:underline">
              View all →
            </Link>
          </div>
          {projectsError && <p className="mt-3 text-sm text-subdued">{projectsError}</p>}
          {projects && projects.length === 0 && (
            <div className="card mt-3 p-6 text-center">
              <p className="text-subdued">No projects yet. Save a spec to start your first one.</p>
              <Link href="/products" className="btn-primary mt-4">Search products</Link>
            </div>
          )}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {(projects ?? []).slice(0, 4).map((p) => (
              <Link key={p.id} href={`/projects/${p.id}`} className="card p-4 hover:shadow-cardHover">
                <h3 className="font-semibold text-navy dark:text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-subdued">
                  {p.item_count ?? p.items?.length ?? 0} specs
                  {p.updated_at && ` · updated ${new Date(p.updated_at).toLocaleDateString()}`}
                </p>
              </Link>
            ))}
          </div>
        </section>
        <WeatherWidget />
      </div>
    </div>
  );
}
