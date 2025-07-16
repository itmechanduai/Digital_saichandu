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
      - `is_converted` (boolean, whether cart was converted to order)
      - `checkout_started` (boolean, whether checkout was started)
      - `user_agent` (text, browser user agent)
      - `referrer` (text, referrer URL)
      - `recovery_emails_sent` (integer, number of recovery emails sent)
      - `last_email_sent` (timestamptz, when last recovery email was sent)
  
  2. Security
    - Enable RLS on `abandoned_carts` table
    - Add policy for authenticated users to read their own data
    - Add policy for service role to read all data
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
  created_at timestamptz NOT NULL DEFAULT now(),
  last_activity timestamptz NOT NULL DEFAULT now(),
  is_converted boolean NOT NULL DEFAULT false,
  checkout_started boolean NOT NULL DEFAULT false,
  user_agent text,
  referrer text,
  recovery_emails_sent integer NOT NULL DEFAULT 0,
  last_email_sent timestamptz,
  
  -- Ensure at least one identifier is present
  CONSTRAINT abandoned_carts_identifier_check CHECK (
    user_id IS NOT NULL OR email IS NOT NULL OR phone IS NOT NULL
  )
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS abandoned_carts_user_id_idx ON abandoned_carts(user_id);
CREATE INDEX IF NOT EXISTS abandoned_carts_email_idx ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS abandoned_carts_is_converted_idx ON abandoned_carts(is_converted);
CREATE INDEX IF NOT EXISTS abandoned_carts_last_activity_idx ON abandoned_carts(last_activity);

-- Add comments for better documentation
COMMENT ON TABLE abandoned_carts IS 'Stores information about abandoned shopping carts';
COMMENT ON COLUMN abandoned_carts.user_id IS 'Reference to authenticated user if available';
COMMENT ON COLUMN abandoned_carts.items IS 'JSON array of cart items with product details';
COMMENT ON COLUMN abandoned_carts.is_converted IS 'Whether this cart was converted to an order';
COMMENT ON COLUMN abandoned_carts.checkout_started IS 'Whether the user started the checkout process';
COMMENT ON COLUMN abandoned_carts.recovery_emails_sent IS 'Number of cart recovery emails sent';

-- Enable Row Level Security
ALTER TABLE abandoned_carts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own abandoned carts"
  ON abandoned_carts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all abandoned carts"
  ON abandoned_carts
  FOR ALL
  TO service_role
  USING (true);

-- Allow anonymous access for tracking guest carts
CREATE POLICY "Allow anonymous inserts"
  ON abandoned_carts
  FOR INSERT
  TO anon
  WITH CHECK (true);