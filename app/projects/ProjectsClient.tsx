'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Project } from '@/lib/types';

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', project_address: '' });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    api<{ projects: Project[] } | Project[]>('/projects')
      .then((d) => setProjects(Array.isArray(d) ? d : d.projects ?? []))
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load projects.'));
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setCreateError('Give the project a name.');
      return;
    }
    setCreating(true);
    setCreateError('');
    try {
      const created = await api<Project>('/projects', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      setProjects((prev) => [created, ...(prev ?? [])]);
      setModalOpen(false);
      setForm({ name: '', description: '', project_address: '' });
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Could not create project.');
    } finally {
      setCreating(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Delete this project and its saved specs?')) return;
    const prev = projects;
    setProjects((p) => (p ?? []).filter((x) => x.id !== id)); // optimistic
    try {
      await api(`/projects/${id}`, { method: 'DELETE' });
    } catch {
      setProjects(prev); // roll back
      setError('Could not delete the project. Try again.');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-navy dark:text-white">Projects</h1>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          + New project
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-orange">{error}</p>}
      {projects === null && !error && <p className="mt-6 text-subdued">Loading projects…</p>}
      {projects?.length === 0 && (
        <div className="card mt-6 p-10 text-center">
          <h2 className="font-semibold text-navy dark:text-white">No projects yet</h2>
          <p className="mt-1 text-sm text-subdued">
            Create a project, then save specs to it from any product page.
          </p>
          <button onClick={() => setModalOpen(true)} className="btn-primary mt-5">
            Create your first project
          </button>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {(projects ?? []).map((p) => (
          <div key={p.id} className="card group relative p-5 hover:shadow-cardHover">
            <Link href={`/projects/${p.id}`} className="block">
              <h2 className="pr-8 font-semibold text-navy group-hover:text-orange dark:text-white">
                {p.name}
              </h2>
              {p.project_address && (
                <p className="mt-0.5 truncate text-sm text-subdued">{p.project_address}</p>
              )}
              <p className="mt-3 font-mono text-xs text-subdued">
                {p.item_count ?? p.items?.length ?? 0} specs
                {p.updated_at && ` · updated ${new Date(p.updated_at).toLocaleDateString()}`}
              </p>
            </Link>
            <button
              onClick={() => remove(p.id)}
              aria-label={`Delete ${p.name}`}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-subdued opacity-0 transition-opacity hover:text-orange focus-visible:opacity-100 group-hover:opacity-100"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="new-project-title"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <form onSubmit={create} className="card w-full max-w-md p-6">
            <h2 id="new-project-title" className="text-lg font-semibold text-navy dark:text-white">
              New project
            </h2>
            {createError && <p className="mt-2 text-sm text-orange">{createError}</p>}
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="p-name" className="label">Project name</label>
                <input
                  id="p-name" autoFocus className="input" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="33-23 Union Street Facade"
                />
              </div>
              <div>
                <label htmlFor="p-addr" className="label">Project address (optional)</label>
                <input
                  id="p-addr" className="input" value={form.project_address}
                  onChange={(e) => setForm({ ...form, project_address: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="p-desc" className="label">Description (optional)</label>
                <textarea
                  id="p-desc" rows={3} className="input" value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setModalOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button className="btn-primary" disabled={creating}>
                {creating ? 'Creating…' : 'Create project'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
