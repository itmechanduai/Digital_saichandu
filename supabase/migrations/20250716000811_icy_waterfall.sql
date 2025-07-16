/*
  # Create discounts table

  1. New Tables
    - `discounts`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `type` (text)
      - `value` (numeric)
      - `min_purchase` (numeric)
      - `max_discount` (numeric)
      - `start_date` (date)
      - `end_date` (date)
      - `is_active` (boolean)
      - `usage_limit` (integer)
      - `usage_count` (integer)
      - `applicable_categories` (text[])
      - `applicable_products` (text[])
      - `description` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  2. Security
    - Enable RLS on `discounts` table
    - Add policy for authenticated users to manage discounts
*/

CREATE TABLE IF NOT EXISTS discounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  type text NOT NULL,
  value numeric NOT NULL,
  min_purchase numeric,
  max_discount numeric,
  start_date date NOT NULL,
  end_date date NOT NULL,
  is_active boolean DEFAULT true,
  usage_limit integer,
  usage_count integer DEFAULT 0,
  applicable_categories text[],
  applicable_products text[],
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create trigger for updating updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_discounts_updated_at
BEFORE UPDATE ON discounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Authenticated users can manage discounts"
ON discounts
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Create index for faster lookups
CREATE INDEX discounts_code_idx ON discounts (code);
CREATE INDEX discounts_is_active_idx ON discounts (is_active);