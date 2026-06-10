'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_BASE = process.env.SPECINSPECT_API_BASE ?? 'https://api.specinspect.com/api';

const COOKIE = {
  name: 'si_token',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

async function authRequest(path: string, payload: Record<string, string>) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const apiKey = process.env.SPECINSPECT_API_KEY;
  if (apiKey) headers['X-API-Key'] = apiKey;

  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { error: body.error || body.message || body.detail || 'Authentication failed.' };
  }
  return body as { token: string };
}

export async function loginAction(_prev: { error?: string } | null, formData: FormData) {
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  if (!email || !password) return { error: 'Enter your email and password.' };

  const result = await authRequest('/auth/login', { email, password });
  if ('error' in result) return { error: result.error };

  cookies().set({ ...COOKIE, value: result.token });
  redirect('/dashboard');
}

export async function registerAction(_prev: { error?: string } | null, formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const password = String(formData.get('password') ?? '');
  const confirm = String(formData.get('confirm') ?? '');
  const terms = formData.get('terms');

  if (!name || !email || !password) return { error: 'Fill in every field.' };
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' };
  if (password !== confirm) return { error: 'Passwords do not match.' };
  if (!terms) return { error: 'Accept the terms of service to continue.' };

  const result = await authRequest('/auth/register', { name, email, password });
  if ('error' in result) return { error: result.error };

  cookies().set({ ...COOKIE, value: result.token });
  redirect('/dashboard');
}

export async function logoutAction() {
  const token = cookies().get('si_token')?.value;
  if (token) {
    const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
    const apiKey = process.env.SPECINSPECT_API_KEY;
    if (apiKey) headers['X-API-Key'] = apiKey;
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST', headers, cache: 'no-store' }).catch(
      () => undefined,
    );
  }
  cookies().delete('si_token');
  redirect('/login');
}
