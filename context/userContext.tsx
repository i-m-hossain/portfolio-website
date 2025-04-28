'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface UserContextType {
  user: any
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  login: async () => { },
  register: async () => { },
  logout: () => { },
})

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  // This function will be called to login the user
  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      if (error.code === 'email_not_confirmed') {
        router.push(`/confirm-email/${email}`)
      } else {
        throw error
      }
      return
    }
    if (data.user) {
      toast.success('Login success!')
      setUser(data.user)
      localStorage.setItem('supabase-user', JSON.stringify(data.user)) // Store user in localStorage
    }
    if (data?.user?.user_metadata?.role === "admin") {
      router.push('/dashboard')
    } else {
      router.push('/')
    }

  }

  const register = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast(error.message)
      return
    }

    if (data.user) {
      toast.success('Login success!')
      setUser(data.user)
      localStorage.setItem('supabase-user', JSON.stringify(data.user)) // Store user in localStorage
    }
    router.push('/')


  }

  // This function will log out the user
  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('supabase-user') // Clear user from localStorage
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('supabase-user')

    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setLoading(false)
    }

    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser(session.user)
        localStorage.setItem('supabase-user', JSON.stringify(session.user))
      }
      setLoading(false)
    }

    if (!storedUser) {
      fetchSession()
    }

    // optional: Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const value = {
    user,
    loading,
    login,
    logout,
    register
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
