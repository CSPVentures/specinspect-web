'use client';

import { useState } from 'react';
import Link from 'next/link';

const FREE_FEATURES = [
  'Full product search (30,000+ products)',
  '3 saved projects',
  'Basic spec fields',
  '5 photo scans/day',
  '20 barcode scans/day',
  'Weather / apply checks',
];

const PRO_FEATURES = [
  'Everything in Free',
  'Unlimited saved projects',
  'Unlimited photo & barcode scans',
  'Submittal PDF generation',
  'Side-by-side spec compare (up to 4 products)',
  'Priority data review requests',
];

const TEAM_FEATURES = [
  'Everything in Pro',
  'Volume seat pricing (3–50 seats)',
  'Team management dashboard',
  'Shared project library',
  'Admin seat management (add/remove anytime)',
  'Centralized billing',
];

const FAQ = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account page, no fees. Access continues until end of billing period.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'All major credit cards via Stripe. Your card data never touches our servers.',
  },
  {
    q: 'Is there a free trial?',
    a: '14-day free trial on Pro, no credit card required.',
  },
  {
    q: 'What happens to my projects if I downgrade?',
    a: "Projects are preserved. You'll be limited to viewing 3 active projects but won't lose data.",
  },
  {
    q: 'Do you offer team discounts?',
    a: 'Yes! Team plans start at 3 seats with volume pricing. More seats = lower per-seat cost.',
  },
  {
    q: 'What is the launch promo price?',
    a: 'For the first 60 days after launch, Pro is $12.99/mo or $99/yr — and you\'re grandfathered at that price forever.',
  },
];

const TEAM_TIERS = [
  { seats: '3–10', monthly: 12, annual: 99 },
  { seats: '11–25', monthly: 10, annual: 85 },
  { seats: '26–50', monthly: 8, annual: 69 },
];

export default function PricingClient() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);

  // Launch promo active for first 60 days
  const LAUNCH_PROMO = true;
  const proMonthly = LAUNCH_PROMO ? 12.99 : 14.99;
  const proAnnual = LAUNCH_PROMO ? 99 : 119;
  const proAnnualMo = (proAnnual / 12).toFixed(2);
  const annualSavings = proMonthly * 12 - proAnnual;

  async function handleUpgrade() {
    setLoading(true);
    try {
      const price_id = billing === 'monthly' ? 'specinspect_pro_monthly' : 'specinspect_pro_annual';
      const res = await fetch('/api/subscriptions/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price_id }),
      });
      const data = await res.json();
      if (data.checkout_url) window.location.href = data.checkout_url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020817] py-16 px-4">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center h-48 mb-10">
          <p className="text-slate-500 text-sm">Photo: pricing-hero.jpg — professional construction site</p>
        </div>
        <h1 className="text-4xl font-bold text-white">Simple, transparent pricing</h1>
        <p className="mt-3 text-subdued text-lg">Start free. Upgrade when the submittals start stacking up.</p>
        {LAUNCH_PROMO && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-orange/40 bg-orange/10 px-4 py-2 text-sm font-medium text-orange">
            🎉 Introductory Launch Price — grandfathered forever
          </div>
        )}
      </div>

      {/* Monthly/Annual Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-navy-900 p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors ${billing === 'monthly' ? 'bg-orange text-navy-950' : 'text-slate-300 hover:text-white'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={`rounded-md px-5 py-2 text-sm font-semibold transition-colors flex items-center gap-2 ${billing === 'annual' ? 'bg-orange text-navy-950' : 'text-slate-300 hover:text-white'}`}
          >
            Annual
            <span className={`text-xs font-normal ${billing === 'annual' ? 'text-navy-950' : 'text-green-400'}`}>
              Save ${annualSavings.toFixed(0)}
            </span>
          </button>
        </div>
      </div>

      {/* Individual Plans */}
      <div className="max-w-4xl mx-auto grid gap-6 lg:grid-cols-2 mb-16">
        {/* Free */}
        <div className="card flex flex-col p-7">
          <h2 className="text-xl font-bold text-white">Free</h2>
          <p className="mt-2">
            <span className="text-4xl font-bold text-white">$0</span>
            <span className="ml-2 text-sm text-subdued">/month</span>
          </p>
          <p className="mt-2 text-sm text-subdued">For getting started — full product search included.</p>
          <ul className="mt-5 flex-1 space-y-2.5 text-sm">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 text-orange shrink-0" aria-hidden="true">✓</span>
                <span className="text-body">{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/register" className="btn-secondary mt-6 w-full text-center">
            Get Started Free
          </Link>
        </div>

        {/* Pro */}
        <div className="card flex flex-col p-7 border-2 border-orange shadow-cardHover">
          <span className="mb-3 self-start rounded-full bg-orange px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-navy-950">
            Most Popular
          </span>
          <h2 className="text-xl font-bold text-white">Pro</h2>
          <p className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-4xl font-bold text-white">
              {billing === 'monthly' ? `$${proMonthly}` : `$${proAnnual}`}
            </span>
            <span className="text-sm text-subdued">
              {billing === 'monthly' ? '/month' : '/year'}
            </span>
            {billing === 'annual' && (
              <span className="text-xs text-green-400 font-medium">${proAnnualMo}/mo, save ${annualSavings.toFixed(0)}</span>
            )}
          </p>
          {LAUNCH_PROMO && (
            <p className="mt-1 text-xs text-orange/80">
              {billing === 'monthly' ? 'Regular $14.99/mo — launch price locked forever' : 'Regular $119/yr — launch price locked forever'}
            </p>
          )}
          <p className="mt-2 text-sm text-subdued">For contractors and specifiers who live in submittals. 14-day free trial.</p>
          <ul className="mt-5 flex-1 space-y-2.5 text-sm">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 text-orange shrink-0" aria-hidden="true">✓</span>
                <span className="text-body">{f}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="btn-primary mt-6 w-full"
          >
            {loading ? 'Loading…' : 'Start Pro Free Trial'}
          </button>
        </div>
      </div>

      {/* Team Plans */}
      <div className="max-w-4xl mx-auto mb-20">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">Team Plans</h2>
          <p className="mt-3 text-subdued">Volume pricing per seat. Everyone gets Pro features. Minimum 3 seats.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TEAM_TIERS.map((tier) => (
            <div key={tier.seats} className="card flex flex-col p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-orange">{tier.seats} seats</p>
              <p className="mt-3 flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">
                  ${billing === 'monthly' ? tier.monthly : tier.annual}
                </span>
                <span className="text-sm text-subdued">
                  /seat/{billing === 'monthly' ? 'mo' : 'yr'}
                </span>
              </p>
              <ul className="mt-5 flex-1 space-y-2 text-sm">
                {TEAM_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-0.5 text-orange shrink-0" aria-hidden="true">✓</span>
                    <span className="text-body">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:sales@specinspect.com?subject=Team Plan — {tier.seats} seats"
                className="btn-secondary mt-6 w-full text-center"
              >
                Contact Sales
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently asked questions</h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <div key={item.q} className="card p-6">
              <h3 className="font-semibold text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-subdued leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}