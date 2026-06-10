import type { Metadata } from 'next';
import AuthShell from '@/components/AuthShell';
import LoginForm from './LoginForm';

export const metadata: Metadata = { title: 'Sign in' };

export default function LoginPage() {
  return (
    <AuthShell title="Sign in" subtitle="Welcome back. Your projects are where you left them.">
      <LoginForm />
    </AuthShell>
  );
}
