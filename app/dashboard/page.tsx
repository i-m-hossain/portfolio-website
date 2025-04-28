'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function DashboardPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser()

            if (error || !data?.user) {
                router.push('/login')
                return
            }

            const userRole = data.user.user_metadata?.role

            if (userRole !== 'admin') {
                router.push('/')  // or home '/'
            } else {
                setUser(data.user)
            }

            setLoading(false)
        }

        getUser()
    }, [router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
        toast.success('Successfully logged out! 👋')
        router.push('/')
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Hello, {user?.email}</p>

            <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
            >
                Logout
            </button>
        </section>
    )
}
