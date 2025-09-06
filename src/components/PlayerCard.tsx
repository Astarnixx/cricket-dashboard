'use client';
import { motion } from 'framer-motion';
import { FiStar, FiTrendingUp, FiAward } from 'react-icons/fi';

interface PlayerCardProps {
  name: string;
  country: string;
  role: string;
  battingAvg?: number;
  bowlingAvg?: number;
  runs?: number;
  wickets?: number;
  onClick?: () => void;
}

export default function PlayerCard({ 
  name, 
  country, 
  role, 
  battingAvg, 
  bowlingAvg, 
  runs, 
  wickets, 
  onClick 
}: PlayerCardProps) {
  const getRoleColor = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('batsman')) return 'gradient-warm';
    if (roleLower.includes('bowler')) return 'gradient-cool';
    if (roleLower.includes('all-rounder')) return 'gradient-primary';
    return 'gradient-secondary';
  };

  const getRoleIcon = (role: string) => {
    const roleLower = role.toLowerCase();
    if (roleLower.includes('batsman')) return FiTrendingUp;
    if (roleLower.includes('bowler')) return FiStar;
    if (roleLower.includes('all-rounder')) return FiAward;
    return FiStar;
  };

  const RoleIcon = getRoleIcon(role);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`glass-card-hover modern-border-radius-card p-6 cursor-pointer group relative overflow-hidden ${
        onClick ? 'hover:modern-shadow-strong' : ''
      }`}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300 ${getRoleColor(role)}`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header with role icon */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${getRoleColor(role)} shadow-lg`}>
            <RoleIcon className="w-6 h-6 text-white" />
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
              {country}
            </div>
            <div className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-600 dark:text-gray-300">
              {role}
            </div>
          </div>
        </div>

        {/* Player name */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gradient transition-all duration-300">
          {name}
        </h3>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {battingAvg && (
            <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl">
              <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {battingAvg}
              </div>
              <div className="text-xs text-orange-500 dark:text-orange-300">
                Batting Avg
              </div>
            </div>
          )}
          
          {bowlingAvg && (
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                {bowlingAvg}
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-300">
                Bowling Avg
              </div>
            </div>
          )}
          
          {runs && (
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {runs.toLocaleString()}
              </div>
              <div className="text-xs text-green-500 dark:text-green-300">
                Runs
              </div>
            </div>
          )}
          
          {wickets && (
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
              <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                {wickets}
              </div>
              <div className="text-xs text-purple-500 dark:text-purple-300">
                Wickets
              </div>
            </div>
          )}
        </div>

        {/* Hover effect indicator */}
        {onClick && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
          </div>
        )}
      </div>
    </motion.div>
  );
}