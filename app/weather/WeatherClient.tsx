'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ApplyCheck, Product } from '@/lib/types';

const STATUS_CONFIG = {
  can_apply: {
    label: 'Good to Apply',
    color: 'text-green-400',
    bg: 'bg-green-500/10 border border-green-500/30',
    icon: '✓',
  },
  caution: {
    label: 'Use Caution',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border border-amber-500/30',
    icon: '⚠',
  },
  cannot_apply: {
    label: 'Do Not Apply',
    color: 'text-red-400',
    bg: 'bg-red-500/10 border border-red-500/30',
    icon: '✕',
  },
} as const;

export default function WeatherClient() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [zip, setZip] = useState('');
  const [usingGeo, setUsingGeo] = useState(false);
  const [geoCoords, setGeoCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [result, setResult] = useState<ApplyCheck | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [error, setError] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchProducts = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!q.trim()) { setSuggestions([]); return; }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/products/search?q=${encodeURIComponent(q)}&limit=6`);
        const data = await res.json();
        setSuggestions(data.products ?? []);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  useEffect(() => {
    searchProducts(query);
  }, [query, searchProducts]);

  function selectProduct(p: Product) {
    setSelectedProduct(p);
    setQuery(p.product_name);
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function detectLocation() {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not available in this browser.');
      return;
    }
    setUsingGeo(true);
    setError('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeoCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setZip('');
        setUsingGeo(false);
      },
      () => {
        setError('Location access was blocked. Enter a ZIP code instead.');
        setUsingGeo(false);
      },
      { timeout: 10000 },
    );
  }

  async function checkConditions(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProduct) { setError('Select a product first.'); return; }
    if (!zip && !geoCoords) { setError('Enter a ZIP code or use your location.'); return; }

    setStatus('loading');
    setError('');
    setResult(null);

    try {
      const qs = geoCoords
        ? `lat=${geoCoords.lat}&lon=${geoCoords.lon}`
        : `zip=${zip}`;
      const res = await fetch(`/api/products/${selectedProduct.id}/apply-check?${qs}`);
      if (!res.ok) throw new Error('Could not check conditions. Verify the ZIP code and try again.');
      const data: ApplyCheck = await res.json();
      setResult(data);
      setStatus('ready');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not check conditions. Verify the ZIP code and try again.');
      setStatus('error');
    }
  }

  const cfg = result ? STATUS_CONFIG[result.status] : null;
  const canCheck = !!selectedProduct && (!!zip || !!geoCoords);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white">Application Weather Check</h1>
      <p className="mt-1 text-sm text-subdued">
        Select a product and your job site location to check if today is a coating day.
      </p>

      <form onSubmit={checkConditions} className="mt-6 space-y-4">
        {/* Product search */}
        <div className="relative">
          <label className="label" htmlFor="product-search">Product</label>
          <input
            id="product-search"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedProduct(null); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search by product name or brand…"
            autoComplete="off"
            className="input"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-divider bg-navy-900 shadow-cardHover">
              {suggestions.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => selectProduct(p)}
                  className="block w-full px-4 py-3 text-left text-sm hover:bg-orange/10 hover:text-orange transition-colors"
                >
                  <span className="font-medium text-white">{p.product_name}</span>
                  {p.brand && <span className="ml-2 text-subdued">{p.brand}</span>}
                </button>
              ))}
            </div>
          )}
          {selectedProduct && (
            <p className="mt-1 text-xs text-green-400">
              ✓ Selected: {selectedProduct.product_name} — {selectedProduct.brand}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="label" htmlFor="zip-input">Location</label>
          <div className="flex gap-3">
            <input
              id="zip-input"
              value={zip}
              onChange={(e) => { setZip(e.target.value); setGeoCoords(null); }}
              placeholder="ZIP code (e.g. 10001)"
              className="input max-w-xs"
            />
            <button
              type="button"
              onClick={detectLocation}
              disabled={usingGeo}
              className="btn-secondary px-4 py-2 text-sm shrink-0"
            >
              {usingGeo ? 'Locating…' : 'Use My Location'}
            </button>
          </div>
          {geoCoords && (
            <p className="mt-1 text-xs text-green-400">
              ✓ Using your current location
            </p>
          )}
        </div>

        {error && <p className="text-sm text-orange">{error}</p>}

        <button
          type="submit"
          disabled={!canCheck || status === 'loading'}
          className="btn-primary"
        >
          {status === 'loading' ? 'Checking…' : 'Check Now'}
        </button>
      </form>

      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="mt-8 space-y-4 animate-pulse">
          <div className="h-28 rounded-xl bg-slate-800" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((i) => <div key={i} className="h-24 rounded-xl bg-slate-800" />)}
          </div>
        </div>
      )}

      {/* Results */}
      {status === 'ready' && result && cfg && (
        <div className="mt-8 space-y-6">
          {/* Status banner */}
          <div className={`rounded-xl p-6 ${cfg.bg}`}>
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-bold ${cfg.color}`}>{cfg.icon}</span>
              <div>
                <p className={`text-xl font-bold ${cfg.color}`}>{cfg.label}</p>
                <p className="mt-1 font-medium text-white">{result.message}</p>
              </div>
            </div>
            {result.reason && <p className="mt-3 text-sm text-subdued">{result.reason}</p>}
            {result.location && (
              <p className="mt-1 text-xs text-subdued">Location: {result.location}</p>
            )}
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="card p-5">
              <h3 className="font-semibold text-amber-400 mb-2">Warnings</h3>
              <ul className="space-y-1">
                {result.warnings.map((w, i) => (
                  <li key={i} className="text-sm text-body flex items-start gap-2">
                    <span className="text-amber-400 shrink-0">⚠</span> {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Current conditions */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Current Conditions</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="card p-4">
                <p className="spec-label">Temperature</p>
                <p className="mt-1 text-2xl font-bold text-white">{Math.round(result.current_conditions.temp_f)}°F</p>
                <p className="text-xs text-subdued">Feels like {Math.round(result.current_conditions.feels_like_f)}°F</p>
              </div>
              <div className="card p-4">
                <p className="spec-label">Humidity</p>
                <p className="mt-1 text-2xl font-bold text-white">{result.current_conditions.humidity_pct}%</p>
              </div>
              <div className="card p-4">
                <p className="spec-label">Wind</p>
                <p className="mt-1 text-2xl font-bold text-white">{result.current_conditions.wind_mph} mph</p>
              </div>
              <div className="card p-4">
                <p className="spec-label">Conditions</p>
                <p className="mt-1 text-sm font-medium text-white capitalize">{result.current_conditions.description}</p>
              </div>
            </div>
          </div>

          {/* Product requirements */}
          <div className="card p-5">
            <h3 className="font-semibold text-white mb-3">Product Requirements — {result.product_name}</h3>
            <dl className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <dt className="spec-label">Min Temp</dt>
                <dd className="mt-1 text-body font-medium">{result.temp_requirements.min_f}°F</dd>
              </div>
              <div>
                <dt className="spec-label">Max Temp</dt>
                <dd className="mt-1 text-body font-medium">
                  {result.temp_requirements.max_na ? 'No max' : `${result.temp_requirements.max_f}°F`}
                </dd>
              </div>
              <div>
                <dt className="spec-label">Cure Time</dt>
                <dd className="mt-1 text-body font-medium">{result.temp_requirements.cure_time}</dd>
              </div>
            </dl>
          </div>

          {/* Rain risk */}
          <div className="card p-5">
            <h3 className="font-semibold text-white mb-2">Rain Risk</h3>
            <p className={`text-sm font-semibold capitalize mb-1 ${
              result.rain_risk.level === 'low' ? 'text-green-400' :
              result.rain_risk.level === 'medium' ? 'text-amber-400' : 'text-red-400'
            }`}>
              {result.rain_risk.level} risk
            </p>
            <p className="text-sm text-subdued">{result.rain_risk.description}</p>
          </div>

          {/* 3-day forecast */}
          {result.forecast_3day.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">3-Day Forecast</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {result.forecast_3day.map((day) => (
                  <div key={day.date} className="card p-4">
                    <p className="spec-label">
                      {new Date(day.date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                    </p>
                    <p className="mt-1 text-xl font-bold text-white">
                      {Math.round(day.temp_high_f)}°{' '}
                      <span className="text-base font-normal text-subdued">/ {Math.round(day.temp_low_f)}°</span>
                    </p>
                    <p className="text-xs text-subdued mt-1 capitalize">
                      {day.conditions.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next suitable day */}
          {result.next_suitable_day && result.next_suitable_day.date !== result.forecast_3day[0]?.date && (
            <div className="card p-5 border-green-500/20">
              <h3 className="font-semibold text-green-400 mb-1">Next Suitable Day</h3>
              <p className="text-white font-medium">
                {new Date(result.next_suitable_day.date + 'T12:00:00').toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                {' — '}
                {Math.round(result.next_suitable_day.temp_low_f)}°–{Math.round(result.next_suitable_day.temp_high_f)}°F
              </p>
              <p className="text-sm text-subdued mt-1 capitalize">
                {result.next_suitable_day.conditions.join(', ')}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
