/*
  # Create invoices and related tables

  1. New Tables
    - `invoices`
      - `id` (uuid, primary key)
      - `invoice_number` (text, unique, required)
      - `customer_id` (uuid, foreign key to customers)
      - `order_id` (text, optional)
      - `status` (enum: draft, sent, paid, overdue, cancelled)
      - `issue_date` (date, required)
      - `due_date` (date, required)
      - `subtotal` (decimal, required)
      - `tax_amount` (decimal, default 0)
      - `total_amount` (decimal, required)
      - `currency` (text, default 'USD')
      - `notes` (text, optional)
      - `terms` (text, optional)
      - `payment_date` (timestamptz, optional)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

    - `invoice_items`
      - `id` (uuid, primary key)
      - `invoice_id` (uuid, foreign key to invoices)
      - `description` (text, required)
      - `quantity` (integer, required)
      - `rate` (decimal, required)
      - `amount` (decimal, required)
      - `created_at` (timestamptz, default now())

    - `payment_receipts`
      - `id` (uuid, primary key)
      - `receipt_number` (text, unique, required)
      - `invoice_id` (uuid, foreign key to invoices)
      - `customer_id` (uuid, foreign key to customers)
      - `amount` (decimal, required)
      - `payment_method` (text, required)
      - `payment_method_details` (jsonb, optional)
      - `transaction_id` (text, required)
      - `status` (enum: completed, pending, failed)
      - `payment_date` (timestamptz, required)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create enums
CREATE TYPE invoice_status AS ENUM ('draft', 'sent', 'paid', 'overdue', 'cancelled');
CREATE TYPE payment_status AS ENUM ('completed', 'pending', 'failed');

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  order_id text,
  status invoice_status DEFAULT 'draft',
  issue_date date NOT NULL,
  due_date date NOT NULL,
  subtotal decimal(10,2) NOT NULL,
  tax_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'USD',
  notes text,
  terms text,
  payment_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create invoice_items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  description text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  rate decimal(10,2) NOT NULL,
  amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create payment_receipts table
CREATE TABLE IF NOT EXISTS payment_receipts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  receipt_number text UNIQUE NOT NULL,
  invoice_id uuid REFERENCES invoices(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  amount decimal(10,2) NOT NULL,
  payment_method text NOT NULL,
  payment_method_details jsonb,
  transaction_id text NOT NULL,
  status payment_status DEFAULT 'pending',
  payment_date timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_receipts ENABLE ROW LEVEL SECURITY;

-- Policies for invoices
CREATE POLICY "Authenticated users can manage invoices"
  ON invoices
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for invoice_items
CREATE POLICY "Authenticated users can manage invoice items"
  ON invoice_items
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for payment_receipts
CREATE POLICY "Authenticated users can manage payment receipts"
  ON payment_receipts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Triggers for updated_at
CREATE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS text AS $$
DECLARE
  year_part text;
  sequence_num integer;
  invoice_num text;
BEGIN
  year_part := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-' || year_part || '-(\d+)') AS integer)), 0) + 1
  INTO sequence_num
  FROM invoices
  WHERE invoice_number LIKE 'INV-' || year_part || '-%';
  
  invoice_num := 'INV-' || year_part || '-' || LPAD(sequence_num::text, 3, '0');
  
  RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;

-- Function to generate receipt numbers
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS text AS $$
DECLARE
  year_part text;
  sequence_num integer;
  receipt_num text;
BEGIN
  year_part := EXTRACT(YEAR FROM CURRENT_DATE)::text;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(receipt_number FROM 'RCP-' || year_part || '-(\d+)') AS integer)), 0) + 1
  INTO sequence_num
  FROM payment_receipts
  WHERE receipt_number LIKE 'RCP-' || year_part || '-%';
  
  receipt_num := 'RCP-' || year_part || '-' || LPAD(sequence_num::text, 3, '0');
  
  RETURN receipt_num;
END;
$$ LANGUAGE plpgsql;