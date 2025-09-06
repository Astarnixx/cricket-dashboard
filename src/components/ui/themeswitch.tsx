'use client';
import { useTheme } from '../ThemeContext';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={toggleTheme}
        className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        {theme === 'dark' ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
