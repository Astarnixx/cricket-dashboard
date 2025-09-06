export interface MatchPerformance {
  matchId: string;
  date: string;
  opponent: string;
  venue: string;
  format: 'Test' | 'ODI' | 'T20I';
  result: 'Win' | 'Loss' | 'Draw' | 'Tie';
  
  // Batting stats
  batting?: {
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
    notOut: boolean;
  };
  
  // Bowling stats
  bowling?: {
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
    bestFigures: string;
  };
}

export interface PlayerPerformance {
  playerId: string;
  playerName: string;
  careerStats: {
    totalMatches: number;
    totalRuns: number;
    totalWickets: number;
    battingAverage: number;
    bowlingAverage: number;
    strikeRate: number;
    economyRate: number;
  };
  recentForm: {
    last5Matches: MatchPerformance[];
    last10Matches: MatchPerformance[];
  };
  seasonalData: {
    year: number;
    matches: number;
    runs: number;
    wickets: number;
    battingAvg: number;
    bowlingAvg: number;
  }[];
  monthlyTrends: {
    month: string;
    year: number;
    runs: number;
    wickets: number;
    matches: number;
  }[];
  venuePerformance: {
    venue: string;
    matches: number;
    runs: number;
    wickets: number;
    avgRuns: number;
    avgWickets: number;
  }[];
  opponentPerformance: {
    opponent: string;
    matches: number;
    runs: number;
    wickets: number;
    avgRuns: number;
    avgWickets: number;
  }[];
}
