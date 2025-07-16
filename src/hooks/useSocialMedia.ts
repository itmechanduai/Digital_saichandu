import { useState, useEffect } from 'react'
import { supabase, SocialMediaAccount, SocialMediaPost } from '../lib/supabase'
import toast from 'react-hot-toast'

export const useSocialMedia = () => {
  const [accounts, setAccounts] = useState<SocialMediaAccount[]>([])
  const [posts, setPosts] = useState<SocialMediaPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAccounts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('social_media_accounts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setAccounts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to fetch social media accounts')
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .select(`
          *,
          account:social_media_accounts(*)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to fetch social media posts')
    }
  }

  const createPost = async (postData: Omit<SocialMediaPost, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('social_media_posts')
        .insert([postData])
        .select()
        .single()

      if (error) throw error
      
      setPosts(prev => [data, ...prev])
      toast.success('Post created successfully')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create post'
      toast.error(message)
      throw err
    }
  }

  const updateAccount = async (id: string, updates: Partial<SocialMediaAccount>) => {
    try {
      const { data, error } = await supabase
        .from('social_media_accounts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setAccounts(prev => prev.map(account => 
        account.id === id ? data : account
      ))
      toast.success('Account updated successfully')
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update account'
      toast.error(message)
      throw err
    }
  }

  const syncAccountStats = async (accountId: string) => {
    try {
      // In a real implementation, this would call the social media APIs
      // For now, we'll simulate updating stats
      const updates = {
        last_sync: new Date().toISOString(),
        followers_count: Math.floor(Math.random() * 1000) + 5000,
        engagement_rate: Math.random() * 10,
        posts_count: Math.floor(Math.random() * 50) + 100
      }

      await updateAccount(accountId, updates)
      toast.success('Account stats synced successfully')
    } catch (err) {
      toast.error('Failed to sync account stats')
    }
  }

  useEffect(() => {
    fetchAccounts()
    fetchPosts()
  }, [])

  return {
    accounts,
    posts,
    loading,
    error,
    createPost,
    updateAccount,
    syncAccountStats,
    refetch: () => {
      fetchAccounts()
      fetchPosts()
    }
  }
}