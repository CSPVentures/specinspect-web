export interface User {
  id: number;
  name: string;
  email: string;
  subscription?: 'free' | 'pro' | 'enterprise';
}

export interface Product {
  id: string;
  product_name: string;
  brand: string;
  category: string;
  subcategory?: string | null;
  description?: string | null;
  verified?: boolean;
  application_method?: string | null;
  voc_content?: string | null;
  coverage_rate?: string | null;
  cure_time?: string | null;
  application_temp_min?: string | null;
  application_temp_max?: string | null;
  shelf_life?: string | null;
  packaging_sizes?: string | null;
  mixing_ratio?: string | null;
  pot_life?: string | null;
  tack_time?: string | null;
  joint_movement?: string | null;
  substrate_compatibility?: string | null;
  certifications?: string | null;
  fire_rating?: string | null;
  tds_url?: string | null;
  source_pdf?: string | null;
  source_url?: string | null;
  product_number?: string | null;
  confidence_score?: string | null;
  last_verified_date?: string | null;
}

export interface ProductSearchResponse {
  products: Product[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string | null;
  project_address?: string | null;
  item_count?: number;
  updated_at?: string;
  items?: Product[];
}

export interface WeatherData {
  location?: string;
  temperature?: number;
  conditions?: string;
  humidity?: number;
  wind_speed?: number;
  rain_risk?: string;
  safe_to_apply?: boolean;
  forecast?: Array<{
    date: string;
    high: number;
    low: number;
    conditions: string;
    rain_chance: number;
  }>;
}

export const SPEC_FIELDS: Array<{ key: keyof Product; label: string }> = [
  { key: 'application_method', label: 'Application Method' },
  { key: 'voc_content', label: 'VOC Content' },
  { key: 'coverage_rate', label: 'Coverage Rate' },
  { key: 'cure_time', label: 'Cure Time' },
  { key: 'application_temp_min', label: 'Min Application Temp' },
  { key: 'application_temp_max', label: 'Max Application Temp' },
  { key: 'shelf_life', label: 'Shelf Life' },
  { key: 'packaging_sizes', label: 'Packaging' },
  { key: 'mixing_ratio', label: 'Mixing Ratio' },
  { key: 'pot_life', label: 'Pot Life' },
  { key: 'tack_time', label: 'Tack Time' },
  { key: 'joint_movement', label: 'Joint Movement' },
  { key: 'substrate_compatibility', label: 'Substrate Compatibility' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'fire_rating', label: 'Fire Rating' },
];

export function hasValue(v: unknown): boolean {
  return v !== null && v !== undefined && String(v).trim() !== '' && String(v).toLowerCase() !== '_na';
}
