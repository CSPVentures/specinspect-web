import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const API_BASE = process.env.SPECINSPECT_API_BASE ?? 'https://api.specinspect.com/api';

async function proxy(req: NextRequest, { params }: { params: { path: string[] } }) {
  const path = params.path.join('/');
  const search = req.nextUrl.search;
  const url = `${API_BASE}/${path}${search}`;

  const headers = new Headers();
  headers.set('Accept', req.headers.get('accept') ?? 'application/json');
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);

  const apiKey = process.env.SPECINSPECT_API_KEY;
  if (apiKey) headers.set('X-API-Key', apiKey);

  const token = cookies().get('si_token')?.value;
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const init: RequestInit = {
    method: req.method,
    headers,
    cache: 'no-store',
  };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = await req.arrayBuffer();
  }

  let upstream: Response;
  try {
    upstream = await fetch(url, init);
  } catch {
    return Response.json(
      { error: 'SpecInspect API is unreachable. Try again in a moment.' },
      { status: 502 },
    );
  }

  // Stream the body straight through (supports PDF downloads).
  const respHeaders = new Headers();
  const passthrough = ['content-type', 'content-disposition', 'content-length', 'cache-control'];
  passthrough.forEach((h) => {
    const v = upstream.headers.get(h);
    if (v) respHeaders.set(h, v);
  });

  return new Response(upstream.body, { status: upstream.status, headers: respHeaders });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
