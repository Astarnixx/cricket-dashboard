'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { MatchPerformance } from '../../data/performance';
import { calculateFormTrend, calculateRunningAverage } from '../../utils/performanceUtils';

interface PerformanceTrendChartProps {
  matches: MatchPerformance[];
  playerName: string;
  isBatsman: boolean;
  isBowler: boolean;
}

export default function PerformanceTrendChart({ 
  matches, 
  playerName, 
  isBatsman, 
  isBowler 
}: PerformanceTrendChartProps) {
  // Prepare data for the chart
  const chartData = React.useMemo(() => {
    // Sort matches by date (oldest first) for proper chronological order
    const sortedMatches = [...matches].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Calculate batting trends
    const battingFormTrend = calculateFormTrend(sortedMatches, 'runs');
    const battingRunningAvg = calculateRunningAverage(sortedMatches, 'runs');
    
    // Calculate bowling trends
    const bowlingFormTrend = calculateFormTrend(sortedMatches, 'wickets');
    const bowlingRunningAvg = calculateRunningAverage(sortedMatches, 'wickets');
    
    return battingFormTrend.map((trend, index) => ({
      match: `M${trend.match}`,
      runs: battingFormTrend[index]?.value || 0,
      battingRunningAverage: battingRunningAvg[index]?.runningAverage || 0,
      wickets: bowlingFormTrend[index]?.value || 0,
      bowlingRunningAverage: bowlingRunningAvg[index]?.runningAverage || 0,
      opponent: trend.opponent,
      date: trend.date
    }));
  }, [matches]);

  const CustomTooltip = ({ active, payload, label }: any) => {
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
          <p className="text-xs text-gray-600 dark:text-gray-400">vs {data.opponent}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">{data.date}</p>
          <div className="mt-2 space-y-1">
            {payload.map((entry: any, index: number) => (
              <motion.p 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-xs" 
                style={{ color: entry.color }}
              >
                {entry.name}: {entry.value}
              </motion.p>
            ))}
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
        staggerChildren: 0.1
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
        Performance Trend - {playerName}
      </motion.h3>
      
      <motion.div 
        variants={chartVariants}
        className="h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="match" 
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
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              className="text-xs"
            />
            
            {/* Batting Lines */}
            {isBatsman && (
              <>
                <Line
                  type="monotone"
                  dataKey="runs"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
                  name="Runs"
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="battingRunningAverage"
                  stroke="#10b981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 2 }}
                  name="Batting Avg"
                  animationDuration={1800}
                  animationEasing="ease-out"
                />
              </>
            )}
            
            {/* Bowling Lines */}
            {isBowler && (
              <>
                <Line
                  type="monotone"
                  dataKey="wickets"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 3 }}
                  activeDot={{ r: 5, stroke: '#ef4444', strokeWidth: 2 }}
                  name="Wickets"
                  animationDuration={1500}
                  animationEasing="ease-out"
                />
                <Line
                  type="monotone"
                  dataKey="bowlingRunningAverage"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#f59e0b', strokeWidth: 2, r: 2 }}
                  name="Bowling Avg"
                  animationDuration={1800}
                  animationEasing="ease-out"
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
