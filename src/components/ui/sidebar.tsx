'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiHome, FiBarChart2, FiSun, FiMoon, FiTrendingUp } from 'react-icons/fi';
import { useTheme } from '../ThemeContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

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
    <aside className="w-full sm:w-full md:w-64 lg:w-48 glass-card p-4 md:p-6 shadow-xl flex flex-col">
      {/* Header with Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 md:mb-8"
      >
        <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
          <FiTrendingUp className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gradient">
          Cricket Analytics
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Player Performance Dashboard
        </p>
      </motion.div>
      
      <nav className="flex flex-row sm:flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-3 mb-6">
        {navLinks.map(({ href, label, icon }) => (
          <motion.div
            key={href}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href={href}
              className={`${baseLinkClass} ${isActive(href) ? activeLinkClass : ''}`}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Theme Switch */}
      <div className="mt-auto">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md glass-card text-gray-900 dark:text-white hover:shadow-lg transition-all duration-300"
        >
          {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          <span className="hidden sm:inline">
            {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </span>
        </motion.button>
      </div>
    </aside>
  );
}
