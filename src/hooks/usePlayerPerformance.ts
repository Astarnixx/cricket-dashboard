'use client';

import { useState, useEffect } from 'react';
import { PlayerPerformance } from '../data/performance';
import { playerPerformanceData } from '../data/performanceData';

export function usePlayerPerformance(playerId: string) {
  const [performance, setPerformance] = useState<PlayerPerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const playerData = playerPerformanceData.find(p => p.playerId === playerId);
        
        if (!playerData) {
          throw new Error('Player performance data not found');
        }
        
        setPerformance(playerData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load performance data');
      } finally {
        setLoading(false);
      }
    };

    if (playerId) {
      fetchPerformance();
    }
  }, [playerId]);

  return { performance, loading, error };
}

// Hook to get performance data for multiple players
export function useMultiplePlayersPerformance(playerIds: string[]) {
  const [performances, setPerformances] = useState<PlayerPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerformances = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const playersData = playerPerformanceData.filter(p => playerIds.includes(p.playerId));
        
        if (playersData.length === 0) {
          throw new Error('No performance data found for selected players');
        }
        
        setPerformances(playersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load performance data');
      } finally {
        setLoading(false);
      }
    };

    if (playerIds.length > 0) {
      fetchPerformances();
    }
  }, [playerIds]);

  return { performances, loading, error };
}
