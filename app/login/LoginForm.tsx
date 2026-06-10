'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { loginAction } from '@/lib/auth-actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn-primary w-full" disabled={pending}>
      {pending ? 'Signing in…' : 'Sign in'}
    </button>
  );
}

export default function LoginForm() {
  const [state, action] = useFormState(loginAction, null);
  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p role="alert" className="rounded-lg bg-orange-light px-4 py-3 text-sm text-orange dark:bg-orange/15">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label">Password</label>
          <Link href="/forgot-password" className="text-xs font-medium text-orange hover:underline">
            Forgot password?
          </Link>
        </div>
        <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
      </div>
      <Submit />
      <p className="text-center text-sm text-subdued">
        New to SpecInspect?{' '}
        <Link href="/register" className="font-medium text-orange hover:underline">Create an account</Link>
      </p>
    </form>
  );
}
