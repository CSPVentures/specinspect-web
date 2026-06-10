import type { Metadata } from 'next';
import AuthShell from '@/components/AuthShell';
import RegisterForm from './RegisterForm';

export const metadata: Metadata = { title: 'Create account' };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free to start: full product search, 3 projects, basic specs."
    >
      <RegisterForm />
    </AuthShell>
  );
}
