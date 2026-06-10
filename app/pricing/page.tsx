import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Pricing' };

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    blurb: 'For getting your first submittal out the door.',
    features: ['Full product search', '3 projects', 'Basic spec fields', 'Product flagging'],
    cta: { label: 'Get started free', href: '/register' },
    featured: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    blurb: 'For contractors and specifiers who live in submittals.',
    features: [
      'Everything in Free',
      'Unlimited projects',
      'Submittal PDF generation',
      'Site weather checks',
      'Side-by-side compare',
      'Priority data review',
    ],
    cta: { label: 'Upgrade to Pro', href: '/register' },
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'annual',
    blurb: 'For firms that need SpecInspect inside their own systems.',
    features: [
      'Everything in Pro',
      'API access',
      'Team management',
      'SSO and provisioning',
      'Dedicated support',
    ],
    cta: { label: 'Contact sales', href: 'mailto:sales@specinspect.com' },
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <h1 className="text-center text-3xl font-bold text-navy dark:text-white">
        Simple pricing, no surprises
      </h1>
      <p className="mx-auto mt-3 max-w-md text-center text-subdued">
        Start free. Upgrade when the submittals start stacking up.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`card flex flex-col p-7 ${
              p.featured ? 'border-2 border-orange shadow-cardHover' : ''
            }`}
          >
            {p.featured && (
              <span className="mb-3 self-start rounded-full bg-orange px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-white">
                Most popular
              </span>
            )}
            <h2 className="text-xl font-bold text-navy dark:text-white">{p.name}</h2>
            <p className="mt-2">
              <span className="text-4xl font-bold text-navy dark:text-white">{p.price}</span>
              <span className="ml-2 text-sm text-subdued">{p.period}</span>
            </p>
            <p className="mt-2 text-sm text-subdued">{p.blurb}</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 text-orange" aria-hidden="true">✓</span>
                  <span className="text-body dark:text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href={p.cta.href}
              className={`mt-6 ${p.featured ? 'btn-primary' : 'btn-secondary'} w-full`}
            >
              {p.cta.label}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
