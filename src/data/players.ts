export interface Player {
  id: string;
  name: string;
  country: string;
  role: string;          // "Batsman", "Bowler", or "All-rounder"
  battingAvg?: number;
  bowlingAvg?: number;
  matches: number;
  runs: number;
  wickets?: number;
}
  
  export const players: Player[] = [
    {
      id: "1",
      name: "Virat Kohli",
      country: "India",
      role: "Batsman",
      battingAvg: 52.37,
      matches: 254,
      runs: 12169,
    },
    {
      id: "2",
      name: "Joe Root",
      country: "England",
      role: "Batsman",
      battingAvg: 50.05,
      matches: 146,
      runs: 6641,
    },
    {
      id: "3",
      name: "Jasprit Bumrah",
      country: "India",
      role: "Bowler",
      bowlingAvg: 24.52,
      matches: 67,
      runs: 10,
      wickets: 108,
    },
    {
      id: "4",
      name: "Kane Williamson",
      country: "New Zealand",
      role: "Batsman",
      battingAvg: 47.48,
      matches: 151,
      runs: 6172,
    },
    {
      id: "5",
      name: "Ben Stokes",
      country: "England",
      role: "All-rounder",
      battingAvg: 36.12,
      bowlingAvg: 32.45,
      matches: 90,
      runs: 4050,
      wickets: 40,
    },
    {
      id: "6",
      name: "Steve Smith",
      country: "Australia",
      role: "Batsman",
      battingAvg: 53.61,
      matches: 128,
      runs: 7540,
    },
    {
      id: "7",
      name: "Trent Boult",
      country: "New Zealand",
      role: "Bowler",
      bowlingAvg: 27.98,
      matches: 87,
      runs: 128,
      wickets: 241,
    },
    {
      id: "8",
      name: "AB de Villiers",
      country: "South Africa",
      role: "Batsman",
      battingAvg: 50.66,
      matches: 228,
      runs: 9577,
    },
    {
      id: "9",
      name: "Pat Cummins",
      country: "Australia",
      role: "Bowler",
      bowlingAvg: 21.89,
      matches: 48,
      runs: 157,
      wickets: 181,
    },
    {
      id: "10",
      name: "Shakib Al Hasan",
      country: "Bangladesh",
      role: "All-rounder",
      battingAvg: 33.47,
      bowlingAvg: 28.89,
      matches: 66,
      runs: 2304,
      wickets: 210,
    },
  ];
  