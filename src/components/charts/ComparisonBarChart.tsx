'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { X, Plus, BarChart3, Radar as RadarIcon, TrendingUp } from 'lucide-react';
import { players } from '../../data/players';
import { playerPerformanceData } from '../../data/performanceData';
import { PlayerPerformance } from '../../data/performance';

interface ComparisonBarChartProps {
  className?: string;
}

interface ComparisonData {
  stat: string;
  [key: string]: string | number;
}

interface RadarData {
  stat: string;
  [key: string]: string | number;
}

type ChartType = 'bar' | 'radar';

export default function ComparisonBarChart({ className }: ComparisonBarChartProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedStat, setSelectedStat] = useState<string>('battingAverage');
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [multiStatMode, setMultiStatMode] = useState<boolean>(false);

  // Available stats for comparison
  const availableStats = [
    { key: 'battingAverage', label: 'Batting Average', category: 'Batting', max: 100 },
    { key: 'strikeRate', label: 'Strike Rate', category: 'Batting', max: 200 },
    { key: 'totalRuns', label: 'Total Runs', category: 'Batting', max: 10000 },
    { key: 'bowlingAverage', label: 'Bowling Average', category: 'Bowling', max: 50 },
    { key: 'economyRate', label: 'Economy Rate', category: 'Bowling', max: 10 },
    { key: 'totalWickets', label: 'Total Wickets', category: 'Bowling', max: 500 },
    { key: 'totalMatches', label: 'Total Matches', category: 'Career', max: 300 }
  ];

  // Get player performance data
  const getPlayerPerformance = (playerId: string): PlayerPerformance | undefined => {
    return playerPerformanceData.find(p => p.playerId === playerId);
  };

  // Prepare bar chart data
  const barChartData = useMemo(() => {
    if (selectedPlayers.length === 0) return [];

    const data: ComparisonData[] = [];
    
    // Create data for each stat
    availableStats.forEach(stat => {
      const statData: ComparisonData = { stat: stat.label };
      
      selectedPlayers.forEach(playerId => {
        const player = players.find(p => p.id === playerId);
        const performance = getPlayerPerformance(playerId);
        
        if (player && performance) {
          let value = 0;
          
          switch (stat.key) {
            case 'battingAverage':
              value = performance.careerStats.battingAverage;
              break;
            case 'strikeRate':
              value = performance.careerStats.strikeRate;
              break;
            case 'totalRuns':
              value = performance.careerStats.totalRuns;
              break;
            case 'bowlingAverage':
              value = performance.careerStats.bowlingAverage;
              break;
            case 'economyRate':
              value = performance.careerStats.economyRate;
              break;
            case 'totalWickets':
              value = performance.careerStats.totalWickets;
              break;
            case 'totalMatches':
              value = performance.careerStats.totalMatches;
              break;
          }
          
          statData[player.name] = value;
        }
      });
      
      data.push(statData);
    });

    return data;
  }, [selectedPlayers]);

  // Prepare radar chart data
  const radarChartData = useMemo(() => {
    if (selectedPlayers.length === 0) return [];

    const data: RadarData[] = [];
    
    // Create normalized data for radar chart
    availableStats.forEach(stat => {
      const statData: RadarData = { stat: stat.label };
      
      selectedPlayers.forEach(playerId => {
        const player = players.find(p => p.id === playerId);
        const performance = getPlayerPerformance(playerId);
        
        if (player && performance) {
          let value = 0;
          
          switch (stat.key) {
            case 'battingAverage':
              value = performance.careerStats.battingAverage;
              break;
            case 'strikeRate':
              value = performance.careerStats.strikeRate;
              break;
            case 'totalRuns':
              value = performance.careerStats.totalRuns;
              break;
            case 'bowlingAverage':
              value = performance.careerStats.bowlingAverage;
              break;
            case 'economyRate':
              value = performance.careerStats.economyRate;
              break;
            case 'totalWickets':
              value = performance.careerStats.totalWickets;
              break;
            case 'totalMatches':
              value = performance.careerStats.totalMatches;
              break;
          }
          
          // Normalize values for radar chart (0-100 scale)
          const normalizedValue = Math.min((value / stat.max!) * 100, 100);
          statData[player.name] = normalizedValue;
        }
      });
      
      data.push(statData);
    });

    return data;
  }, [selectedPlayers]);

  // Filtered chart data based on selected stat
  const filteredBarChartData = useMemo(() => {
    if (multiStatMode) return barChartData;
    const selectedStatLabel = availableStats.find(s => s.key === selectedStat)?.label;
    return barChartData.filter(d => d.stat === selectedStatLabel);
  }, [barChartData, selectedStat, multiStatMode]);

  // Add player to comparison
  const addPlayer = (playerId: string) => {
    if (!selectedPlayers.includes(playerId) && selectedPlayers.length < 5) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  // Remove player from comparison
  const removePlayer = (playerId: string) => {
    setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
  };

  // Get available players (not already selected)
  const availablePlayers = players.filter(player => !selectedPlayers.includes(player.id));

  // Generate colors for players
  const playerColors = [
    '#3b82f6', // Blue
    '#ef4444', // Red
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#8b5cf6'  // Purple
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-gray-800 p-3 sm:p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl max-w-xs"
        >
          <p className="font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 text-sm">{label}</p>
          <div className="space-y-1 sm:space-y-2">
            {payload.map((entry: any, index: number) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <div 
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs sm:text-sm font-medium">{entry.name}:</span>
                <span className="text-xs sm:text-sm font-bold" style={{ color: entry.color }}>
                  {typeof entry.value === 'number' ? entry.value.toFixed(2) : entry.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (selectedPlayers.length === 0) return null;

    switch (chartType) {
      case 'bar':
        return (
          <motion.div
            key="bar-chart"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={filteredBarChartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="stat" 
                  stroke="#6b7280"
                  fontSize={10}
                  angle={-45}
                  textAnchor="end"
                  height={60}
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
                {selectedPlayers.map((playerId, index) => {
                  const player = players.find(p => p.id === playerId);
                  return (
                    <Bar
                      key={playerId}
                      dataKey={player?.name}
                      fill={playerColors[index]}
                      radius={[4, 4, 0, 0]}
                      animationDuration={1200}
                      animationEasing="ease-out"
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        );

      case 'radar':
        return (
          <motion.div
            key="radar-chart"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={radarChartData}
                margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
              >
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis 
                  dataKey="stat" 
                  stroke="#6b7280"
                  fontSize={10}
                  tick={{ fontSize: 10 }}
                />
                <PolarRadiusAxis 
                  stroke="#6b7280"
                  fontSize={8}
                  domain={[0, 100]}
                  tickCount={6}
                  tick={{ fontSize: 8 }}
                />
                <Tooltip content={<CustomTooltip />} />
                {selectedPlayers.map((playerId, index) => {
                  const player = players.find(p => p.id === playerId);
                  return (
                    <Radar
                      key={playerId}
                      name={player?.name}
                      dataKey={player?.name}
                      stroke={playerColors[index]}
                      fill={playerColors[index]}
                      fillOpacity={0.1}
                      strokeWidth={2}
                      animationDuration={1200}
                      animationEasing="ease-out"
                    />
                  );
                })}
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
        );

      default:
        return null;
    }
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

  const playerTagVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      x: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}
    >
      {/* Header */}
      <motion.div 
        variants={headerVariants}
        className="p-3 sm:p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              Player Comparison Analytics
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
              Compare multiple players across different statistics
            </p>
          </div>
          
          {/* Chart Type Selector */}
          <AnimatePresence mode="wait">
            {selectedPlayers.length > 0 && (
              <motion.div 
                key="chart-selector"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="flex gap-2"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={chartType === 'bar' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setChartType('bar')}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Bar</span>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={chartType === 'radar' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setChartType('radar')}
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                  >
                    <RadarIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Radar</span>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Player Selection */}
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Selected Players ({selectedPlayers.length}/5)
            </label>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              <AnimatePresence>
                {selectedPlayers.map((playerId, index) => {
                  const player = players.find(p => p.id === playerId);
                  return (
                    <motion.div
                      key={playerId}
                      variants={playerTagVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                      style={{ borderLeft: `3px solid ${playerColors[index]}` }}
                    >
                      <div 
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                        style={{ backgroundColor: playerColors[index] }}
                      />
                      <span className="text-gray-900 dark:text-white">{player?.name}</span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removePlayer(playerId)}
                        className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              
              {selectedPlayers.length < 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Select onValueChange={addPlayer}>
                    <SelectTrigger className="w-40 sm:w-56 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-xs sm:text-sm">
                      <SelectValue placeholder="Add player..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePlayers.map(player => (
                        <SelectItem key={player.id} value={player.id}>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-xs sm:text-sm">{player.name}</span>
                            <span className="text-xs text-gray-500">({player.role})</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
              )}
            </div>
          </div>

          {/* Stat Selection */}
          <AnimatePresence>
            {selectedPlayers.length > 0 && chartType === 'bar' && (
              <motion.div 
                key="stat-selection"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
              >
                <div className="flex-1">
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Statistics to Compare
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Select value={selectedStat} onValueChange={setSelectedStat}>
                      <SelectTrigger className="w-full sm:w-64 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStats.map(stat => (
                          <SelectItem key={stat.key} value={stat.key}>
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm">{stat.label}</span>
                              <span className="text-xs text-gray-500">({stat.category})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant={multiStatMode ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setMultiStatMode(!multiStatMode)}
                        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm w-full sm:w-auto"
                      >
                        <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        {multiStatMode ? 'Single Stat' : 'All Stats'}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedPlayers.length === 0 && (
              <motion.div 
                key="empty-state"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-6 sm:py-8"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mb-3 sm:mb-4"
                >
                  <Plus className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-gray-300 dark:text-gray-600" />
                </motion.div>
                <p className="text-base sm:text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                  No Players Selected
                </p>
                <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
                  Add players above to start comparing their statistics
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Chart Area */}
      <AnimatePresence>
        {selectedPlayers.length > 0 && (
          <motion.div 
            key="chart-area"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="p-3 sm:p-6"
          >
            <div className="h-64 sm:h-80 md:h-96 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 sm:p-4">
              <AnimatePresence mode="wait">
                {renderChart()}
              </AnimatePresence>
            </div>
            
            {/* Chart Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-600 dark:text-gray-400 gap-2 sm:gap-0"
            >
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                {selectedPlayers.map((playerId, index) => {
                  const player = players.find(p => p.id === playerId);
                  return (
                    <motion.div 
                      key={playerId}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-1 sm:gap-2"
                    >
                      <div 
                        className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" 
                        style={{ backgroundColor: playerColors[index] }}
                      />
                      <span className="text-xs sm:text-sm">{player?.name}</span>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="text-left sm:text-right">
                {chartType === 'bar' && (
                  <p className="text-xs sm:text-sm">{multiStatMode ? 'All Statistics' : availableStats.find(s => s.key === selectedStat)?.label}</p>
                )}
                {chartType === 'radar' && (
                  <p className="text-xs sm:text-sm">Normalized Performance (0-100 scale)</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
