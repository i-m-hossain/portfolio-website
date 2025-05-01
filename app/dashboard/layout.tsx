'use client'
import Breadcrumb from '@/components/dashboard/Breadcrumb'
import Sidebar from '@/components/dashboard/Sidebar'
import useAdminLayout from '@/hooks/useAdminLayout'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminLayout()

  if (loading || !user) return <div className="p-4"> Loading....</div>

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
        <Breadcrumb/>
        {children}
      </main>
    </div>
  )
}
