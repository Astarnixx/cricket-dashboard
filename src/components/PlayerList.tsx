'use client';

import { useState, useMemo } from 'react';
import { players, Player } from '@/data/players';
import { FiFilter, FiX, FiSearch } from 'react-icons/fi';
import { LoadingSpinner, PlayerListSkeleton } from './LoadingSpinner';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get unique countries and roles for filter options
  const countries = useMemo(() => {
    try {
      const uniqueCountries = Array.from(new Set(players.map(p => p.country)));
      return ['All', ...uniqueCountries.sort()];
    } catch (err) {
      setError('Failed to load countries');
      return ['All'];
    }
  }, []);

  const roles = useMemo(() => {
    try {
      const uniqueRoles = Array.from(new Set(players.map(p => p.role)));
      return ['All', ...uniqueRoles.sort()];
    } catch (err) {
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
    } catch (err) {
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
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Search Bar */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search players by name, country, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Filter Header - Compact */}
      <div className="flex items-center justify-between flex-shrink-0 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Players ({filteredPlayers.length})
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <FiFilter size={12} />
          Filter
        </button>
      </div>

      {/* Filter Controls - Compact */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-700 p-3 space-y-2 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Filter Players</h4>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <FiX size={10} />
                Clear All
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium mb-1">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-xs font-medium mb-1">Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filter Tags - Compact */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-1">
              {searchQuery !== '' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="hover:text-purple-600 dark:hover:text-purple-300"
                  >
                    <FiX size={10} />
                  </button>
                </span>
              )}
              {selectedCountry !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  {selectedCountry}
                  <button
                    onClick={() => setSelectedCountry('All')}
                    className="hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    <FiX size={10} />
                  </button>
                </span>
              )}
              {selectedRole !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs rounded-full">
                  {selectedRole}
                  <button
                    onClick={() => setSelectedRole('All')}
                    className="hover:text-green-600 dark:hover:text-green-300"
                  >
                    <FiX size={10} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Player List - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <PlayerListSkeleton />
        ) : filteredPlayers.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
            {searchQuery !== '' ? (
              <>
                No players found matching "<span className="font-medium">{searchQuery}</span>"
                <br />
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 dark:text-blue-400 hover:underline mt-1"
                >
                  Clear search
                </button>
              </>
            ) : (
              'No players found matching your filters'
            )}
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredPlayers.map(player => (
              <div
                key={player.id}
                onClick={() => onSelectPlayer(player)}
                className="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-sm cursor-pointer transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">{player.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>{player.country}</span>
                      <span>•</span>
                      <span>{player.role}</span>
                      <span>•</span>
                      <span>{player.matches}m</span>
                    </div>
                  </div>
                  <div className="text-right text-xs ml-2">
                    {player.battingAvg && (
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">B:</span> {player.battingAvg}
                      </div>
                    )}
                    {player.bowlingAvg && (
                      <div className="text-gray-600 dark:text-gray-400">
                        <span className="font-medium">W:</span> {player.bowlingAvg}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}