import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AccountClient from './AccountClient';
import type { User, SubscriptionStatus } from '@/lib/types';

export const metadata: Metadata = { title: 'Account' };

const API_BASE = process.env.SPECINSPECT_API_BASE ?? 'https://api.specinspect.com/api';

function apiHeaders(token: string) {
  const h: Record<string, string> = { Authorization: `Bearer ${token}` };
  const key = process.env.SPECINSPECT_API_KEY;
  if (key) h['X-API-Key'] = key;
  return h;
}

export default async function AccountPage() {
  const token = cookies().get('si_token')?.value;
  if (!token) redirect('/login?next=/account');

  const headers = apiHeaders(token);

  const [userRes, subRes] = await Promise.all([
    fetch(`${API_BASE}/auth/me`, { headers, cache: 'no-store' }),
    fetch(`${API_BASE}/subscriptions/status`, { headers, cache: 'no-store' }),
  ]);

  if (!userRes.ok) redirect('/login?next=/account');

  const user: User = await userRes.json().then((b) => b.user ?? b);
  const sub: SubscriptionStatus = subRes.ok
    ? await subRes.json().catch(() => ({ tier: 'free', status: 'none' }))
    : { tier: 'free', status: 'none' };

  const isPro = sub.tier === 'pro' || user.is_pro || false;

  return <AccountClient user={user} isPro={isPro} />;
}
