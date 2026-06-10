'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { WeatherData } from '@/lib/types';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'denied' | 'error'>('loading');

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('denied');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await api<WeatherData>(
            `/products/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`,
          );
          setWeather(data);
          setStatus('ready');
        } catch {
          setStatus('error');
        }
      },
      () => setStatus('denied'),
      { timeout: 8000 },
    );
  }, []);

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-navy dark:text-white">Site weather</h2>
        <Link href="/weather" className="text-xs font-medium text-orange hover:underline">
          Full forecast →
        </Link>
      </div>
      {status === 'loading' && <p className="mt-3 text-sm text-subdued">Checking conditions…</p>}
      {status === 'denied' && (
        <p className="mt-3 text-sm text-subdued">
          Allow location access, or open the <Link href="/weather" className="text-orange hover:underline">weather page</Link> to enter a location.
        </p>
      )}
      {status === 'error' && <p className="mt-3 text-sm text-subdued">Weather is unavailable right now.</p>}
      {status === 'ready' && weather && (
        <div className="mt-3 flex items-center gap-4">
          <span className="text-3xl font-bold text-navy dark:text-white">
            {weather.temperature != null ? `${Math.round(weather.temperature)}°` : '—'}
          </span>
          <div className="text-sm">
            <p className="font-medium">{weather.conditions ?? 'Conditions unavailable'}</p>
            <p
              className={`font-mono text-xs ${
                weather.safe_to_apply ? 'text-green-600 dark:text-green-400' : 'text-orange'
              }`}
            >
              {weather.safe_to_apply ? '✓ Safe to apply' : '⚠ Check before applying'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
