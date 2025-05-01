"use client"

import { useUser } from "@/context/userContext"
import { useRouter } from 'next/navigation'
import { useEffect } from "react"


export default function useAdminLayout() {
    const { user, loading } = useUser()
    const router = useRouter()
    useEffect(() => {
        if (!loading && (!user || user.user_metadata.role !== 'admin')) {
            router.push('/login')
        }
    }, [user, loading, router])
    
    
    return {user, loading} 
}