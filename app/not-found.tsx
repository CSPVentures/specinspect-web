import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-mono text-sm text-subdued">404</p>
      <h1 className="mt-2 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-subdued">That page doesn&apos;t exist. Try a search instead.</p>
      <Link href="/products" className="btn-primary mt-6">Search products</Link>
    </div>
  );
}
