/*
  # Beauty Analysis Application Schema

  1. New Tables
    - `skin_types`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `skin_type` (text) - دهنية، جافة، مختلطة، عادية، حساسة
      - `concerns` (jsonb) - مشاكل البشرة
      - `created_at` (timestamptz)
    
    - `ingredients`
      - `id` (uuid, primary key)
      - `name_en` (text)
      - `name_ar` (text)
      - `safety_rating` (text) - آمن، حذر، مضر
      - `is_natural` (boolean)
      - `benefits` (jsonb)
      - `concerns` (jsonb)
      - `description_ar` (text)
      - `created_at` (timestamptz)
    
    - `natural_recipes`
      - `id` (uuid, primary key)
      - `title_ar` (text)
      - `description_ar` (text)
      - `ingredients` (jsonb)
      - `instructions` (text)
      - `suitable_for` (text[]) - أنواع البشرة المناسبة
      - `benefits` (text[])
      - `created_at` (timestamptz)
    
    - `user_scans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `product_name` (text)
      - `ingredients_scanned` (jsonb)
      - `analysis_result` (jsonb)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for ingredients and recipes
*/

CREATE TABLE IF NOT EXISTS skin_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  skin_type text NOT NULL,
  concerns jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  safety_rating text NOT NULL CHECK (safety_rating IN ('safe', 'caution', 'harmful')),
  is_natural boolean DEFAULT true,
  benefits jsonb DEFAULT '[]'::jsonb,
  concerns jsonb DEFAULT '[]'::jsonb,
  description_ar text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS natural_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_ar text NOT NULL,
  description_ar text NOT NULL,
  ingredients jsonb NOT NULL,
  instructions text NOT NULL,
  suitable_for text[] DEFAULT ARRAY[]::text[],
  benefits text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  product_name text NOT NULL,
  ingredients_scanned jsonb NOT NULL,
  analysis_result jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skin_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE natural_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own skin type"
  ON skin_types FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skin type"
  ON skin_types FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skin type"
  ON skin_types FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view ingredients"
  ON ingredients FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Everyone can view recipes"
  ON natural_recipes FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can view own scans"
  ON user_scans FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scans"
  ON user_scans FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scans"
  ON user_scans FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);