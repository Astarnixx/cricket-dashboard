'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiBarChart, FiUsers, FiTarget, FiZap, FiGlobe, FiAward, FiActivity } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto gradient-primary rounded-3xl flex items-center justify-center shadow-xl">
              <FiTrendingUp className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-3 -right-3 w-8 h-8 gradient-secondary rounded-full animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Cricket Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive cricket player analytics and performance tracking with AI-powered insights
          </p>
        </motion.div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Browse Players Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="glass-card-hover modern-border-radius-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                <FiUsers className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse Players</h2>
                <p className="text-gray-600 dark:text-gray-400">Explore comprehensive player data</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Search and explore all cricket players with detailed statistics, advanced filtering options, 
              and interactive performance analytics. Discover insights about batting averages, bowling figures, 
              and career progression.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/dashboard" 
                className="inline-flex items-center gap-2 modern-button gradient-primary shadow-lg hover:shadow-xl"
              >
                <FiBarChart className="w-5 h-5" />
                Browse Players
              </Link>
            </motion.div>
          </motion.div>

          {/* Compare Players Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="glass-card-hover modern-border-radius-card p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 gradient-secondary rounded-2xl flex items-center justify-center shadow-lg">
                <FiTarget className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Compare Players</h2>
                <p className="text-gray-600 dark:text-gray-400">Side-by-side analysis</p>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Compare multiple players side-by-side with interactive bar charts and radar visualizations. 
              Analyze performance metrics, identify strengths and weaknesses, and make data-driven decisions.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/dashboard?tab=compare" 
                className="inline-flex items-center gap-2 modern-button gradient-secondary shadow-lg hover:shadow-xl"
              >
                <FiTarget className="w-5 h-5" />
                Compare Players
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need for comprehensive cricket analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Player Analytics */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover modern-border-radius-card p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 gradient-warm rounded-xl flex items-center justify-center shadow-lg">
                <FiActivity className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Player Analytics</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Advanced search & filtering</li>
                <li>• Career progression tracking</li>
                <li>• Recent form analysis</li>
                <li>• Venue performance</li>
              </ul>
            </motion.div>
            
            {/* Interactive Charts */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover modern-border-radius-card p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 gradient-cool rounded-xl flex items-center justify-center shadow-lg">
                <FiBarChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Interactive Charts</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Performance trend lines</li>
                <li>• Career progression areas</li>
                <li>• Comparison bar charts</li>
                <li>• Mobile responsive</li>
              </ul>
            </motion.div>
            
            {/* AI Assistant */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover modern-border-radius-card p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <FiZap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">AI Assistant</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Smart player insights</li>
                <li>• Performance predictions</li>
                <li>• Natural language queries</li>
                <li>• Real-time analysis</li>
              </ul>
            </motion.div>
            
            {/* Global Coverage */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="glass-card-hover modern-border-radius-card p-6 text-center"
            >
              <div className="w-12 h-12 mx-auto mb-4 gradient-success rounded-xl flex items-center justify-center shadow-lg">
                <FiGlobe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Global Coverage</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• International players</li>
                <li>• Multiple formats</li>
                <li>• Historical data</li>
                <li>• Live updates</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </div>
  );
}
