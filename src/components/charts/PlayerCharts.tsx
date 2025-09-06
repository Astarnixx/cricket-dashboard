'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePlayerPerformance } from '../../hooks/usePlayerPerformance';
import { LoadingSpinner } from '../LoadingSpinner';
import { ErrorFallback } from '../ErrorFallback';
import PerformanceTrendChart from './PerformanceTrendChart';
import CareerProgressionChart from './CareerProgressionChart';

interface PlayerChartsProps {
  playerId: string;
  playerName: string;
  playerRole: string;
}

export default function PlayerCharts({ playerId, playerName, playerRole }: PlayerChartsProps) {
  const { performance, loading, error } = usePlayerPerformance(playerId);

  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4 sm:space-y-6"
      >
        <motion.div 
          variants={chartVariants}
          className="h-64 sm:h-72 md:h-80 bg-white dark:bg-gray-800 rounded-lg p-4"
        >
          <LoadingSpinner text="Loading performance charts..." />
        </motion.div>
        <motion.div 
          variants={chartVariants}
          className="h-64 sm:h-72 md:h-80 bg-white dark:bg-gray-800 rounded-lg p-4"
        >
          <LoadingSpinner text="Loading career progression..." />
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64 sm:h-72 md:h-80 bg-white dark:bg-gray-800 rounded-lg p-4"
      >
        <ErrorFallback 
          title="Failed to Load Charts"
          message={error}
        />
      </motion.div>
    );
  }

  if (!performance) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64 sm:h-72 md:h-80 bg-white dark:bg-gray-800 rounded-lg p-4"
      >
        <ErrorFallback 
          title="No Performance Data"
          message="Performance data not available for this player."
        />
      </motion.div>
    );
  }

  const isBatsman = playerRole === 'Batsman' || playerRole === 'All-rounder';
  const isBowler = playerRole === 'Bowler' || playerRole === 'All-rounder';

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 sm:space-y-6"
    >
      {/* Performance Trend Chart */}
      <motion.div variants={chartVariants}>
        <PerformanceTrendChart
          matches={performance.recentForm.last10Matches}
          playerName={playerName}
          isBatsman={isBatsman}
          isBowler={isBowler}
        />
      </motion.div>
      
      {/* Career Progression Chart */}
      <motion.div variants={chartVariants}>
        <CareerProgressionChart
          performance={performance}
        />
      </motion.div>
    </motion.div>
  );
}
