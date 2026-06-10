import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import ProjectDetailClient from './ProjectDetailClient';

export const metadata: Metadata = { title: 'Project' };

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const user = await getSession();
  if (!user) redirect(`/login?next=/projects/${params.id}`);
  return <ProjectDetailClient id={params.id} />;
}
