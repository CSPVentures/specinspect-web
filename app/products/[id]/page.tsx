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
  const hasTds = product.tds_url && !product.tds_url_na;
  const hasSourcePdf = product.source_pdf && product.source_pdf !== product.tds_url;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-gold">{product.brand}</p>
          <h1 className="mt-1 flex items-center gap-2 text-3xl font-bold text-white">
            {product.product_name}
            {product.verified !== false && <VerifiedBadge withLabel />}
          </h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-rowalt px-3 py-1 text-sm font-medium text-body">
              {product.category}
            </span>
            {product.subcategory && (
              <span className="rounded-full bg-rowalt px-3 py-1 text-sm text-subdued">
                {product.subcategory}
              </span>
            )}
            {product.discontinued && (
              <span className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-400 border border-red-500/20">
                Discontinued
              </span>
            )}
          </div>
        </div>
      </div>

      {product.description && (
        <p className="mt-6 leading-relaxed text-body">{product.description}</p>
      )}

      <ProductActions product={product} />

      {/* PDF / Document Buttons */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-3">Documents</h2>
        <div className="flex flex-wrap gap-3">
          {hasTds ? (
            <a
              href={product.tds_url!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View TDS
            </a>
          ) : (
            <span className="text-slate-500 text-sm self-center">No TDS available</span>
          )}
          {hasSourcePdf && (
            <a
              href={product.source_pdf!}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 2v6h6" />
              </svg>
              View Source PDF
            </a>
          )}
          {product.source_url && (
            <a
              href={product.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Manufacturer Page
            </a>
          )}
        </div>
      </section>

      {/* Spec Table */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-white">Specifications</h2>
        {specs.length === 0 ? (
          <p className="mt-3 text-sm text-subdued">
            Detailed spec fields aren&apos;t available for this product yet. Check the documents above.
          </p>
        ) : (
          <div className="card mt-3 overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {specs.map((f, i) => (
                  <tr key={String(f.key)} className={i % 2 === 1 ? 'bg-rowalt' : ''}>
                    <th scope="row" className="spec-label w-1/3 px-4 py-3 text-left align-top font-normal">
                      {f.label}
                    </th>
                    <td className="px-4 py-3 text-body">
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
          <h2 className="text-lg font-semibold text-white">Compatible substrates</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.substrate_compatibility.split(',').map((s) => (
              <span key={s.trim()} className="rounded-full bg-rowalt px-3 py-1 text-sm text-body">
                {s.trim()}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
