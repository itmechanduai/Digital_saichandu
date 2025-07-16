/*
  # Create social media management tables

  1. New Tables
    - `social_media_accounts`
      - `id` (uuid, primary key)
      - `platform` (text, required)
      - `handle` (text, required)
      - `access_token` (text, optional, encrypted)
      - `followers_count` (integer, default 0)
      - `engagement_rate` (decimal, default 0)
      - `posts_count` (integer, default 0)
      - `status` (enum: connected, disconnected, error)
      - `last_sync` (timestamptz, optional)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `social_media_posts`
      - `id` (uuid, primary key)
      - `account_id` (uuid, foreign key to social_media_accounts)
      - `platform` (text, required)
      - `content` (text, required)
      - `media_urls` (text array, optional)
      - `scheduled_date` (timestamptz, optional)
      - `published_date` (timestamptz, optional)
      - `status` (enum: draft, scheduled, published, failed)
      - `engagement_stats` (jsonb, optional)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enums
CREATE TYPE social_account_status AS ENUM ('connected', 'disconnected', 'error');
CREATE TYPE post_status AS ENUM ('draft', 'scheduled', 'published', 'failed');

-- Create social_media_accounts table
CREATE TABLE IF NOT EXISTS social_media_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text NOT NULL,
  handle text NOT NULL,
  access_token text, -- This should be encrypted in production
  followers_count integer DEFAULT 0,
  engagement_rate decimal(5,2) DEFAULT 0,
  posts_count integer DEFAULT 0,
  status social_account_status DEFAULT 'disconnected',
  last_sync timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(platform, handle)
);

-- Create social_media_posts table
CREATE TABLE IF NOT EXISTS social_media_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid REFERENCES social_media_accounts(id) ON DELETE CASCADE,
  platform text NOT NULL,
  content text NOT NULL,
  media_urls text[],
  scheduled_date timestamptz,
  published_date timestamptz,
  status post_status DEFAULT 'draft',
  engagement_stats jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE social_media_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_media_posts ENABLE ROW LEVEL SECURITY;

-- Policies for social_media_accounts
CREATE POLICY "Authenticated users can manage social media accounts"
  ON social_media_accounts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for social_media_posts
CREATE POLICY "Authenticated users can manage social media posts"
  ON social_media_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_social_media_accounts_updated_at
  BEFORE UPDATE ON social_media_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_media_posts_updated_at
  BEFORE UPDATE ON social_media_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample social media accounts
INSERT INTO social_media_accounts (platform, handle, followers_count, engagement_rate, posts_count, status, last_sync) VALUES
('Facebook', '@digitalsaichandu', 12500, 4.2, 156, 'connected', now()),
('Instagram', '@digitalsaichandu', 8300, 6.8, 234, 'connected', now()),
('Twitter', '@digitalsaichandu', 5700, 3.1, 89, 'connected', now()),
('LinkedIn', 'Digital Saichandu', 3200, 5.4, 67, 'connected', now())
ON CONFLICT (platform, handle) DO NOTHING;