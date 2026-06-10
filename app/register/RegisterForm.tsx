'use client';

import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';
import { registerAction } from '@/lib/auth-actions';

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn-primary w-full" disabled={pending}>
      {pending ? 'Creating account…' : 'Create account'}
    </button>
  );
}

export default function RegisterForm() {
  const [state, action] = useFormState(registerAction, null);
  return (
    <form action={action} className="space-y-4">
      {state?.error && (
        <p role="alert" className="rounded-lg bg-orange-light px-4 py-3 text-sm text-orange dark:bg-orange/15">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="name" className="label">Full name</label>
        <input id="name" name="name" required autoComplete="name" className="input" />
      </div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">Password</label>
        <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" className="input" />
        <p className="mt-1 text-xs text-subdued">At least 8 characters.</p>
      </div>
      <div>
        <label htmlFor="confirm" className="label">Confirm password</label>
        <input id="confirm" name="confirm" type="password" required autoComplete="new-password" className="input" />
      </div>
      <label className="flex items-start gap-2 text-sm text-subdued">
        <input type="checkbox" name="terms" required className="mt-0.5 accent-[#E87722]" />
        <span>
          I agree to the{' '}
          <Link href="/terms" className="text-orange hover:underline">Terms of Service</Link> and{' '}
          <Link href="/privacy" className="text-orange hover:underline">Privacy Policy</Link>.
        </span>
      </label>
      <Submit />
      <p className="text-center text-sm text-subdued">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-orange hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
