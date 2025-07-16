import { useState, useEffect } from 'react'
import { supabase, Customer } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCustomers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setCustomers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to fetch customers')
    } finally {
      setLoading(false)
    }
  }

  const createCustomer = async (customerData: Omit<Customer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customerData])
        .select()
        .single()

      if (error) throw error
      
      setCustomers(prev => [data, ...prev])
      toast.success('Customer created successfully')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create customer'
      toast.error(message)
      throw err
    }
  }

  const updateCustomer = async (id: string, updates: Partial<Customer>) => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setCustomers(prev => prev.map(customer => 
        customer.id === id ? data : customer
      ))
      toast.success('Customer updated successfully')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update customer'
      toast.error(message)
      throw err
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCustomers(prev => prev.filter(customer => customer.id !== id))
      toast.success('Customer deleted successfully')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to delete customer'
      toast.error(message)
      throw err
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return {
    customers,
    loading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    refetch: fetchCustomers
  }
}