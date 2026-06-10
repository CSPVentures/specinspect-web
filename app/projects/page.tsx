import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = { title: 'Projects' };

export default async function ProjectsPage() {
  const user = await getSession();
  if (!user) redirect('/login?next=/projects');
  return <ProjectsClient />;
}
