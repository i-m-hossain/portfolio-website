'use client'

import AuthForm from '@/components/AuthForm'
import { useUser } from '@/context/userContext'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function LoginPage() {
    const { login, user} = useUser()
    useEffect(()=>{
        if(user){
            redirect("/")
        }
    },[user])
    const handleLogin = async (email: string, password: string) => {
        await login(email, password)
    }

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <AuthForm type="login" onSubmit={handleLogin} />
        </section>
    )
}
