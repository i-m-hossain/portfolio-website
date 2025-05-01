'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface AuthFormProps {
    type: 'login' | 'register'
    onSubmit: (email: string, password: string) => Promise<void>
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await onSubmit(email, password)
        } catch (err: any) {
            setError(err.message || 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 capitalize">
                {type}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className="cursor-pointer w-full flex justify-center items-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            ></path>
                        </svg>
                    ) : (
                        type === 'login' ? 'Login' : 'Register'
                    )}
                </button>
            </form>

            <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
                {type === 'login' ? (
                    <>
                        Don't have an account? <a href="/register" className="text-blue-500">Register</a>
                    </>
                ) : (
                    <>
                        Already have an account? <a href="/login" className="text-blue-500">Login</a>
                    </>
                )}
            </p>
        </motion.div>
    )
}
