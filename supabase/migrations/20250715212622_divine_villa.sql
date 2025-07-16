/*
  # Create abandoned carts tracking system

  1. New Tables
    - `abandoned_carts` - Stores information about carts that were abandoned
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
      - `last_activity` (timestamptz, last user activity)
      - `is_converted` (boolean, whether cart was converted to order)
      - `checkout_started` (boolean, whether checkout was started)
      - `user_agent` (text, browser info)
      - `referrer` (text, referral source)
      - `recovery_emails_sent` (integer, number of recovery emails sent)
      - `last_email_sent` (timestamptz, when last recovery email was sent)
  
  2. Security
    - Enable RLS on `abandoned_carts` table
    - Add policies for authenticated users to manage abandoned carts
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
  last_email_sent timestamptz
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS abandoned_carts_user_id_idx ON abandoned_carts(user_id);
CREATE INDEX IF NOT EXISTS abandoned_carts_email_idx ON abandoned_carts(email);
CREATE INDEX IF NOT EXISTS abandoned_carts_is_converted_idx ON abandoned_carts(is_converted);
CREATE INDEX IF NOT EXISTS abandoned_carts_last_activity_idx ON abandoned_carts(last_activity);

-- Enable Row Level Security
ALTER TABLE abandoned_carts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can do anything with abandoned_carts"
  ON abandoned_carts
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE role = 'admin'
  ));

CREATE POLICY "Users can view their own abandoned_carts"
  ON abandoned_carts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anon can insert abandoned_carts"
  ON abandoned_carts
  FOR INSERT
  TO anon
  WITH CHECK (true);

COMMENT ON TABLE abandoned_carts IS 'Stores information about abandoned shopping carts for retargeting';