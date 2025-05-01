'use client'

import Layout from '@/components/Layout';
import { useUser } from '@/context/userContext'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
    const { user } = useUser();
    const router = useRouter();

    if (!user) {
        // Redirect to login if not logged in
        router.replace('/login');
        return null;
    }

    return (
        <div className="g-white dark:bg-gray-800 flex flex-col items-center justify-center max-h-screen">
            <div className="bg-white dark:bg-gray-200 shadow-md rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center my-2">My Profile</h1>

                <div className="flex flex-col space-y-4">
                    <div>
                        <span className="text-gray-500 dark:text-gray-300">Email:</span>
                        <p className="text-lg font-semibold dark:text-gray-100">{user.email}</p>
                    </div>

                    <div>
                        <span className="text-gray-500 dark:text-gray-300">User ID:</span>
                        <p className="text-lg font-semibold dark:text-gray-100">{user.id}</p>
                    </div>

                    {user.role && (
                        <div>
                            <span className="text-gray-500 dark:text-gray-300">Role:</span>
                            <p className="text-lg font-semibold dark:text-gray-100 capitalize">{user.role}</p>
                        </div>
                    )}

                    {user.created_at && (
                        <div>
                            <span className="text-gray-500 dark:text-gray-300">Joined:</span>
                            <p className="text-lg font-semibold dark:text-gray-100">{new Date(user.created_at).toLocaleDateString()}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
