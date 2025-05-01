'use client'

import { useEffect, useState } from 'react'
import {  useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ConfirmEmailPage() {
  const params = useParams();
  const router = useRouter();
  const email = decodeURIComponent(params.email as string);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const checkEmailConfirmed = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error fetching user:', error.message);
          setError('Still waiting for email confirmation...');
          setChecking(false);
          return;
        }

        if (user?.email_confirmed_at) {
          router.replace('/');
        } else {
          setError('Please confirm your email and refresh the page.');
          setChecking(false);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Something went wrong.');
        setChecking(false);
      }
    };

    checkEmailConfirmed();
  }, [router]);

  const handleResend = async () => {
    if (!email) {
      setError('No email found to resend activation link.');
      return;
    }

    try {
      setIsResending(true);
      setMessage('');
      setError('');

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (error) {
        console.error('Error resending activation link:', error.message);
        setError('Failed to resend activation email. Please try again later.');
      } else {
        setMessage('Activation email resent successfully!');
      }
    } catch (err) {
      console.error('Unexpected resend error:', err);
      setError('Unexpected error occurred.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Confirm your Email</h1>

      {email ? (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          A confirmation link was sent to <strong>{email}</strong>. 
        </p>
      ) : (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          A confirmation link was sent to your email.
        </p>
      )}
      <p>After confirmation refresh the page.</p>
      {checking ? (
        <p className="text-gray-500 text-sm mb-4">Checking confirmation status...</p>
      ) : (
        <>
          <p className="text-red-500 text-sm mb-4">{error}</p>

          <button
            onClick={handleResend}
            disabled={isResending}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {isResending ? 'Resending...' : 'Resend Activation Email'}
          </button>

          {message && (
            <p className="text-green-500 text-sm mt-4">{message}</p>
          )}
        </>
      )}
    </div>
  );
}
