'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = segment.charAt(0).toUpperCase() + segment.slice(1);

        return { href, label };
    });

    return (
        <nav className="text-sm text-gray-500 p-4 dark:bg-gray-900 " aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link href="/" className="text-blue-600 hover:underline dark:text-white">
                        Home
                    </Link>
                    {breadcrumbs.length > 0 && <span className="mx-2">/</span>}
                </li>
                {breadcrumbs.map((crumb, index) => (
                    <li key={crumb.href} className="flex items-center">
                        {index === breadcrumbs.length - 1 ? (
                            <span className="text-gray-700 dark:text-white">{crumb.label}</span>
                        ) : (
                            <>
                                <Link href={crumb.href} className="text-blue-600 hover:underline dark:text-white">
                                    {crumb.label}
                                </Link>
                                <span className="mx-2">/</span>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
