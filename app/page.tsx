import Link from 'next/link';
import Image from 'next/image';
import LiveSearchDemo from '@/components/LiveSearchDemo';

const FEATURES = [
  {
    title: 'Product Search',
    body: 'Search 30,000+ verified products by name, brand, or spec. Coverage rates, VOC content, cure times — all in one place.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    title: 'Weather Check',
    body: 'Check rain risk and application temperatures for your job site. Know if today is a coating day or a cleanup day.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M17.5 19a4.5 4.5 0 1 0-1.6-8.7A6 6 0 1 0 6 17.8" />
        <path d="M13 19v4M8.5 19v2M17.5 19v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Submittal PDFs',
    body: 'Turn saved specs into professional submittal packages in one click. Cover sheet, TDS documents, approval pages — done.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6" />
        <path d="M9 15h6M9 11h2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Saved Projects',
    body: 'Organize specs by job. Keep the Union Street facade separate from the Tremont roof — with addresses and notes.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: '30,000+', label: 'Verified products' },
  { value: '98.5%', label: 'Data accuracy' },
  { value: '500+', label: 'Brands covered' },
  { value: '<1s', label: 'Search response' },
];

const STEPS = [
  {
    n: 'Search',
    body: 'Type a product, brand, or category. Results in milliseconds, full specs included.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
      </svg>
    ),
  },
  {
    n: 'Save',
    body: 'Add products to a project. Organized by job, ready when you are.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    n: 'Submit',
    body: 'Generate a submittal PDF with project details and send it to the GC.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 15l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-orange/5 via-transparent to-navy" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 lg:py-28">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange/40 bg-orange/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-orange">
              <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
              30,000+ verified products
            </div>

            <h1 className="mx-auto mt-8 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Stop digging through PDFs.{' '}
              <span className="bg-gradient-to-r from-orange to-amber-400 bg-clip-text text-transparent">
                Find specs in seconds.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              The search engine for construction specs. Coverage rates, cure times, VOC content,
              and TDS documents — verified and ready for your next submittal.
            </p>

            <div className="mt-10">
              <LiveSearchDemo />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/register" className="btn-primary px-8 py-3.5 text-lg shadow-lg shadow-orange/25">
                Get started free
              </Link>
              <Link href="/products" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3.5 text-lg font-semibold text-white transition-colors hover:border-orange/50 hover:text-orange">
                Browse products →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-divider bg-white dark:border-white/10 dark:bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-orange sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-subdued">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy dark:text-white sm:text-4xl">
            Built for the people who spec the work
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-subdued">
            Engineers, architects, and contractors use SpecInspect to get from product question to
            submittal package without opening forty manufacturer PDFs.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card group p-6 hover:shadow-cardHover hover:border-orange/30">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-light text-orange transition-colors group-hover:bg-orange group-hover:text-white dark:bg-orange/15 dark:group-hover:bg-orange">
                {f.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-subdued">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-divider bg-lightbg dark:border-white/10 dark:bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-navy dark:text-white sm:text-4xl">
              From search to submittal in 3 steps
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-subdued">
              No more hunting through manufacturer websites. No more outdated spec sheets. Just verified data, ready to go.
            </p>
          </div>
          <div className="mt-14 grid gap-12 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/10 text-orange">
                  {s.icon}
                </div>
                <div className="mt-4 font-mono text-sm font-bold uppercase tracking-widest text-orange">
                  Step {i + 1}
                </div>
                <h3 className="mt-2 text-xl font-semibold text-navy dark:text-white">{s.n}</h3>
                <p className="mt-2 text-sm leading-relaxed text-subdued">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l2 3.5-2 3z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
          <Image src="/logo.png" alt="SpecInspect" width={56} height={56} className="mx-auto rounded-xl" />
          <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
            Your next submittal is three clicks away
          </h2>
          <p className="mx-auto mt-4 max-w-md text-slate-300">
            Free to start. No credit card. Search the full database today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="btn-primary px-8 py-3.5 text-lg shadow-lg shadow-orange/25">
              Get started free
            </Link>
            <Link href="/pricing" className="rounded-lg border border-white/20 px-6 py-3.5 text-lg font-semibold text-white transition-colors hover:border-orange/50 hover:text-orange">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}