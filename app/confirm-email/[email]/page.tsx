'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import toast from 'react-hot-toast'

export default function ConfirmEmailPage() {
  const params = useParams();
  const router = useRouter();
  const email = decodeURIComponent(params.email as string);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    checkEmailConfirmed()
  }, [])

  // Optional: Auto-polling every 5 seconds (uncomment if needed)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     checkEmailConfirmed(true)
  //   }, 5000)
  //   return () => clearInterval(interval)
  // }, [])


  const checkEmailConfirmed = async (silent = false) => {
    try {
      if (!silent) setIsRefreshing(true)

      const { data: { user }, error } = await supabase.auth.getUser()
      console.log({error})
      if (error) {
        if (!silent) setError('Still waiting for email confirmation...')
        return
      }

      if (user?.email_confirmed_at) {
        toast.success('Email confirmed!')
        router.replace('/')
      } else if (!silent) {
        setError('Email is not confirmed yet.')
      }
    } catch (err) {
      if (!silent) setError('Something went wrong.')
    } finally {
      setChecking(false)
      if (!silent) setIsRefreshing(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      setError('No email found to resend activation link.')
      return
    }

    try {
      setIsResending(true)
      setMessage('')
      setError('')

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) {
        setError('Failed to resend activation email. Please try again later.')
      } else {
        setMessage('Activation email resent successfully!')
      }
    } catch (err) {
      setError('Unexpected error occurred.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Confirm your Email!</h1>

      <p className="text-gray-700 dark:text-gray-300 mb-2">
        A confirmation link was sent to <strong>{email || 'your email'}</strong>.
      </p>
      <p>After confirmation, click refresh below.</p>

      {checking ? (
        <p className="text-gray-500 text-sm mb-4">Checking confirmation status...</p>
      ) : (
        <>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => checkEmailConfirmed()}
              disabled={isRefreshing}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            >
              {isRefreshing ? 'Refreshing...' : 'Refresh Status'}
            </button>

            <button
              onClick={handleResend}
              disabled={isResending}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              {isResending ? 'Resending...' : 'Resend Activation Email'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
