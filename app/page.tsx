import Link from 'next/link';
import Image from 'next/image';
import LiveSearchDemo from '@/components/LiveSearchDemo';

const STATS = [
  { value: '30,000+', label: 'Verified products' },
  { value: '98.5%', label: 'Data accuracy' },
  { value: '500+', label: 'Brands covered' },
  { value: '<1s', label: 'Search response' },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <Image
          src="/images/hero.jpg"
          alt="Worker applying sealant to a facade expansion joint with the Manhattan skyline behind"
          fill
          priority
          className="object-cover object-center sm:object-right"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/70 to-navy-950/90 sm:bg-gradient-to-r sm:from-navy-950 sm:via-navy-950/85 sm:to-navy-950/20" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-28 text-center sm:text-left">
          <div className="max-w-2xl mx-auto sm:mx-0">
            <div className="inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-5 py-2 font-mono text-xs uppercase tracking-widest text-gold">
              <Image src="/logo.png" alt="" width={20} height={20} className="rounded" />
              Construction Specification Intelligence
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
              Stop digging through PDFs.
              <br />
              <span className="text-gold">Find specs in seconds.</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-slate-300 mx-auto sm:mx-0">
              Cure times. Coverage rates. VOC content. In one place — verified and ready for your next submittal.
            </p>

            <div className="mt-9">
              <LiveSearchDemo />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-5">
              <Link href="/register" className="btn-primary px-8 py-3 text-lg">
                Get started free
              </Link>
              <span className="inline-flex items-baseline gap-2 border border-gold/60 bg-navy-900/80 px-4 py-2 font-mono text-gold">
                <span className="text-2xl font-bold tabular-nums tracking-tight">30,000</span>+
                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">verified products</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-divider bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-bold text-gold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm font-medium text-subdued">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Everything you need on the job
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-subdued">
            From spec search to submittal PDF — all in one tool built for the people who build things.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-5">
          <Link href="/products" className="card group relative overflow-hidden lg:col-span-3 lg:row-span-3">
            <div className="relative h-56 sm:h-72 lg:h-[55%]">
              <Image src="/images/card-search.jpg" alt="Contractor reading a technical data sheet in a supply warehouse" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 60vw, 100vw" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
            </div>
            <div className="p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-white group-hover:text-gold">Product search</h3>
              <p className="mt-3 max-w-md leading-relaxed text-subdued">Full-text search across 30,000+ verified products. Filter by category and brand, compare side by side — every spec field a TDS would give you, without opening the TDS.</p>
              <p className="mt-5 font-mono text-sm font-semibold text-gold">Search the database →</p>
            </div>
          </Link>
          <div className="card group flex overflow-hidden lg:col-span-2">
            <div className="relative w-28 shrink-0 sm:w-40">
              <Image src="/images/card-weather.jpg" alt="Roofer on a TPO roof watching a storm approach" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04] object-[30%_center]" sizes="160px" loading="lazy" />
            </div>
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold">02 / WEATHER</p>
              <h3 className="mt-1 font-bold text-white">Weather check</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-subdued">Application temps and rain risk for your job site. Know if today is a coating day before the crew rolls.</p>
            </div>
          </div>
          <div className="card group flex overflow-hidden lg:col-span-2">
            <div className="relative w-28 shrink-0 sm:w-40">
              <Image src="/images/card-submittal.jpg" alt="Hard hat, measuring tape, and spec sheets over blueprints" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04] object-center" sizes="160px" loading="lazy" />
            </div>
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold">03 / SUBMITTALS</p>
              <h3 className="mt-1 font-bold text-white">Submittal PDFs</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-subdued">A saved spec list becomes a professional submittal package in one click. Cover sheet, TDS docs, done.</p>
            </div>
          </div>
          <div className="card group flex overflow-hidden lg:col-span-2">
            <div className="relative w-28 shrink-0 sm:w-40">
              <Image src="/images/card-projects.jpg" alt="Two workers repointing a brick facade" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04] object-top" sizes="160px" loading="lazy" />
            </div>
            <div className="p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold">04 / PROJECTS</p>
              <h3 className="mt-1 font-bold text-white">Saved projects</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-subdued">Group specs by job. The facade stays separate from the roof, with addresses and notes attached.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for the people section */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/builtfor-bg.jpg"
          alt="Construction superintendent reviewing specs in a concrete corridor"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#020817]/80" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Built for the people who spec the work
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            SpecInspect was built by construction professionals, for construction professionals. Every product in
            our database was sourced from real TDS documents — the same ones you&apos;re pulling from manufacturer
            websites at 11pm before a bid.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 border-y border-divider bg-surface">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">How it works</h2>
            <div className="space-y-6">
              {[
                { step: '01', title: 'Search Products', desc: 'Search 30,000+ spec sheets from leading manufacturers by product name, brand, or category.' },
                { step: '02', title: 'Compare Specs', desc: 'Add up to 4 products to compare VOC content, cure times, temp ranges, and more side by side.' },
                { step: '03', title: 'Generate Submittal', desc: 'Export a professional submittal PDF for any project — formatted and ready for the architect.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <span className="text-gold font-bold text-xl w-8 shrink-0">{item.step}</span>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-subdued text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <Link href="/register" className="btn-primary">Get started free</Link>
              <Link href="/products" className="btn-secondary">Browse products</Link>
            </div>
          </div>
          <div className="relative h-80 rounded-xl overflow-hidden">
            <Image
              src="/images/cta-roof.jpg"
              alt="Roofer on TPO membrane roof"
              fill
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020817]/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/cta-bg.jpg"
          alt="Waterproofing and sealant products on construction supply shelving"
          fill
          className="object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#020817]/85" />
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4 sm:px-6">
          <Image src="/logo.png" alt="SpecInspect" width={56} height={56} className="mx-auto rounded-xl" />
          <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to spec smarter?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of contractors searching specs in seconds. Free to start, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary px-8 py-3.5 text-lg shadow-lg shadow-gold/25">
              Start for Free
            </Link>
            <Link href="/pricing" className="rounded-lg border border-white/20 px-6 py-3.5 text-lg font-semibold text-white transition-colors hover:border-gold/50 hover:text-gold">
              See Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}