/*
  # Create abandoned_carts table

  1. New Tables
    - `abandoned_carts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable, references auth.users)
      - `email` (text, nullable)
      - `phone` (text, nullable)
      - `first_name` (text, nullable)
      - `last_name` (text, nullable)
      - `items` (jsonb, array of cart items)
      - `total_value` (numeric, total cart value)
      - `item_count` (integer, number of items)
      - `created_at` (timestamptz, when cart was created)
      - `last_activity` (timestamptz, last cart update)
      - `is_converted` (boolean, whether purchase completed)
      - `checkout_started` (boolean, whether checkout was started)
      - `user_agent` (text, browser info)
      - `referrer` (text, referring URL)
      - `recovery_emails_sent` (integer, number of recovery emails sent)
      - `last_email_sent` (timestamptz, when last email was sent)
  
  2. Security
    - Enable RLS on `abandoned_carts` table
    - Add policy for authenticated users to read their own data
    - Add policy for admins to read all data
*/

-- Create abandoned_carts table
CREATE TABLE IF NOT EXISTS abandoned_carts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  email text,
  phone text,
  first_name text,
  last_name text,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_value numeric NOT NULL DEFAULT 0,
  item_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  is_converted boolean DEFAULT false,
  checkout_started boolean DEFAULT false,
  user_agent text,
  referrer text,
  recovery_emails_sent integer DEFAULT 0,
  last_email_sent timestamptz,
  
  -- Ensure we have at least some way to identify the customer
  CONSTRAINT abandoned_carts_identification CHECK (
    user_id IS NOT NULL OR email IS NOT NULL OR phone IS NOT NULL
  )
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS abandoned_carts_user_id_idx ON abandoned_carts(user_id);
CREATE INDEX IF NOT EXISTS abandoned_carts_email_idx ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS abandoned_carts_is_converted_idx ON abandoned_carts(is_converted);
CREATE INDEX IF NOT EXISTS abandoned_carts_last_activity_idx ON abandoned_carts(last_activity);

-- Enable Row Level Security
ALTER TABLE abandoned_carts ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to read their own data
CREATE POLICY "Users can read own abandoned carts"
  ON abandoned_carts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for authenticated users to insert their own data
CREATE POLICY "Users can insert own abandoned carts"
  ON abandoned_carts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy for authenticated users to update their own data
CREATE POLICY "Users can update own abandoned carts"
  ON abandoned_carts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policy for admins to read all data
CREATE POLICY "Admins can read all abandoned carts"
  ON abandoned_carts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create policy for admins to update all data
CREATE POLICY "Admins can update all abandoned carts"
  ON abandoned_carts
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.role = 'admin'
    )
  );

-- Create policy for service role to manage all data
CREATE POLICY "Service role can manage all abandoned carts"
  ON abandoned_carts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);