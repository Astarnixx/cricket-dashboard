'use client';
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PlayerList from '@/components/PlayerList';
import PlayerCharts from '@/components/charts/PlayerCharts';
import ComparisonBarChart from '@/components/charts/ComparisonBarChart';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import type { Player } from '@/data/players';
import { players } from '@/data/players';
import { FiX } from 'react-icons/fi';

export default function DashboardPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState<'browse' | 'comparison'>('browse');
  const searchParams = useSearchParams();

  // Handle URL parameters for direct player selection
  useEffect(() => {
    const playerId = searchParams.get('player');
    if (playerId) {
      const player = players.find(p => p.id === playerId);
      if (player) {
        setSelectedPlayer(player);
        setActiveTab('browse');
      }
    }
  }, [searchParams]);

  const clearSelection = () => {
    setSelectedPlayer(null);
  };

  const getPlayerType = (player: Player) => {
    const role = player.role.toLowerCase();
    return {
      isBatsman: role.includes('batsman') || role.includes('all-rounder'),
      isBowler: role.includes('bowler') || role.includes('all-rounder'),
      isAllRounder: role.includes('all-rounder')
    };
  };

  // Calculate summary stats
  const totalPlayers = players.length;
  const countries = new Set(players.map(p => p.country)).size;
  const roles = new Set(players.map(p => p.role)).size;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="h-screen flex">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 flex flex-col">
          {/* Header - Thinner */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Cricket Analytics
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              Player Performance Dashboard
            </p>
          </div>

          {/* Player List Summary - Compact */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Player List Summary
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Players</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">{totalPlayers}</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
                <p className="text-xs font-medium text-green-600 dark:text-green-400">Countries</p>
                <p className="text-lg font-bold text-green-700 dark:text-green-300">{countries}</p>
              </div>
            </div>
          </div>

          {/* Player List */}
          <div className="flex-1 overflow-hidden">
            <PlayerList onSelectPlayer={setSelectedPlayer} />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Navigation - Thinner */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'browse'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Player Analytics
              </button>
              <button
                onClick={() => setActiveTab('comparison')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'comparison'
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                Player Comparison
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden p-6">
            {activeTab === 'browse' && (
              <div className="h-full overflow-y-auto">
                {selectedPlayer ? (
                  <div className="space-y-6">
                    {/* Selected Player Info - More Compact */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* Player Image */}
                          <div className="relative">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-600 ${
                              selectedPlayer.country === 'India' ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                              selectedPlayer.country === 'Australia' ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                              selectedPlayer.country === 'England' ? 'bg-gradient-to-br from-blue-500 to-blue-700' :
                              selectedPlayer.country === 'Pakistan' ? 'bg-gradient-to-br from-green-400 to-green-600' :
                              selectedPlayer.country === 'South Africa' ? 'bg-gradient-to-br from-yellow-500 to-yellow-700' :
                              selectedPlayer.country === 'New Zealand' ? 'bg-gradient-to-br from-gray-600 to-gray-800' :
                              selectedPlayer.country === 'Sri Lanka' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                              selectedPlayer.country === 'Bangladesh' ? 'bg-gradient-to-br from-green-500 to-green-700' :
                              selectedPlayer.country === 'West Indies' ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                              selectedPlayer.country === 'Afghanistan' ? 'bg-gradient-to-br from-red-500 to-red-700' :
                              selectedPlayer.country === 'Ireland' ? 'bg-gradient-to-br from-green-600 to-green-800' :
                              selectedPlayer.country === 'Scotland' ? 'bg-gradient-to-br from-blue-600 to-blue-800' :
                              selectedPlayer.country === 'Netherlands' ? 'bg-gradient-to-br from-orange-500 to-orange-700' :
                              selectedPlayer.country === 'Zimbabwe' ? 'bg-gradient-to-br from-yellow-600 to-yellow-800' :
                              selectedPlayer.country === 'Canada' ? 'bg-gradient-to-br from-red-400 to-red-600' :
                              selectedPlayer.country === 'USA' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                              'bg-gradient-to-br from-gray-400 to-gray-600'
                            }`}>
                              <span className="text-lg font-bold text-white">
                                {selectedPlayer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                            {/* Country Flag Badge */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-800 shadow-lg flex items-center justify-center text-xs">
                              {selectedPlayer.country === 'India' ? '🇮🇳' :
                               selectedPlayer.country === 'Australia' ? '🇦🇺' :
                               selectedPlayer.country === 'England' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿' :
                               selectedPlayer.country === 'Pakistan' ? '🇵🇰' :
                               selectedPlayer.country === 'South Africa' ? '🇿🇦' :
                               selectedPlayer.country === 'New Zealand' ? '🇳🇿' :
                               selectedPlayer.country === 'Sri Lanka' ? '🇱🇰' :
                               selectedPlayer.country === 'Bangladesh' ? '🇧🇩' :
                               selectedPlayer.country === 'West Indies' ? '🇯🇲' :
                               selectedPlayer.country === 'Afghanistan' ? '🇦🇫' :
                               selectedPlayer.country === 'Ireland' ? '🇮🇪' :
                               selectedPlayer.country === 'Scotland' ? '🏴󠁧󠁢󠁳󠁣󠁴󠁿' :
                               selectedPlayer.country === 'Netherlands' ? '🇳🇱' :
                               selectedPlayer.country === 'Zimbabwe' ? '🇿🇼' :
                               selectedPlayer.country === 'Canada' ? '🇨🇦' :
                               selectedPlayer.country === 'USA' ? '🇺🇸' :
                               '🏏'}
                            </div>
                          </div>
                          
                          <div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
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
                      
                      {/* Performance Indicators - Compact */}
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
                    </div>

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
              </div>
            )}

            {activeTab === 'comparison' && (
              <div className="h-full">
                <ErrorBoundary>
                  <ComparisonBarChart />
                </ErrorBoundary>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
  
  