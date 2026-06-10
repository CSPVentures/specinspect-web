import type { Metadata } from 'next';
import AuthShell from '@/components/AuthShell';
import ForgotForm from './ForgotForm';

export const metadata: Metadata = { title: 'Reset password' };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your account email and we'll send a reset link."
    >
      <ForgotForm />
    </AuthShell>
  );
}
