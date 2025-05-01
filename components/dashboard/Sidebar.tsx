import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '../ThemeToggle'
import { useUser } from '@/context/userContext'
import { LogOutIcon, User2Icon } from 'lucide-react'



const links = [
  { href: '/dashboard/about', label: 'About' },
  { href: '/dashboard/skill', label: 'Skills' },
  { href: '/dashboard/experience', label: 'Experience' },
  { href: '/dashboard/education', label: 'Education' },
  { href: '/dashboard/certification', label: 'Certification' },
  { href: '/dashboard/blogs', label: 'Blogs' },
  { href: '/dashboard/recommendation', label: 'Recommendation' },
  { href: '/dashboard/contact', label: 'Contact' },
  { href: '/dashboard/user', label: 'User' }
]

export default function Sidebar() {
  const { loading, logout } = useUser()

  const pathname = usePathname()
  const handleLogout = () => {
    logout()
  }
  return (
    <aside className="flex flex-col items-between justify-between w-64 p-6 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <nav className="flex flex-col space-y-3">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 ${pathname === link.href ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
              }`}
            style={{ textDecoration: "none" }}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className='flex gap-2 mx-auto'>
        <Link
          href="/dashboard/profile"
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 dark:bg-white hover:cursor-pointer"
        >
          <User2Icon/>
        </Link>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-100 dark:bg-white hover:cursor-pointer"
          title='Logout'>
          {loading ? "Loading..." : <LogOutIcon className='dark:bg-gray-100 w-5 h-5' />}

        </button>
      </div>
    </aside>
  )
}
