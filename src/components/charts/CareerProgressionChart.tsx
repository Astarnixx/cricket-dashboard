'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { PlayerPerformance } from '../../data/performance';

interface CareerProgressionChartProps {
  performance: PlayerPerformance;
}

export default function CareerProgressionChart({ performance }: CareerProgressionChartProps) {
  // Prepare career progression data
  const chartData = React.useMemo(() => {
    const { seasonalData } = performance;
    
    // Create cumulative data for career progression
    let cumulativeRuns = 0;
    let cumulativeWickets = 0;
    let cumulativeMatches = 0;
    
    return seasonalData.map((season, index) => {
      cumulativeRuns += season.runs;
      cumulativeWickets += season.wickets;
      cumulativeMatches += season.matches;
      
      return {
        year: season.year,
        runs: season.runs,
        wickets: season.wickets,
        matches: season.matches,
        cumulativeRuns,
        cumulativeWickets,
        cumulativeMatches,
        battingAvg: season.battingAvg,
        bowlingAvg: season.bowlingAvg
      };
    }); // Removed .reverse() to keep chronological order
  }, [performance]);

  // Define career milestones
  const milestones = React.useMemo(() => {
    const milestones: Array<{
      year: number;
      value: number;
      type: string;
      color: string;
    }> = [];
    let cumulativeRuns = 0;
    let cumulativeWickets = 0;
    
    chartData.forEach((data) => {
      cumulativeRuns += data.runs;
      cumulativeWickets += data.wickets;
      
      // Major milestones
      if (cumulativeRuns >= 1000 && !milestones.find(m => m.type === '1000 runs')) {
        milestones.push({
          year: data.year,
          value: cumulativeRuns,
          type: '1000 runs',
          color: '#3b82f6'
        });
      }
      if (cumulativeRuns >= 5000 && !milestones.find(m => m.type === '5000 runs')) {
        milestones.push({
          year: data.year,
          value: cumulativeRuns,
          type: '5000 runs',
          color: '#10b981'
        });
      }
      if (cumulativeWickets >= 50 && !milestones.find(m => m.type === '50 wickets')) {
        milestones.push({
          year: data.year,
          value: cumulativeWickets,
          type: '50 wickets',
          color: '#f59e0b'
        });
      }
      if (cumulativeWickets >= 100 && !milestones.find(m => m.type === '100 wickets')) {
        milestones.push({
          year: data.year,
          value: cumulativeWickets,
          type: '100 wickets',
          color: '#ef4444'
        });
      }
    });
    
    return milestones;
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      payload: {
        year: number;
        runs: number;
        wickets: number;
        matches: number;
        cumulativeRuns: number;
        cumulativeWickets: number;
        cumulativeMatches: number;
        battingAvg: number;
        bowlingAvg: number;
      };
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-xs"
        >
          <p className="font-semibold text-gray-900 dark:text-white text-sm">{label}</p>
          <div className="mt-2 space-y-1">
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xs text-blue-600"
            >
              Runs: {data.runs} (Total: {data.cumulativeRuns})
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs text-green-600"
            >
              Wickets: {data.wickets} (Total: {data.cumulativeWickets})
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xs text-gray-600 dark:text-gray-400"
            >
              Matches: {data.matches} (Total: {data.cumulativeMatches})
            </motion.p>
            {data.battingAvg > 0 && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xs text-purple-600"
              >
                Batting Avg: {data.battingAvg}
              </motion.p>
            )}
            {data.bowlingAvg > 0 && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-orange-600"
              >
                Bowling Avg: {data.bowlingAvg}
              </motion.p>
            )}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const milestoneVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full h-64 sm:h-72 md:h-80 bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-4"
    >
      <motion.h3 
        variants={headerVariants}
        className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-gray-900 dark:text-white px-2 sm:px-0"
      >
        Career Progression - {performance.playerName}
      </motion.h3>
      
      <motion.div 
        variants={chartVariants}
        className="h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorWickets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              fontSize={10}
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={10}
              tick={{ fontSize: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Career milestone reference lines */}
            {milestones.map((milestone, index) => (
              <ReferenceLine
                key={index}
                x={milestone.year}
                stroke={milestone.color}
                strokeDasharray="5 5"
                strokeWidth={2}
                label={{
                  value: milestone.type,
                  position: "top",
                  style: { fill: milestone.color, fontSize: '8px' }
                }}
              />
            ))}
            
            <Area
              type="monotone"
              dataKey="cumulativeRuns"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRuns)"
              name="Cumulative Runs"
              animationDuration={2000}
              animationEasing="ease-out"
            />
            
            <Area
              type="monotone"
              dataKey="cumulativeWickets"
              stroke="#10b981"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorWickets)"
              name="Cumulative Wickets"
              animationDuration={2000}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
      
      {/* Milestone Legend */}
      <motion.div 
        variants={milestoneVariants}
        className="mt-2 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 px-2 sm:px-0"
      >
        {milestones.map((milestone, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-1 text-xs cursor-pointer"
          >
            <div 
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
              style={{ backgroundColor: milestone.color }}
            />
            <span className="text-gray-600 dark:text-gray-400 text-xs">
              {milestone.type} ({milestone.year})
            </span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
