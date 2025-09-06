import { PlayerPerformance, MatchPerformance } from '../data/performance';

// Helper function to generate random match performance
const generateMatchPerformance = (
  playerId: string, 
  isBatsman: boolean, 
  isBowler: boolean,
  matchNumber: number
): MatchPerformance => {
  const opponents = ['Australia', 'England', 'South Africa', 'New Zealand', 'Pakistan', 'Sri Lanka', 'West Indies', 'Bangladesh'];
  const venues = ['Melbourne', 'Sydney', 'London', 'Cape Town', 'Auckland', 'Karachi', 'Colombo', 'Bridgetown'];
  const formats: ('Test' | 'ODI' | 'T20I')[] = ['Test', 'ODI', 'T20I'];
  const results: ('Win' | 'Loss' | 'Draw' | 'Tie')[] = ['Win', 'Loss', 'Draw'];
  
  const opponent = opponents[Math.floor(Math.random() * opponents.length)];
  const venue = venues[Math.floor(Math.random() * venues.length)];
  const format = formats[Math.floor(Math.random() * formats.length)];
  const result = results[Math.floor(Math.random() * results.length)];
  
  const date = new Date();
  // M1 = 150 days ago (oldest), M2 = 135 days ago, M3 = 120 days ago, etc.
  date.setDate(date.getDate() - ((11 - matchNumber) * 15));
  
  const match: MatchPerformance = {
    matchId: `match_${playerId}_${matchNumber}`,
    date: date.toISOString().split('T')[0],
    opponent,
    venue,
    format,
    result
  };
  
  // Generate batting stats
  if (isBatsman) {
    const runs = Math.floor(Math.random() * 150) + 10;
    const balls = Math.floor(runs * (0.8 + Math.random() * 0.4));
    const fours = Math.floor(runs * 0.15);
    const sixes = Math.floor(runs * 0.05);
    const strikeRate = Math.round((runs / balls) * 100);
    
    match.batting = {
      runs,
      balls,
      fours,
      sixes,
      strikeRate,
      notOut: Math.random() > 0.7
    };
  }
  
  // Generate bowling stats
  if (isBowler) {
    const overs = Math.floor(Math.random() * 10) + 1;
    const maidens = Math.floor(Math.random() * overs);
    const runs = Math.floor(Math.random() * 50) + 10;
    const wickets = Math.floor(Math.random() * 5);
    const economy = Math.round((runs / overs) * 100) / 100;
    
    match.bowling = {
      overs,
      maidens,
      runs,
      wickets,
      economy,
      bestFigures: `${wickets}/${runs}`
    };
  }
  
  return match;
};

// Generate seasonal data
const generateSeasonalData = (years: number[], isBatsman: boolean, isBowler: boolean) => {
  return years.map(year => {
    const matches = Math.floor(Math.random() * 15) + 5;
    const runs = isBatsman ? Math.floor(Math.random() * 800) + 200 : 0;
    const wickets = isBowler ? Math.floor(Math.random() * 30) + 5 : 0;
    const battingAvg = isBatsman ? Math.round((Math.random() * 30 + 20) * 100) / 100 : 0;
    const bowlingAvg = isBowler ? Math.round((Math.random() * 20 + 15) * 100) / 100 : 0;
    
    return {
      year,
      matches,
      runs,
      wickets,
      battingAvg,
      bowlingAvg
    };
  });
};

// Generate monthly trends
const generateMonthlyTrends = (months: number, isBatsman: boolean, isBowler: boolean) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentYear = new Date().getFullYear();
  
  return Array.from({ length: months }, (_, index) => {
    const monthIndex = (new Date().getMonth() - index + 12) % 12;
    const year = currentYear - Math.floor(index / 12);
    
    return {
      month: monthNames[monthIndex],
      year,
      runs: isBatsman ? Math.floor(Math.random() * 200) + 50 : 0,
      wickets: isBowler ? Math.floor(Math.random() * 8) + 1 : 0,
      matches: Math.floor(Math.random() * 5) + 1
    };
  }).reverse();
};

