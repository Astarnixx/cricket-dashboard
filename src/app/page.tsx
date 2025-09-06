import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Cricket Analytics Dashboard</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-8">
          Comprehensive cricket player analytics and performance tracking
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Browse Players Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Browse Players</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Search and explore all cricket players with detailed statistics, filtering options, and performance analytics.
            </p>
            <Link 
              href="/dashboard" 
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Browse Players
            </Link>
          </div>

          {/* Compare Players Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Compare Players</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Compare multiple players side-by-side with interactive bar charts and radar visualizations.
            </p>
            <Link 
              href="/dashboard?tab=compare" 
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Compare Players
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Player Analytics</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Advanced search and filtering</li>
                <li>• Career progression tracking</li>
                <li>• Recent form analysis</li>
                <li>• Venue and opponent performance</li>
              </ul>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Interactive Charts</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Line charts for performance trends</li>
                <li>• Area charts for career progression</li>
                <li>• Bar and radar charts for comparisons</li>
                <li>• Responsive and mobile-friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
