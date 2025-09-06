'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { players, Player } from '@/data/players';
import { FiFilter, FiX, FiSearch, FiUsers, FiGlobe, FiTarget } from 'react-icons/fi';
import { ErrorFallback } from './ErrorFallback';
import { Input } from './ui/input';

interface PlayerListProps {
  onSelectPlayer: (player: Player) => void;
}

export default function PlayerList({ onSelectPlayer }: PlayerListProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get unique countries and roles for filter options
  const countries = useMemo(() => {
    try {
      const uniqueCountries = Array.from(new Set(players.map(p => p.country)));
      return ['All', ...uniqueCountries.sort()];
    } catch {
      setError('Failed to load countries');
      return ['All'];
    }
  }, []);

  const roles = useMemo(() => {
    try {
      const uniqueRoles = Array.from(new Set(players.map(p => p.role)));
      return ['All', ...uniqueRoles.sort()];
    } catch {
      setError('Failed to load roles');
      return ['All'];
    }
  }, []);

  // Filter players based on search query and selected filters
  const filteredPlayers = useMemo(() => {
    try {
      return players.filter(player => {
        const countryMatch = selectedCountry === 'All' || player.country === selectedCountry;
        const roleMatch = selectedRole === 'All' || player.role === selectedRole;
        const searchMatch = searchQuery === '' || 
          player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          player.role.toLowerCase().includes(searchQuery.toLowerCase());
        
        return countryMatch && roleMatch && searchMatch;
      });
    } catch {
      setError('Failed to filter players');
      return [];
    }
  }, [selectedCountry, selectedRole, searchQuery]);

  const clearFilters = () => {
    setSelectedCountry('All');
    setSelectedRole('All');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedCountry !== 'All' || selectedRole !== 'All' || searchQuery !== '';

  const resetError = () => {
    setError(null);
  };

  if (error) {
    return <ErrorFallback title="Failed to Load Players" message={error} resetError={resetError} />;
  }

  return (
    <div className="h-full flex flex-col glass-card modern-border-radius-card overflow-hidden">
      {/* Search Bar */}
      <div className="flex-shrink-0 p-4 border-b border-white/20 dark:border-gray-700/30">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search players..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 glass-card border-0 focus:ring-2 focus:ring-blue-500/20 focus:modern-shadow-glow transition-all duration-300"
          />
        </div>
      </div>

      {/* Filter Header */}
      <div className="flex items-center justify-between flex-shrink-0 px-4 py-3 border-b border-white/20 dark:border-gray-700/30">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <FiUsers className="w-5 h-5 text-blue-500" />
          Players ({filteredPlayers.length})
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 glass-card rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
        >
          <FiFilter size={16} />
          Filter
        </motion.button>
      </div>

      {/* Filter Controls */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card border-b border-white/20 dark:border-gray-700/30 p-4 space-y-4 flex-shrink-0"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <FiTarget className="w-5 h-5 text-purple-500" />
                Filter Players
              </h4>
              {hasActiveFilters && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-sm gradient-primary text-white px-3 py-2 rounded-xl shadow-lg"
                >
                  <FiX size={16} />
                  Clear All
                </motion.button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiGlobe className="w-4 h-4" />
                  Country
                </label>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-3 glass-card border-0 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:modern-shadow-glow transition-all duration-300"
                >
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-3 glass-card border-0 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:modern-shadow-glow transition-all duration-300"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter Tags */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-wrap gap-2"
                >
                  {searchQuery !== '' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-2 gradient-warm text-white text-sm rounded-full shadow-lg"
                    >
                      Search: &ldquo;{searchQuery}&rdquo;
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSearchQuery('')}
                        className="hover:text-gray-200"
                      >
                        <FiX size={14} />
                      </motion.button>
                    </motion.span>
                  )}
                  {selectedCountry !== 'All' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-2 gradient-primary text-white text-sm rounded-full shadow-lg"
                    >
                      {selectedCountry}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedCountry('All')}
                        className="hover:text-gray-200"
                      >
                        <FiX size={14} />
                      </motion.button>
                    </motion.span>
                  )}
                  {selectedRole !== 'All' && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="inline-flex items-center gap-2 px-3 py-2 gradient-success text-white text-sm rounded-full shadow-lg"
                    >
                      {selectedRole}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedRole('All')}
                        className="hover:text-gray-200"
                      >
                        <FiX size={14} />
                      </motion.button>
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Player List */}
      <div className="flex-1 overflow-y-auto modern-scrollbar">
        {filteredPlayers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500 dark:text-gray-400"
          >
            <div className="w-16 h-16 mx-auto mb-4 glass-card rounded-2xl flex items-center justify-center">
              <FiUsers className="w-8 h-8 text-gray-400" />
            </div>
            {searchQuery !== '' ? (
              <>
                <p className="text-lg font-semibold mb-2">No players found</p>
                <p className="text-sm mb-4">matching &ldquo;<span className="font-medium">{searchQuery}</span>&rdquo;</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery('')}
                  className="gradient-primary text-white px-4 py-2 rounded-xl shadow-lg"
                >
                  Clear search
                </motion.button>
              </>
            ) : (
              <p className="text-lg font-semibold">No players found matching your filters</p>
            )}
          </motion.div>
        ) : (
          <div className="p-3 space-y-2">
            <AnimatePresence>
              {filteredPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => onSelectPlayer(player)}
                  className="glass-card-hover p-4 rounded-xl cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-lg text-gray-900 dark:text-white truncate mb-1">
                        {player.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <FiGlobe className="w-4 h-4" />
                          {player.country}
                        </span>
                        <span>•</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          player.role === 'Batsman' ? 'gradient-warm text-white' :
                          player.role === 'Bowler' ? 'gradient-cool text-white' :
                          player.role === 'All-rounder' ? 'gradient-primary text-white' :
                          'gradient-secondary text-white'
                        }`}>
                          {player.role}
                        </span>
                        <span>•</span>
                        <span>{player.matches}m</span>
                      </div>
                    </div>
                    <div className="text-right text-sm ml-4">
                      {player.battingAvg && (
                        <div className="text-gray-600 dark:text-gray-400 mb-1">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">B:</span> 
                          <span className="font-bold ml-1">{player.battingAvg}</span>
                        </div>
                      )}
                      {player.bowlingAvg && (
                        <div className="text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-green-600 dark:text-green-400">W:</span> 
                          <span className="font-bold ml-1">{player.bowlingAvg}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}