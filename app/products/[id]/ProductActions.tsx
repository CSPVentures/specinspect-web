'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Product, Project } from '@/lib/types';
import { useCompare } from '@/components/CompareProvider';

export default function ProductActions({ product }: { product: Product }) {
  const { add, has, items } = useCompare();
  const [projects, setProjects] = useState<Project[]>([]);
  const [authed, setAuthed] = useState(false);
  const [saveOpen, setSaveOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api<{ projects: Project[] } | Project[]>('/projects')
      .then((d) => {
        setProjects(Array.isArray(d) ? d : d.projects ?? []);
        setAuthed(true);
      })
      .catch(() => setAuthed(false));
  }, []);

  async function saveTo(projectId: string, projectName: string) {
    setBusy(true);
    setMessage('');
    try {
      await api(`/projects/${projectId}/items`, {
        method: 'POST',
        body: JSON.stringify({ product_id: product.id }),
      });
      setMessage(`Saved to ${projectName}.`);
      setSaveOpen(false);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not save.');
    } finally {
      setBusy(false);
    }
  }

  async function flag() {
    setBusy(true);
    setMessage('');
    try {
      await api(`/products/${product.id}/flag`, { method: 'POST', body: JSON.stringify({}) });
      setMessage('Flagged for review. Thanks — our team will take a look.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not flag this product.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <button
            onClick={() => (authed ? setSaveOpen((v) => !v) : (window.location.href = '/login'))}
            className="btn-primary"
            disabled={busy}
          >
            Save to project
          </button>
          {saveOpen && (
            <div className="absolute left-0 top-full z-20 mt-2 w-64 overflow-hidden rounded-xl border border-divider bg-navy-900 shadow-cardHover">
              {projects.length === 0 ? (
                <p className="px-4 py-3 text-sm text-subdued">
                  No projects yet — create one on the Projects page first.
                </p>
              ) : (
                projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => saveTo(p.id, p.name)}
                    className="block w-full px-4 py-2.5 text-left text-sm text-body transition-colors hover:bg-gold/10 hover:text-gold"
                  >
                    {p.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => add(product)}
          disabled={has(product.id) || items.length >= 4}
          className="btn-secondary"
        >
          {has(product.id) ? 'In compare' : 'Add to compare'}
        </button>
        <button onClick={flag} disabled={busy} className="btn-secondary">
          Flag for review
        </button>
      </div>
      {message && (
        <p role="status" className="mt-3 text-sm font-medium text-gold">{message}</p>
      )}
    </div>
  );
}
