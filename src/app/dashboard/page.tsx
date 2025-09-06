'use client';
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import PlayerList from '@/components/PlayerList';
import PlayerCharts from '@/components/charts/PlayerCharts';
import ComparisonBarChart from '@/components/charts/ComparisonBarChart';
import ChatBot from '@/components/ChatBot';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { Player } from '@/data/players';
import { players } from '@/data/players';
import { FiX, FiMessageCircle, FiBarChart, FiUsers, FiGlobe } from 'react-icons/fi';

function DashboardContent() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'comparison'>('browse');
  const [showChatBot, setShowChatBot] = useState(false);
  const searchParams = useSearchParams();

  // Handle URL parameters for direct player selection and tab switching
  useEffect(() => {
    const playerId = searchParams.get('player');
    const tab = searchParams.get('tab');
    
    if (playerId) {
      const player = players.find(p => p.id === playerId);
      if (player) {
        setSelectedPlayer(player);
        setActiveTab('browse');
      }
    }
    
    if (tab === 'compare') {
      setActiveTab('comparison');
    }
  }, [searchParams]);

  const clearSelection = () => {
    setSelectedPlayer(null);
  };

  // Calculate summary stats
  const totalPlayers = players.length;
  const countries = new Set(players.map(p => p.country)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="h-screen flex">
        {/* Sidebar */}
        <motion.div 
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-80 glass-card border-r border-white/20 dark:border-gray-700/30 flex flex-col shadow-xl"
        >

          {/* Stats Cards */}
          <div className="p-6 border-b border-white/20 dark:border-gray-700/30">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FiBarChart className="w-5 h-5 text-blue-500" />
                Overview
            </h2>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="glass-card-hover p-4 rounded-xl text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-2 gradient-primary rounded-xl flex items-center justify-center">
                    <FiUsers className="w-6 h-6 text-white" />
              </div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Players</p>
                  <p className="text-2xl font-bold text-gradient">{totalPlayers}</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="glass-card-hover p-4 rounded-xl text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-2 gradient-secondary rounded-xl flex items-center justify-center">
                    <FiGlobe className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Countries</p>
                  <p className="text-2xl font-bold text-gradient-warm">{countries}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Player List */}
          <div className="flex-1 overflow-hidden">
            <PlayerList onSelectPlayer={setSelectedPlayer} />
          </div>

          {/* AI Assistant Button */}
          <div className="p-4 border-t border-white/20 dark:border-gray-700/30">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowChatBot(true)}
              className="w-full px-4 py-2 gradient-primary text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <FiMessageCircle className="w-4 h-4" />
              <span>AI Assistant</span>
            </motion.button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Ask questions about players
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Navigation */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-card border-b border-white/20 dark:border-gray-700/30 px-8 py-4"
          >
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('browse')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'browse'
                    ? 'gradient-primary text-white shadow-lg'
                    : 'glass-card text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Player Analytics
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('comparison')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'comparison'
                    ? 'gradient-primary text-white shadow-lg'
                    : 'glass-card text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Player Comparison
              </motion.button>
            </div>
          </motion.div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'browse' && (
                <motion.div
                  key="browse"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full overflow-y-auto modern-scrollbar"
                >
                  {selectedPlayer ? (
                    <div className="space-y-8">
                      {/* Selected Player Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card-hover modern-border-radius-card p-8"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-6">
                            {/* Player Avatar */}
                            <div className="relative">
                              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white/50 dark:border-gray-600/50 ${
                                selectedPlayer.country === 'India' ? 'gradient-warm' :
                                selectedPlayer.country === 'Australia' ? 'gradient-secondary' :
                                selectedPlayer.country === 'England' ? 'gradient-primary' :
                                selectedPlayer.country === 'Pakistan' ? 'gradient-success' :
                                selectedPlayer.country === 'South Africa' ? 'gradient-secondary' :
                                selectedPlayer.country === 'New Zealand' ? 'gradient-dark' :
                                selectedPlayer.country === 'Sri Lanka' ? 'gradient-warm' :
                                selectedPlayer.country === 'Bangladesh' ? 'gradient-success' :
                                'gradient-primary'
                              }`}>
                                <span className="text-2xl font-bold text-white">
                                  {selectedPlayer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                              {/* Country Flag */}
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 glass-card rounded-xl border-2 border-white dark:border-gray-800 shadow-lg flex items-center justify-center text-sm">
                                {selectedPlayer.country === 'India' ? '🇮🇳' :
                                 selectedPlayer.country === 'Australia' ? '🇦🇺' :
                                 selectedPlayer.country === 'England' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' :
                                 selectedPlayer.country === 'Pakistan' ? '🇵🇰' :
                                 selectedPlayer.country === 'South Africa' ? '🇿🇦' :
                                 selectedPlayer.country === 'New Zealand' ? '🇳🇿' :
                                 selectedPlayer.country === 'Sri Lanka' ? '🇱🇰' :
                                 selectedPlayer.country === 'Bangladesh' ? '🇧🇩' :
                                 '🏏'}
                              </div>
                            </div>
                            
                            <div>
                              <h2 className="text-3xl font-bold text-gradient mb-2">
                                {selectedPlayer.name}
                              </h2>
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedPlayer.role === 'Batsman' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                  selectedPlayer.role === 'Bowler' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  selectedPlayer.role === 'All-rounder' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                  selectedPlayer.role === 'Wicket-keeper' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                }`}>
                                  {selectedPlayer.role}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  selectedPlayer.country === 'India' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                  selectedPlayer.country === 'Australia' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  selectedPlayer.country === 'England' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                  selectedPlayer.country === 'Pakistan' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  selectedPlayer.country === 'South Africa' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  selectedPlayer.country === 'New Zealand' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' :
                                  selectedPlayer.country === 'Sri Lanka' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                  selectedPlayer.country === 'Bangladesh' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                  selectedPlayer.country === 'West Indies' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                }`}>
                                  {selectedPlayer.country}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={clearSelection}
                            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                          >
                            <FiX size={18} />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-2 rounded-lg border-l-4 border-gray-400">
                            <span className="font-medium text-gray-600 dark:text-gray-400 text-xs">Matches</span>
                            <p className="font-semibold text-base text-gray-900 dark:text-white">{selectedPlayer.matches}</p>
                          </div>
                          
                          {selectedPlayer.battingAvg && (
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-2 rounded-lg border-l-4 border-blue-500">
                              <span className="font-medium text-blue-600 dark:text-blue-400 text-xs">Bat Avg</span>
                              <p className="font-semibold text-base text-blue-700 dark:text-blue-300">{selectedPlayer.battingAvg}</p>
                            </div>
                          )}
                          
                          {selectedPlayer.bowlingAvg && (
                            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-2 rounded-lg border-l-4 border-green-500">
                              <span className="font-medium text-green-600 dark:text-green-400 text-xs">Bowl Avg</span>
                              <p className="font-semibold text-base text-green-700 dark:text-green-300">{selectedPlayer.bowlingAvg}</p>
                            </div>
                          )}
                          
                          {selectedPlayer.runs && (
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-2 rounded-lg border-l-4 border-orange-500">
                              <span className="font-medium text-orange-600 dark:text-orange-400 text-xs">Runs</span>
                              <p className="font-semibold text-base text-orange-700 dark:text-orange-300">{selectedPlayer.runs}</p>
                            </div>
                          )}
                          
                          {selectedPlayer.wickets !== undefined && (
                            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-2 rounded-lg border-l-4 border-red-500">
                              <span className="font-medium text-red-600 dark:text-red-400 text-xs">Wickets</span>
                              <p className="font-semibold text-base text-red-700 dark:text-red-300">{selectedPlayer.wickets}</p>
                            </div>
                          )}
                        </div>
                        
                        {/* Performance Indicators */}
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              {selectedPlayer.matches > 50 ? 'High' : selectedPlayer.matches > 20 ? 'Medium' : 'Low'} Exp
                            </span>
                            {selectedPlayer.battingAvg && (
                              <span className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  selectedPlayer.battingAvg > 40 ? 'bg-green-400' :
                                  selectedPlayer.battingAvg > 25 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}></div>
                                {selectedPlayer.battingAvg > 40 ? 'Excellent' : selectedPlayer.battingAvg > 25 ? 'Good' : 'Average'} Bat
                              </span>
                            )}
                            {selectedPlayer.bowlingAvg && (
                              <span className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${
                                  selectedPlayer.bowlingAvg < 25 ? 'bg-green-400' :
                                  selectedPlayer.bowlingAvg < 35 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}></div>
                                {selectedPlayer.bowlingAvg < 25 ? 'Excellent' : selectedPlayer.bowlingAvg < 35 ? 'Good' : 'Average'} Bowl
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>

                      {/* Charts */}
                      <div>
                        <ErrorBoundary>
                          <PlayerCharts
                            playerId={selectedPlayer.id}
                            playerName={selectedPlayer.name}
                            playerRole={selectedPlayer.role}
                          />
                        </ErrorBoundary>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-4xl">🏏</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          Select a Player
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Choose a player from the sidebar to view their detailed analytics
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'comparison' && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <ErrorBoundary>
                    <ComparisonBarChart />
                  </ErrorBoundary>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Floating ChatBot Button */}
        <button
          onClick={() => setShowChatBot(!showChatBot)}
          className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-colors"
        >
          <FiMessageCircle size={24} />
        </button>

        {/* Floating ChatBot Panel */}
        {showChatBot && (
          <div className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="h-full">
              <ChatBot playerName={selectedPlayer?.name || null} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
  
  