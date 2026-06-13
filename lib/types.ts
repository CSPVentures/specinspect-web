export interface User {
  id: string;
  full_name: string;
  email: string;
  is_pro?: boolean;
  created_at?: string;
}

export interface SubscriptionStatus {
  tier: 'free' | 'pro';
  status: 'none' | 'active' | 'canceled';
  current_period_end?: string;
}

export interface Product {
  id: string;
  product_name: string;
  brand: string;
  manufacturer?: string | null;
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
  ul_rating?: string | null;
  astm_standard?: string | null;
  r_value?: string | null;
  thickness?: string | null;
  membrane_type?: string | null;
  cleanup_method?: string | null;
  tds_url?: string | null;
  tds_url_na?: boolean;
  source_pdf?: string | null;
  source_url?: string | null;
  product_number?: string | null;
  confidence_score?: string | null;
  last_verified_date?: string | null;
  date_added?: string | null;
  discontinued?: boolean;
  flagged_for_review?: boolean;
  external_key?: string | null;
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

export interface ApplyCheck {
  product_id: string;
  product_name: string;
  category: string;
  can_apply_today: boolean;
  status: 'can_apply' | 'caution' | 'cannot_apply';
  message: string;
  reason: string;
  warnings: string[];
  current_conditions: {
    temp_f: number;
    feels_like_f: number;
    humidity_pct: number;
    wind_mph: number;
    description: string;
  };
  temp_requirements: {
    min_f: number;
    max_f: number | null;
    max_na: boolean;
    cure_time: string;
    cure_hours: number;
  };
  rain_risk: {
    level: 'low' | 'medium' | 'high';
    description: string;
    rain_hours: number;
    cure_window_hours: number;
    rainy_intervals: string[];
  };
  forecast_3day: Array<{
    date: string;
    temp_low_f: number;
    temp_high_f: number;
    conditions: string[];
  }>;
  next_suitable_day?: {
    date: string;
    temp_low_f: number;
    temp_high_f: number;
    conditions: string[];
  };
  location: string;
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
  { key: 'ul_rating', label: 'UL Rating' },
  { key: 'astm_standard', label: 'ASTM Standard' },
  { key: 'r_value', label: 'R-Value' },
  { key: 'thickness', label: 'Thickness' },
  { key: 'membrane_type', label: 'Membrane Type' },
  { key: 'cleanup_method', label: 'Cleanup Method' },
];

export function hasValue(v: unknown): boolean {
  return v !== null && v !== undefined && String(v).trim() !== '' && String(v).toLowerCase() !== '_na';
}
