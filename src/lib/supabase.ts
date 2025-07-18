import { createClient } from '@supabase/supabase-js'

// These values will be replaced with actual environment variables
// when the Supabase connection is established
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdWZtZnhwYnZqcWJxcnVwcXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5MjA5NTcsImV4cCI6MjAxMTQ5Njk1N30.Wy-HfYUmOt9Lw8RvtI4zAFMy0k0IoDYTqUh4I8zqZQE'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: 'user' | 'admin'
  avatar?: string
  is_phone_verified?: boolean
  created_at: string
  updated_at?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  address?: string
  city?: string
  zip_code?: string
  country?: string
  status: 'active' | 'inactive' | 'prospect' | 'churned'
  lead_source: string
  total_spent: number
  last_contact?: string
  next_follow_up?: string
  notes?: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  invoice_number: string
  customer_id: string
  order_id?: string
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
  issue_date: string
  due_date: string
  subtotal: number
  tax_amount: number
  total_amount: number
  currency: string
  notes?: string
  terms?: string
  payment_date?: string
  created_at: string
  updated_at: string
}

export interface InvoiceItem {
  id: string
  invoice_id: string
  description: string
  quantity: number
  rate: number
  amount: number
  created_at: string
}

export interface PaymentReceipt {
  id: string
  receipt_number: string
  invoice_id: string
  customer_id: string
  amount: number
  payment_method: string
  payment_method_details?: any
  transaction_id: string
  status: 'completed' | 'pending' | 'failed'
  payment_date: string
  created_at: string
}

export interface SocialMediaAccount {
  id: string
  platform: string
  handle: string
  access_token?: string
  followers_count: number
  engagement_rate: number
  posts_count: number
  status: 'connected' | 'disconnected' | 'error'
  last_sync: string
  created_at: string
  updated_at: string
}

export interface SocialMediaPost {
  id: string
  account_id: string
  platform: string
  content: string
  media_urls?: string[]
  scheduled_date?: string
  published_date?: string
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  engagement_stats?: any
  created_at: string
  updated_at: string
}