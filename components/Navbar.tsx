'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import type { User } from '@/lib/types';
import { logoutAction } from '@/lib/auth-actions';

export default function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close mobile menu on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    router.push(`/products?search=${encodeURIComponent(q.trim())}`);
    setQ('');
    setOpen(false);
  }

  const links = user
    ? [
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/products', label: 'Products' },
        { href: '/projects', label: 'Projects' },
        { href: '/weather', label: 'Weather' },
      ]
    : [
        { href: '/products', label: 'Products' },
        { href: '/pricing', label: 'Pricing' },
      ];

  const firstName = user?.full_name?.split(' ')[0] ?? 'Account';

  return (
    <header ref={navRef} className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 backdrop-blur-md text-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5 font-bold tracking-tight shrink-0">
          <Image src="/logo.png" alt="SpecInspect" width={36} height={36} className="rounded-lg" priority />
          <span className="hidden sm:block text-lg">
            SpecInspect
          </span>
        </Link>

        <form onSubmit={submitSearch} className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 30,000+ products…"
              aria-label="Search products"
              className="w-full rounded-lg border border-white/15 bg-white/10 py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-gold focus:outline-none"
            />
          </div>
        </form>

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname.startsWith(l.href) ? 'text-gold' : 'text-slate-300 hover:text-white'
              }`}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                href="/account"
                className="ml-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                {firstName}
              </Link>
              <form action={logoutAction}>
                <button className="rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white">
                Sign in
              </Link>
              <Link href="/register" className="btn-primary ml-1 px-4 py-2 text-sm">
                Get started free
              </Link>
            </>
          )}
        </nav>

        <button
          className="ml-auto rounded-lg p-2 md:hidden text-slate-400 hover:text-white"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 px-4 py-3">
          <form onSubmit={submitSearch} className="mb-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="w-full rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-sm placeholder:text-slate-400"
            />
          </form>
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname.startsWith(l.href) ? 'text-gold' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Account
                </Link>
                <form action={logoutAction}>
                  <button className="w-full text-left rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-slate-800">
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <div className="pt-2 border-t border-slate-800 mt-2 flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="btn-secondary text-center text-sm"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="btn-primary text-center text-sm"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
