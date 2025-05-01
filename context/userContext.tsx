'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'

interface UserContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, role?: string) => Promise<void>
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
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

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

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        localStorage.setItem('supabase-user', JSON.stringify(session.user))
      } else {
        setUser(null)
        localStorage.removeItem('supabase-user')
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      if (error.code === 'email_not_confirmed') {
        router.push(`/confirm-email/${email}`)
      } else {
        toast.error(error.message)
      }
      return
    }

    if (data.user) {
      setUser(data.user)
      localStorage.setItem('supabase-user', JSON.stringify(data.user))
      toast.success('Login successful!')

      // Role-based redirect
      const role = data.user.user_metadata?.role
      router.push(role === 'admin' ? '/dashboard' : '/')
    }
  }

  const register = async (email: string, password: string, role: string = "user") => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role:role, // Default role unless otherwise specified
        },
      },
    })

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Registration successful! Please check your email to confirm.')
    router.push(`/confirm-email/${email}`)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    localStorage.removeItem('supabase-user')
    console.log("logout is called")
    router.push('/')
  }

  return (
    <UserContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
