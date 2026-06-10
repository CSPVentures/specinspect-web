import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { logoutAction } from '@/lib/auth-actions';

export const metadata: Metadata = { title: 'Account' };

export default async function AccountPage() {
  const user = await getSession();
  if (!user) redirect('/login?next=/account');
  const plan = user.subscription ?? 'free';

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy dark:text-white">Account</h1>

      <section className="card mt-6 p-6">
        <h2 className="spec-label">Profile</h2>
        <dl className="mt-3 space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-subdued">Name</dt>
            <dd className="font-medium text-navy dark:text-white">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-subdued">Email</dt>
            <dd className="font-medium text-navy dark:text-white">{user.email}</dd>
          </div>
        </dl>
      </section>

      <section className="card mt-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="spec-label">Subscription</h2>
            <p className="mt-1 text-lg font-semibold capitalize text-navy dark:text-white">
              {plan} plan
            </p>
            <p className="mt-1 text-sm text-subdued">
              {plan === 'free'
                ? 'Search, 3 projects, basic specs.'
                : 'Unlimited projects, submittals, weather, and compare.'}
            </p>
          </div>
          {plan === 'free' && (
            <Link href="/pricing" className="btn-primary">Upgrade to Pro</Link>
          )}
        </div>
      </section>

      <section className="card mt-4 p-6">
        <h2 className="spec-label">Session</h2>
        <form action={logoutAction} className="mt-3">
          <button className="btn-secondary">Sign out</button>
        </form>
      </section>

      <p className="mt-8 text-center font-mono text-xs text-subdued">SpecInspect v1.0.0</p>
    </div>
  );
}
