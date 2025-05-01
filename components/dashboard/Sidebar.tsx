import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/blogs', label: 'Blogs' },
  { href: '/dashboard/skills', label: 'Skills' },
  { href: '/dashboard/certifications', label: 'Certifications' },
  { href: '/dashboard/profile', label: 'Profile Settings' }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 p-6 bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      <nav className="flex flex-col space-y-3">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 ${
              pathname === link.href ? 'bg-gray-200 dark:bg-gray-700 font-semibold' : ''
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
