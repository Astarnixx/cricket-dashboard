import { PlayerPerformance, MatchPerformance } from '../data/performance';

// Calculate form trends
export const calculateFormTrend = (matches: MatchPerformance[], stat: 'runs' | 'wickets') => {
  return matches.map((match, index) => {
    const value = stat === 'runs' ? match.batting?.runs || 0 : match.bowling?.wickets || 0;
    return {
      match: index + 1,
      value,
      date: match.date,
      opponent: match.opponent
    };
  });
};

// Calculate running averages
export const calculateRunningAverage = (matches: MatchPerformance[], stat: 'runs' | 'wickets') => {
  let total = 0;
  let count = 0;
  
  return matches.map((match, index) => {
    const value = stat === 'runs' ? match.batting?.runs || 0 : match.bowling?.wickets || 0;
    total += value;
    count++;
    
    return {
      match: index + 1,
      runningAverage: Math.round((total / count) * 100) / 100,
      total,
      count
    };
  });
};

// Get performance by format
export const getPerformanceByFormat = (matches: MatchPerformance[]) => {
  const formats = ['Test', 'ODI', 'T20I'];
  
  return formats.map(format => {
    const formatMatches = matches.filter(match => match.format === format);
    const totalRuns = formatMatches.reduce((sum: number, match: MatchPerformance) => sum + (match.batting?.runs || 0), 0);
    const totalWickets = formatMatches.reduce((sum: number, match: MatchPerformance) => sum + (match.bowling?.wickets || 0), 0);
    const avgRuns = formatMatches.length > 0 ? Math.round((totalRuns / formatMatches.length) * 100) / 100 : 0;
    const avgWickets = formatMatches.length > 0 ? Math.round((totalWickets / formatMatches.length) * 100) / 100 : 0;
    
    return {
      format,
      matches: formatMatches.length,
      totalRuns,
      totalWickets,
      avgRuns,
      avgWickets
    };
  });
};

// Get performance by venue
export const getPerformanceByVenue = (performance: PlayerPerformance) => {
  return performance.venuePerformance.map((venue: {
    venue: string;
    matches: number;
    runs: number;
    wickets: number;
    avgRuns: number;
    avgWickets: number;
  }) => ({
    venue: venue.venue,
    matches: venue.matches,
    runs: venue.runs,
    wickets: venue.wickets,
    avgRuns: venue.avgRuns,
    avgWickets: venue.avgWickets
  }));
};

// Get performance by opponent
export const getPerformanceByOpponent = (performance: PlayerPerformance) => {
  return performance.opponentPerformance.map((opponent: {
    opponent: string;
    matches: number;
    runs: number;
    wickets: number;
    avgRuns: number;
    avgWickets: number;
  }) => ({
    opponent: opponent.opponent,
    matches: opponent.matches,
    runs: opponent.runs,
    wickets: opponent.wickets,
    avgRuns: opponent.avgRuns,
    avgWickets: opponent.avgWickets
  }));
};

// Calculate performance rating
export const calculatePerformanceRating = (performance: PlayerPerformance) => {
  const { careerStats } = performance;
  
  let rating = 0;
  
  // Batting rating (0-50 points)
  if (careerStats.battingAverage > 0) {
    rating += Math.min(careerStats.battingAverage * 0.8, 50);
  }
  
  // Bowling rating (0-50 points)
  if (careerStats.bowlingAverage > 0) {
    rating += Math.min((50 - careerStats.bowlingAverage) * 0.8, 50);
  }
  
  // Strike rate bonus
  if (careerStats.strikeRate > 0) {
    rating += Math.min((careerStats.strikeRate - 70) * 0.2, 10);
  }
  
  // Economy rate bonus
  if (careerStats.economyRate > 0) {
    rating += Math.min((6 - careerStats.economyRate) * 2, 10);
  }
  
  return Math.round(Math.max(0, Math.min(100, rating)));
};

// Get recent form summary
export const getRecentFormSummary = (performance: PlayerPerformance) => {
  const { last5Matches } = performance.recentForm;
  
  const totalRuns = last5Matches.reduce((sum: number, match: MatchPerformance) => sum + (match.batting?.runs || 0), 0);
  const totalWickets = last5Matches.reduce((sum: number, match: MatchPerformance) => sum + (match.bowling?.wickets || 0), 0);
  const avgRuns = Math.round((totalRuns / last5Matches.length) * 100) / 100;
  const avgWickets = Math.round((totalWickets / last5Matches.length) * 100) / 100;
  
  return {
    matches: last5Matches.length,
    totalRuns,
    totalWickets,
    avgRuns,
    avgWickets,
    form: avgRuns > 30 || avgWickets > 2 ? 'Good' : avgRuns > 20 || avgWickets > 1 ? 'Average' : 'Poor'
  };
};
