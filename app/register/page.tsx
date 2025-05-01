'use client'

import AuthForm from '@/components/AuthForm'
import { useUser } from '@/context/userContext'

export default function RegisterPage() {
    const {register} = useUser()

    const handleRegister = async (email: string, password: string) => {
        await register(email, password, "admin")
    }

    return (
        <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <AuthForm type="register" onSubmit={handleRegister} />
        </section>
    )
}
