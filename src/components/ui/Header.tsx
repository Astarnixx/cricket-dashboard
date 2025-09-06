'use client';  // Required to use hooks & interactions
import React from 'react';
import ThemeSwitch from './themeswitch';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-300">
      <ThemeSwitch />
    </header>
  );
}

