/*
  # Create customers table for CRM

  1. New Tables
    - `customers`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `email` (text, unique, required)
      - `phone` (text, optional)
      - `company` (text, optional)
      - `address` (text, optional)
      - `city` (text, optional)
      - `zip_code` (text, optional)
      - `country` (text, optional)
      - `status` (enum: active, inactive, prospect, churned)
      - `lead_source` (text)
      - `total_spent` (decimal, default 0)
      - `last_contact` (timestamptz, optional)
      - `next_follow_up` (timestamptz, optional)
      - `notes` (text, optional)
      - `tags` (text array, optional)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `customers` table
    - Add policies for authenticated users to manage customer data
*/

CREATE TYPE customer_status AS ENUM ('active', 'inactive', 'prospect', 'churned');

CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  company text,
  address text,
  city text,
  zip_code text,
  country text,
  status customer_status DEFAULT 'prospect',
  lead_source text NOT NULL DEFAULT 'website',
  total_spent decimal(10,2) DEFAULT 0,
  last_contact timestamptz,
  next_follow_up timestamptz,
  notes text,
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to manage customers
CREATE POLICY "Authenticated users can manage customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();