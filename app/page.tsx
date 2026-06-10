import Link from 'next/link';
import LiveSearchDemo from '@/components/LiveSearchDemo';

const FEATURES = [
  {
    title: 'Product search',
    body: 'Full-text search across 30,000+ verified products. Filter by category, brand, and spec fields that actually matter on site.',
    icon: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></>,
  },
  {
    title: 'Weather check',
    body: 'Application temps and rain risk for your job site, so you know whether today is a coating day or a cleanup day.',
    icon: <path d="M17.5 19a4.5 4.5 0 1 0-1.6-8.7A6 6 0 1 0 6 17.8" />,
  },
  {
    title: 'Submittal PDFs',
    body: 'Turn a saved spec list into a professional submittal package in one click. Cover sheet, TDS docs, done.',
    icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15h6M9 11h2" /></>,
  },
  {
    title: 'Saved projects',
    body: 'Group specs by job. Keep the Union Street facade separate from the Tremont roof, with addresses and notes attached.',
    icon: <><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></>,
  },
];

const STEPS = [
  { n: 'Search', body: 'Type a product, brand, or category. Results in milliseconds, specs included.' },
  { n: 'Save', body: 'Add the products you need to a project. Organized by job, ready when you are.' },
  { n: 'Submit', body: 'Generate a submittal PDF with your project details and send it to the GC.' },
];

export default function LandingPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-orange">
            30,000+ verified products
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Stop digging through PDFs. <span className="text-orange">Find specs in seconds.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            The search engine for construction specs. Coverage rates, cure times, VOC content, and
            TDS documents — verified and ready for your next submittal.
          </p>
          <div className="mt-10">
            <LiveSearchDemo />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href="/register" className="btn-primary px-8 py-3 text-lg">
              Get started free
            </Link>
            <Link href="/products" className="text-sm font-semibold text-slate-300 hover:text-orange">
              Browse products →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20">
        <h2 className="text-center text-3xl font-bold text-navy dark:text-white">
          Built for the people who spec the work
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-subdued">
          Engineers, architects, and contractors use SpecInspect to get from product question to
          submittal package without opening forty manufacturer PDFs.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card p-6 hover:shadow-cardHover">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-orange-light text-orange dark:bg-orange/15">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {f.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-semibold text-navy dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-subdued">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-divider bg-white dark:border-white/10 dark:bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-20">
          <h2 className="text-center text-3xl font-bold text-navy dark:text-white">How it works</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange font-mono text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-navy dark:text-white">{s.n}</h3>
                <p className="mt-2 text-sm text-subdued">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-navy dark:text-white">
          Your next submittal is three clicks away
        </h2>
        <p className="mx-auto mt-3 max-w-md text-subdued">
          Free to start. No credit card. Search the full database today.
        </p>
        <Link href="/register" className="btn-primary mt-8 px-8 py-3 text-lg">
          Get started free
        </Link>
      </section>
    </>
  );
}
