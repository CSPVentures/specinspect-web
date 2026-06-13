import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-divider bg-navy-900 text-slate-400">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-white">
            <Image src="/logo.png" alt="SpecInspect" width={28} height={28} className="rounded" />
            <span className="text-lg">SpecInspect</span>
          </div>
          <p className="mt-3 text-sm">
            Construction Specification Intelligence. 30,000+ verified building material products.
          </p>
        </div>
        <div>
          <h3 className="spec-label mb-3 text-slate-500">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-gold">Product search</Link></li>
            <li><Link href="/compare" className="hover:text-gold">Compare specs</Link></li>
            <li><Link href="/weather" className="hover:text-gold">Weather check</Link></li>
            <li><Link href="/pricing" className="hover:text-gold">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="spec-label mb-3 text-slate-500">Account</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/login" className="hover:text-gold">Sign in</Link></li>
            <li><Link href="/register" className="hover:text-gold">Create account</Link></li>
            <li><Link href="/dashboard" className="hover:text-gold">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="spec-label mb-3 text-slate-500">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-gold">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-gold">Terms of service</Link></li>
            <li><Link href="/accessibility" className="hover:text-gold">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center font-mono text-xs text-slate-500">
        © {new Date().getFullYear()} SpecInspect LLC · SpecInspect v1.0.0
      </div>
    </footer>
  );
}