// Generate venue performance
const generateVenuePerformance = (isBatsman: boolean, isBowler: boolean) => {
  const venues = ['Melbourne Cricket Ground', 'Lord\'s', 'Newlands', 'Eden Park', 'Gaddafi Stadium', 'R. Premadasa Stadium', 'Kensington Oval', 'Sher-e-Bangla National Stadium'];
  
  return venues.map(venue => {
    const matches = Math.floor(Math.random() * 8) + 2;
    const runs = isBatsman ? Math.floor(Math.random() * 400) + 100 : 0;
    const wickets = isBowler ? Math.floor(Math.random() * 15) + 3 : 0;
    
    return {
      venue,
      matches,
      runs,
      wickets,
      avgRuns: Math.round((runs / matches) * 100) / 100,
      avgWickets: Math.round((wickets / matches) * 100) / 100
    };
  });
};

// Generate opponent performance
const generateOpponentPerformance = (isBatsman: boolean, isBowler: boolean) => {
  const opponents = ['Australia', 'England', 'South Africa', 'New Zealand', 'Pakistan', 'Sri Lanka', 'West Indies', 'Bangladesh'];
  
  return opponents.map(opponent => {
    const matches = Math.floor(Math.random() * 10) + 3;
    const runs = isBatsman ? Math.floor(Math.random() * 500) + 150 : 0;
    const wickets = isBowler ? Math.floor(Math.random() * 20) + 5 : 0;
    
    return {
      opponent,
      matches,
      runs,
      wickets,
      avgRuns: Math.round((runs / matches) * 100) / 100,
      avgWickets: Math.round((wickets / matches) * 100) / 100
    };
  });
};

// Generate performance data for a specific player
export const generatePlayerPerformance = (playerId: string, playerName: string, role: string): PlayerPerformance => {
  const isBatsman = role === 'Batsman' || role === 'All-rounder';
  const isBowler = role === 'Bowler' || role === 'All-rounder';
  
  // Generate recent matches
  const last5Matches = Array.from({ length: 5 }, (_, i) => 
    generateMatchPerformance(playerId, isBatsman, isBowler, i + 1)
  );
  
  const last10Matches = Array.from({ length: 10 }, (_, i) => 
    generateMatchPerformance(playerId, isBatsman, isBowler, i + 1)
  );
  
  // Generate career stats
  const totalMatches = Math.floor(Math.random() * 100) + 50;
  const totalRuns = isBatsman ? Math.floor(Math.random() * 5000) + 2000 : 0;
  const totalWickets = isBowler ? Math.floor(Math.random() * 200) + 50 : 0;
  const battingAverage = isBatsman ? Math.round((Math.random() * 20 + 30) * 100) / 100 : 0;
  const bowlingAverage = isBowler ? Math.round((Math.random() * 15 + 20) * 100) / 100 : 0;
  const strikeRate = isBatsman ? Math.round((Math.random() * 30 + 70) * 100) / 100 : 0;
  const economyRate = isBowler ? Math.round((Math.random() * 2 + 4) * 100) / 100 : 0;
  
  // Generate seasonal data for 15 years (every 3 years: 2010, 2013, 2016, 2019, 2022, 2025)
  const years = [2010, 2013, 2016, 2019, 2022, 2025];
  
  return {
    playerId,
    playerName,
    careerStats: {
      totalMatches,
      totalRuns,
      totalWickets,
      battingAverage,
      bowlingAverage,
      strikeRate,
      economyRate
    },
    recentForm: {
      last5Matches,
      last10Matches
    },
    seasonalData: generateSeasonalData(years, isBatsman, isBowler),
    monthlyTrends: generateMonthlyTrends(12, isBatsman, isBowler),
    venuePerformance: generateVenuePerformance(isBatsman, isBowler),
    opponentPerformance: generateOpponentPerformance(isBatsman, isBowler)
  };
};

// Generate performance data for all players
export const generateAllPlayersPerformance = () => {
  const players = [
    { id: "1", name: "Virat Kohli", role: "Batsman" },
    { id: "2", name: "Joe Root", role: "Batsman" },
    { id: "3", name: "Jasprit Bumrah", role: "Bowler" },
    { id: "4", name: "Kane Williamson", role: "Batsman" },
    { id: "5", name: "Ben Stokes", role: "All-rounder" },
    { id: "6", name: "Steve Smith", role: "Batsman" },
    { id: "7", name: "Trent Boult", role: "Bowler" },
    { id: "8", name: "AB de Villiers", role: "Batsman" },
    { id: "9", name: "Pat Cummins", role: "Bowler" },
    { id: "10", name: "Shakib Al Hasan", role: "All-rounder" }
  ];
  
  return players.map(player => 
    generatePlayerPerformance(player.id, player.name, player.role)
  );
};

// Export the performance data
export const playerPerformanceData = generateAllPlayersPerformance();
