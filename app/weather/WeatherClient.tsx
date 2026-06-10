'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { WeatherData } from '@/lib/types';

export default function WeatherClient() {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [manual, setManual] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [status, setStatus] = useState<'idle' | 'locating' | 'loading' | 'ready' | 'error'>('idle');
  const [error, setError] = useState('');

  function detect() {
    if (!('geolocation' in navigator)) {
      setError('Location services are not available in this browser. Enter coordinates instead.');
      return;
    }
    setStatus('locating');
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => {
        setStatus('idle');
        setError('Location access was blocked. Enter coordinates manually below.');
      },
      { timeout: 10000 },
    );
  }

  useEffect(() => { detect(); }, []);

  useEffect(() => {
    if (!coords) return;
    setStatus('loading');
    setError('');
    api<WeatherData>(`/products/weather?lat=${coords.lat}&lon=${coords.lon}`)
      .then((data) => { setWeather(data); setStatus('ready'); })
      .catch((err) => {
        setStatus('error');
        setError(err instanceof Error ? err.message : 'Weather data is unavailable.');
      });
  }, [coords]);

  function submitManual(e: React.FormEvent) {
    e.preventDefault();
    const match = manual.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
    if (!match) {
      setError('Enter coordinates as “lat, lon” — for example 40.66, -73.70.');
      return;
    }
    setCoords({ lat: parseFloat(match[1]), lon: parseFloat(match[2]) });
  }

  const safe = weather?.safe_to_apply;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-navy dark:text-white">Site weather</h1>
      <p className="mt-1 text-sm text-subdued">
        Conditions and application safety for your job site.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button onClick={detect} className="btn-secondary px-4 py-2 text-sm" disabled={status === 'locating'}>
          {status === 'locating' ? 'Locating…' : 'Use my location'}
        </button>
        <form onSubmit={submitManual} className="flex flex-1 gap-2">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="lat, lon — e.g. 40.66, -73.70"
            aria-label="Coordinates"
            className="input max-w-xs py-2 text-sm"
          />
          <button className="btn-primary px-4 py-2 text-sm">Check</button>
        </form>
      </div>

      {error && <p className="mt-4 text-sm text-orange">{error}</p>}
      {status === 'loading' && <p className="mt-6 text-subdued">Loading conditions…</p>}

      {status === 'ready' && weather && (
        <>
          <div
            className={`card mt-6 border-l-4 p-6 ${
              safe ? 'border-l-green-500' : 'border-l-orange'
            }`}
          >
            <p className="spec-label">{safe ? 'Safe to apply' : 'Hold application'}</p>
            <p className="mt-1 text-lg font-semibold text-navy dark:text-white">
              {safe
                ? 'Conditions look good for coatings and sealants right now.'
                : 'Conditions may compromise application. Check product temp and moisture limits.'}
            </p>
            {weather.rain_risk && (
              <p className="mt-1 text-sm text-subdued">Rain risk: {weather.rain_risk}</p>
            )}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="card p-5">
              <p className="spec-label">Temperature</p>
              <p className="mt-1 text-3xl font-bold text-navy dark:text-white">
                {weather.temperature != null ? `${Math.round(weather.temperature)}°` : '—'}
              </p>
              <p className="text-sm text-subdued">{weather.conditions ?? ''}</p>
            </div>
            <div className="card p-5">
              <p className="spec-label">Humidity</p>
              <p className="mt-1 text-3xl font-bold text-navy dark:text-white">
                {weather.humidity != null ? `${weather.humidity}%` : '—'}
              </p>
            </div>
            <div className="card p-5">
              <p className="spec-label">Wind</p>
              <p className="mt-1 text-3xl font-bold text-navy dark:text-white">
                {weather.wind_speed != null ? `${Math.round(weather.wind_speed)} mph` : '—'}
              </p>
            </div>
          </div>

          {(weather.forecast?.length ?? 0) > 0 && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-navy dark:text-white">3-day outlook</h2>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {weather.forecast!.slice(0, 3).map((d) => (
                  <div key={d.date} className="card p-5">
                    <p className="spec-label">
                      {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="mt-1 text-xl font-bold text-navy dark:text-white">
                      {Math.round(d.high)}° <span className="text-base font-normal text-subdued">/ {Math.round(d.low)}°</span>
                    </p>
                    <p className="text-sm text-subdued">{d.conditions}</p>
                    <p className={`mt-1 font-mono text-xs ${d.rain_chance >= 40 ? 'text-orange' : 'text-subdued'}`}>
                      {d.rain_chance}% rain
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-navy dark:text-white">
              Products suited to these conditions
            </h2>
            <p className="mt-1 text-sm text-subdued">
              {safe
                ? 'Most coatings and sealants can be applied today. Browse by category:'
                : 'Consider low-temp or moisture-tolerant formulations:'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {(safe
                ? ['Sealants', 'Coatings', 'Waterproofing', 'Adhesives']
                : ['Low-Temp Sealants', 'Moisture-Cure Coatings', 'Cold-Applied Waterproofing']
              ).map((c) => (
                <Link
                  key={c}
                  href={`/products?search=${encodeURIComponent(c)}`}
                  className="rounded-full bg-orange-light px-4 py-1.5 text-sm font-medium text-orange transition-colors hover:bg-orange hover:text-white dark:bg-orange/15"
                >
                  {c}
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
