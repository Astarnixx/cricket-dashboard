'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiBarChart2 } from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();

  // Navigation links with icons
  const navLinks = [
    { label: 'Home', href: '/', icon: <FiHome size={18} /> },
    { label: 'Dashboard', href: '/dashboard', icon: <FiBarChart2 size={18} /> },
  ];

  // Function to check if link is active
  const isActive = (href: string) => pathname === href;

  // Shared link classes
  const baseLinkClass =
    'flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-150';

  const activeLinkClass = 'bg-gray-300 dark:bg-gray-700 font-semibold';

  return (
    <aside className="w-full sm:w-full md:w-64 lg:w-48 bg-gray-100 dark:bg-gray-900 p-4 md:p-6 shadow-lg">
      <h2 className="mb-6 md:mb-8 text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
        Cricket Dashboard
      </h2>
      <nav className="flex flex-row sm:flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-3">
        {navLinks.map(({ href, label, icon }) => (
          <Link
            href={href}
            key={href}
            className={`${baseLinkClass} ${isActive(href) ? activeLinkClass : ''}`}
          >
            {icon}
            <span className="hidden sm:inline">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
