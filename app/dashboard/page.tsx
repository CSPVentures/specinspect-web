import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import DashboardClient from './DashboardClient';

export const metadata: Metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) redirect('/login?next=/dashboard');
  return <DashboardClient userName={user.name} />;
}
