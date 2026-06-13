import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="font-mono text-sm text-subdued">404</p>
      <h1 className="mt-2 text-2xl font-bold text-white">Product not found</h1>
      <p className="mt-2 text-subdued">
        This product may have been removed, or the link is incorrect.
      </p>
      <Link href="/products" className="btn-primary mt-6">Back to search</Link>
    </div>
  );
}
