import type { Metadata } from 'next';
import WeatherClient from './WeatherClient';

export const metadata: Metadata = { title: 'Site weather' };

export default function WeatherPage() {
  return <WeatherClient />;
}
