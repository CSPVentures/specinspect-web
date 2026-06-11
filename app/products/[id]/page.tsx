import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import VerifiedBadge from '@/components/VerifiedBadge';
import ProductActions from './ProductActions';
import { SPEC_FIELDS, hasValue, type Product } from '@/lib/types';

const API_BASE = process.env.SPECINSPECT_API_BASE ?? 'https://api.specinspect.com/api';

async function getProduct(id: string): Promise<Product | null> {
  const headers: Record<string, string> = {};
  const apiKey = process.env.SPECINSPECT_API_KEY;
  if (apiKey) headers['X-API-Key'] = apiKey;
  const token = cookies().get('si_token')?.value;
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(`${API_BASE}/products/${id}`, { headers, next: { revalidate: 300 } });
    if (!res.ok) return null;
    const body = await res.json();
    return (body.product ?? body) as Product;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await getProduct(params.id);
  if (!product) return { title: 'Product not found' };
  return {
    title: `${product.product_name} — ${product.brand}`,
    description: product.description ?? `Specifications for ${product.product_name} by ${product.brand}.`,
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  const specs = SPEC_FIELDS.filter((f) => hasValue(product[f.key]));
  const docs = [
    { label: 'Technical Data Sheet (PDF)', href: product.tds_url },
    { label: 'Source PDF', href: product.source_pdf },
    { label: 'Manufacturer page', href: product.source_url },
  ].filter((d) => hasValue(d.href));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-orange">{product.brand}</p>
          <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold text-navy dark:text-white">
            {product.product_name}
            {product.verified !== false && <VerifiedBadge withLabel />}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-rowalt px-3 py-1 text-sm font-medium dark:bg-white/10 dark:text-slate-300">
              {product.category}
            </span>
            {product.subcategory && (
              <span className="rounded-full bg-rowalt px-3 py-1 text-sm text-subdued dark:bg-white/10">
                {product.subcategory}
              </span>
            )}
          </div>
        </div>
      </div>

      {product.description && (
        <p className="mt-6 leading-relaxed text-body dark:text-slate-300">{product.description}</p>
      )}

      <ProductActions product={product} />

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-navy dark:text-white">Specifications</h2>
        {specs.length === 0 ? (
          <p className="mt-3 text-sm text-subdued">
            Detailed spec fields aren&apos;t available for this product yet. Check the documents below.
          </p>
        ) : (
          <div className="card mt-3 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((f, i) => (
                  <tr key={String(f.key)} className={i % 2 === 1 ? 'bg-rowalt dark:bg-white/5' : ''}>
                    <th scope="row" className="spec-label w-1/3 px-4 py-3 text-left align-top font-normal">
                      {f.label}
                    </th>
                    <td className="px-4 py-3 text-body dark:text-slate-200">
                      {String(product[f.key])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {product.substrate_compatibility && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-navy dark:text-white">Compatible substrates</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.substrate_compatibility.split(',').map((s) => (
              <span key={s.trim()} className="rounded-full bg-rowalt px-3 py-1 text-sm dark:bg-white/10 dark:text-slate-300">
                {s.trim()}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-navy dark:text-white">Documents</h2>
        {docs.length === 0 ? (
          <p className="mt-3 text-sm text-subdued">No documents on file for this product.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {docs.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-orange hover:underline"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
