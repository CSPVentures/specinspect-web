import { cookies } from 'next/headers';
import type { User } from './types';

const API_BASE = process.env.SPECINSPECT_API_BASE ?? 'https://api.specinspect.com/api';

export async function getSession(): Promise<User | null> {
  const token = cookies().get('si_token')?.value;
  if (!token) return null;

  const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
  const apiKey = process.env.SPECINSPECT_API_KEY;
  if (apiKey) headers['X-API-Key'] = apiKey;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, { headers, cache: 'no-store' });
    if (!res.ok) return null;
    const body = await res.json();
    return (body.user ?? body) as User;
  } catch {
    return null;
  }
}
