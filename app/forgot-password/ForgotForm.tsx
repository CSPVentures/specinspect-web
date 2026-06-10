'use client';

import Link from 'next/link';
import { useState } from 'react';
import { api } from '@/lib/api';

export default function ForgotForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await api('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setStatus('sent');
    } catch {
      // Don't reveal whether the address exists.
      setStatus('sent');
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center">
        <p className="text-sm">
          If an account exists for <strong>{email}</strong>, a reset link is on its way. Check your
          inbox and spam folder.
        </p>
        <Link href="/login" className="btn-secondary mt-4 w-full">Back to sign in</Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p role="alert" className="text-sm text-orange">{error}</p>}
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input
          id="email" type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email" className="input"
        />
      </div>
      <button className="btn-primary w-full" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send reset link'}
      </button>
      <p className="text-center text-sm text-subdued">
        Remembered it? <Link href="/login" className="font-medium text-orange hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
