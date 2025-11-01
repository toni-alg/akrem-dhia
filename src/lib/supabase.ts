import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SkinType {
  id: string;
  user_id: string;
  skin_type: string;
  concerns: string[];
  created_at: string;
}

export interface Ingredient {
  id: string;
  name_en: string;
  name_ar: string;
  safety_rating: 'safe' | 'caution' | 'harmful';
  is_natural: boolean;
  benefits: string[];
  concerns: string[];
  description_ar: string;
  created_at: string;
}

export interface NaturalRecipe {
  id: string;
  title_ar: string;
  description_ar: string;
  ingredients: { name: string; amount: string }[];
  instructions: string;
  suitable_for: string[];
  benefits: string[];
  created_at: string;
}

export interface UserScan {
  id: string;
  user_id: string;
  product_name: string;
  ingredients_scanned: string[];
  analysis_result: {
    safe_count: number;
    caution_count: number;
    harmful_count: number;
    details: Ingredient[];
  };
  created_at: string;
}
