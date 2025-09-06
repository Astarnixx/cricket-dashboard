'use client';
import { useTheme } from './ThemeContext';

export default function DebugTheme() {
  const { theme } = useTheme();
  
  return (
    <div className="fixed top-4 right-4 p-2 bg-yellow-200 text-black text-xs rounded">
      Current theme: {theme} | HTML class: {typeof window !== 'undefined' ? document.documentElement.className : 'loading...'}
    </div>
  );
}
