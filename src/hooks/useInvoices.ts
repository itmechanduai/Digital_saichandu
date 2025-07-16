import { useState, useEffect } from 'react'
import { supabase, Invoice, InvoiceItem, PaymentReceipt } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:customers(*),
          invoice_items(*),
          payment_receipts(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setInvoices(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to fetch invoices')
    } finally {
      setLoading(false)
    }
  }

  const createInvoice = async (
    invoiceData: Omit<Invoice, 'id' | 'invoice_number' | 'created_at' | 'updated_at'>,
    items: Omit<InvoiceItem, 'id' | 'invoice_id' | 'created_at'>[]
  ) => {
    try {
      // Generate invoice number
      const { data: invoiceNumber, error: numberError } = await supabase
        .rpc('generate_invoice_number')

      if (numberError) throw numberError

      // Create invoice
      const { data: invoice, error: invoiceError } = await supabase
        .from('invoices')
        .insert([{ ...invoiceData, invoice_number: invoiceNumber }])
        .select()
        .single()

      if (invoiceError) throw invoiceError

      // Create invoice items
      const itemsWithInvoiceId = items.map(item => ({
        ...item,
        invoice_id: invoice.id
      }))

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsWithInvoiceId)

      if (itemsError) throw itemsError

      await fetchInvoices() // Refresh the list
      toast.success('Invoice created successfully')
      return invoice
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create invoice'
      toast.error(message)
      throw err
    }
  }

  const updateInvoiceStatus = async (id: string, status: Invoice['status']) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .update({ status, payment_date: status === 'paid' ? new Date().toISOString() : null })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setInvoices(prev => prev.map(invoice => 
        invoice.id === id ? data : invoice
      ))
      toast.success('Invoice status updated')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update invoice'
      toast.error(message)
      throw err
    }
  }

  const createPaymentReceipt = async (
    receiptData: Omit<PaymentReceipt, 'id' | 'receipt_number' | 'created_at'>
  ) => {
    try {
      // Generate receipt number
      const { data: receiptNumber, error: numberError } = await supabase
        .rpc('generate_receipt_number')

      if (numberError) throw numberError

      // Create receipt
      const { data: receipt, error: receiptError } = await supabase
        .from('payment_receipts')
        .insert([{ ...receiptData, receipt_number: receiptNumber }])
        .select()
        .single()

      if (receiptError) throw receiptError

      // Update invoice status to paid
      await updateInvoiceStatus(receiptData.invoice_id, 'paid')

      toast.success('Payment receipt created successfully')
      return receipt
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create payment receipt'
      toast.error(message)
      throw err
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  return {
    invoices,
    loading,
    error,
    createInvoice,
    updateInvoiceStatus,
    createPaymentReceipt,
    refetch: fetchInvoices
  }
}