'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Product, Project } from '@/lib/types';
import ProductCard from '@/components/ProductCard';

export default function ProjectDetailClient({ id, isPro }: { id: string; isPro: boolean }) {
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [edit, setEdit] = useState({ name: '', description: '', project_address: '' });
  const [pdfModal, setPdfModal] = useState(false);
  const [pdfFields, setPdfFields] = useState({ submitted_to: '', submitted_by: '', submittal_number: '' });
  const [pdfBusy, setPdfBusy] = useState(false);
  const [pdfError, setPdfError] = useState('');

  useEffect(() => {
    api<Project>(`/projects/${id}`)
      .then((p) => {
        setProject(p);
        setEdit({
          name: p.name ?? '',
          description: p.description ?? '',
          project_address: p.project_address ?? '',
        });
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load this project.'));
  }, [id]);

  async function saveEdits() {
    if (!project) return;
    const prev = project;
    setProject({ ...project, ...edit });
    setEditing(false);
    try {
      await api(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(edit) });
    } catch {
      setProject(prev);
      setError('Could not save changes.');
    }
  }

  async function removeItem(productId: string) {
    if (!project) return;
    const prev = project;
    setProject({ ...project, items: (project.items ?? []).filter((i) => i.id !== productId) });
    try {
      await api(`/projects/${id}/items/${productId}`, { method: 'DELETE' });
    } catch {
      setProject(prev);
      setError('Could not remove that spec.');
    }
  }

  async function generatePdf(e: React.FormEvent) {
    e.preventDefault();
    setPdfBusy(true);
    setPdfError('');
    try {
      const qs = new URLSearchParams();
      Object.entries(pdfFields).forEach(([k, v]) => v.trim() && qs.set(k, v.trim()));
      const res = await fetch(`/api/submittal/${id}/submittal${qs.size ? `?${qs}` : ''}`);
      if (!res.ok) throw new Error('PDF generation failed. Try again.');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(project?.name ?? 'submittal').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-submittal.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setPdfModal(false);
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : 'PDF generation failed.');
    } finally {
      setPdfBusy(false);
    }
  }

  if (error && !project) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="text-xl font-bold text-white">Project unavailable</h1>
        <p className="mt-2 text-subdued">{error}</p>
        <Link href="/projects" className="btn-primary mt-6">Back to projects</Link>
      </div>
    );
  }
  if (!project) return <div className="mx-auto max-w-7xl px-4 py-10 text-subdued">Loading project…</div>;

  const items: Product[] = project.items ?? [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Link href="/projects" className="text-sm text-subdued hover:text-orange">← All projects</Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="max-w-lg space-y-3">
              <input
                className="input text-xl font-bold" value={edit.name} aria-label="Project name"
                onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              />
              <input
                className="input" value={edit.project_address} aria-label="Project address"
                placeholder="Project address"
                onChange={(e) => setEdit({ ...edit, project_address: e.target.value })}
              />
              <textarea
                className="input" rows={2} value={edit.description} aria-label="Project description"
                placeholder="Description"
                onChange={(e) => setEdit({ ...edit, description: e.target.value })}
              />
              <div className="flex gap-2">
                <button onClick={saveEdits} className="btn-primary px-4 py-2 text-sm">Save changes</button>
                <button onClick={() => setEditing(false)} className="btn-secondary px-4 py-2 text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="flex items-center gap-3 text-2xl font-bold text-white">
                {project.name}
                <button
                  onClick={() => setEditing(true)}
                  aria-label="Edit project details"
                  className="rounded-lg p-1.5 text-subdued hover:text-orange"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" />
                  </svg>
                </button>
              </h1>
              {project.project_address && <p className="mt-1 text-subdued">{project.project_address}</p>}
              {project.description && <p className="mt-2 max-w-2xl text-sm text-subdued">{project.description}</p>}
            </>
          )}
        </div>

        {/* Submittal PDF button — Pro only */}
        <div className="flex flex-col items-end gap-2">
          {isPro ? (
            <button
              onClick={() => setPdfModal(true)}
              disabled={items.length === 0}
              className="btn-primary px-6 py-3 text-base"
            >
              {pdfBusy ? 'Generating PDF…' : 'Generate Submittal PDF'}
            </button>
          ) : (
            <div className="text-right">
              <button
                disabled
                className="btn-secondary px-6 py-3 text-base opacity-50 cursor-not-allowed"
                aria-disabled="true"
              >
                Generate Submittal PDF
              </button>
              <p className="mt-1 text-xs text-subdued">
                Pro feature —{' '}
                <Link href="/pricing" className="text-orange hover:underline">Upgrade to generate submittals</Link>
              </p>
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-orange">{error}</p>}

      <section className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Saved specs ({items.length})</h2>
          <Link href="/products" className="btn-secondary text-sm px-4 py-2">
            + Add Products
          </Link>
        </div>
        {items.length === 0 ? (
          <div className="card p-8 text-center">
            <p className="text-subdued">No specs saved yet. Find products and save them here.</p>
            <Link href="/products" className="btn-primary mt-4">Search products</Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} onRemove={() => removeItem(p.id)} />
            ))}
          </div>
        )}
      </section>

      {isPro && pdfModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 p-4"
          role="dialog" aria-modal="true" aria-labelledby="pdf-title"
          onClick={(e) => e.target === e.currentTarget && setPdfModal(false)}
        >
          <form onSubmit={generatePdf} className="card w-full max-w-md p-6">
            <h2 id="pdf-title" className="text-lg font-semibold text-white">Submittal details</h2>
            <p className="mt-1 text-sm text-subdued">All fields optional — leave blank to skip.</p>
            {pdfError && <p className="mt-2 text-sm text-orange">{pdfError}</p>}
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="s-to" className="label">Submitted to</label>
                <input
                  id="s-to" className="input" value={pdfFields.submitted_to}
                  onChange={(e) => setPdfFields({ ...pdfFields, submitted_to: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="s-by" className="label">Submitted by</label>
                <input
                  id="s-by" className="input" value={pdfFields.submitted_by}
                  onChange={(e) => setPdfFields({ ...pdfFields, submitted_by: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="s-num" className="label">Submittal number</label>
                <input
                  id="s-num" className="input" value={pdfFields.submittal_number}
                  onChange={(e) => setPdfFields({ ...pdfFields, submittal_number: e.target.value })}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" onClick={() => setPdfModal(false)} className="btn-secondary">Cancel</button>
              <button className="btn-primary" disabled={pdfBusy}>
                {pdfBusy ? 'Generating…' : 'Download PDF'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
