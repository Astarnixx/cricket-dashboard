'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { players, Player } from '@/data/players';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorFallback } from './ErrorFallback';

// Props interface
interface PlayerSearchProps {
  onSelectPlayer: (player: Player) => void;
}

export default function PlayerSearch({ onSelectPlayer }: PlayerSearchProps) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate loading for demo purposes (remove in production)
  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === '') {
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate potential error (remove in production)
      if (searchQuery.toLowerCase().includes('error')) {
        throw new Error('Simulated search error');
      }
      
      setShowResults(true);
    } catch {
      setError('Search failed');
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter players case-insensitive by name substring
  const filteredPlayers = useMemo(() => {
    if (query.trim() === '') return [];
    
    try {
      return players.filter(player =>
        player.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch {
      setError('Failed to filter players');
      return [];
    }
  }, [query]);

  // Handle player selection
  const handleSelect = (player: Player) => {
    setQuery(player.name);
    setShowResults(false);
    onSelectPlayer(player);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const resetError = () => {
    setError(null);
    handleSearch(query);
  };

  return (
    <div className="relative w-full max-w-md">
      <Input
        placeholder="Search player..."
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowResults(query.trim() !== '')}
        onBlur={() => setTimeout(() => setShowResults(false), 200)}
        className="w-full"
        disabled={isLoading}
      />
      
      {isLoading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <LoadingSpinner size="sm" text="Searching..." />
        </div>
      )}
      
      {error && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <ErrorFallback 
            title="Search Error"
            message={error}
            resetError={resetError}
          />
        </div>
      )}
      
      {showResults && !isLoading && !error && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-auto">
          {filteredPlayers.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No players found matching &ldquo;{query}&rdquo;
            </div>
          ) : (
            filteredPlayers.map(player => (
              <div
                key={player.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                onClick={() => handleSelect(player)}
              >
                <div className="font-semibold text-gray-900 dark:text-white">
                  {player.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {player.country} • {player.role}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
