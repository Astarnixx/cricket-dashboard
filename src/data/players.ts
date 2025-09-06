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
  records: string[];      // Notable records and achievements
  bio: string;           // Player biography and description
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
    records: [
      "Fastest to 10,000 ODI runs (205 innings)",
      "Most ODI centuries (50)",
      "Most runs in a single IPL season (973 runs in 2016)",
      "Fastest to 8,000 ODI runs (175 innings)",
      "Most consecutive ODI centuries (5)"
    ],
    bio: "One of the greatest modern-era batsmen, Virat Kohli is known for his aggressive batting style and exceptional consistency. Former captain of the Indian cricket team, he revolutionized fitness standards in Indian cricket and is considered one of the best chasers in limited-overs cricket."
  },
  {
    id: "2",
    name: "Joe Root",
    country: "England",
    role: "Batsman",
    battingAvg: 50.05,
    matches: 146,
    runs: 6641,
    records: [
      "Most Test runs for England (11,000+ runs)",
      "Fastest Englishman to 10,000 Test runs",
      "Most Test centuries for England (30+)",
      "Youngest Englishman to score 1,000 Test runs",
      "Most runs in a calendar year for England (1,500+ in 2021)"
    ],
    bio: "England's premier Test batsman and former captain, Joe Root is known for his elegant technique and ability to play long innings. He's considered one of the finest batsmen of his generation and has been the backbone of England's batting lineup for over a decade."
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
    records: [
      "Fastest Indian bowler to 100 ODI wickets",
      "Best bowling figures for India in T20 World Cup (4/7)",
      "Most wickets in a single IPL season (27 wickets)",
      "First Indian bowler to take 5-wicket haul in South Africa",
      "Fastest to 50 ODI wickets for India"
    ],
    bio: "India's premier fast bowler known for his unique action and exceptional death bowling skills. Jasprit Bumrah has revolutionized fast bowling in India with his unorthodox action and ability to bowl accurate yorkers. He's considered one of the best death bowlers in world cricket."
  },
  {
    id: "4",
    name: "Kane Williamson",
    country: "New Zealand",
    role: "Batsman",
    battingAvg: 47.48,
    matches: 151,
    runs: 6172,
    records: [
      "ICC Test Player of the Year 2020",
      "Most Test runs for New Zealand (7,000+ runs)",
      "Highest Test score for New Zealand (251)",
      "Most Test centuries for New Zealand (25+)",
      "ICC World Test Championship winning captain"
    ],
    bio: "New Zealand's elegant batsman and former captain who led the team to their first ICC World Test Championship title. Kane Williamson is known for his calm demeanor, exceptional technique, and ability to play under pressure. He's considered one of the finest batsmen and leaders in modern cricket."
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
    records: [
      "ICC Cricketer of the Year 2019",
      "Most runs in a Test innings for England (258)",
      "ICC World Cup 2019 Player of the Match in final",
      "Most sixes in a Test innings (11)",
      "Fastest Test double century for England"
    ],
    bio: "England's dynamic all-rounder and former Test captain, Ben Stokes is known for his aggressive batting and crucial wicket-taking ability. He's famous for his match-winning performances in high-pressure situations, including the 2019 World Cup final and the Headingley Test against Australia."
  },
  {
    id: "6",
    name: "Steve Smith",
    country: "Australia",
    role: "Batsman",
    battingAvg: 53.61,
    matches: 128,
    runs: 7540,
    records: [
      "ICC Test Player of the Year 2017",
      "Fastest to 7,000 Test runs (126 innings)",
      "Most Test runs in a calendar year (1,500+ in 2019)",
      "Highest Test batting average among active players",
      "Most consecutive Test centuries (3)"
    ],
    bio: "Australia's premier batsman and former captain, Steve Smith is known for his unorthodox technique and exceptional consistency. Despite his unique batting style, he's considered one of the greatest Test batsmen of all time with an incredible ability to score runs across all conditions."
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
    records: [
      "Most wickets for New Zealand in T20 World Cup",
      "Best bowling figures for New Zealand in T20Is (4/13)",
      "Most wickets in a single IPL season (25 wickets)",
      "Fastest to 100 ODI wickets for New Zealand",
      "Most wickets in ICC World Cup 2019"
    ],
    bio: "New Zealand's premier left-arm fast bowler known for his swing bowling and ability to take wickets with the new ball. Trent Boult has been instrumental in New Zealand's success in major tournaments and is considered one of the best swing bowlers in world cricket."
  },
  {
    id: "8",
    name: "AB de Villiers",
    country: "South Africa",
    role: "Batsman",
    battingAvg: 50.66,
    matches: 228,
    runs: 9577,
    records: [
      "Fastest ODI century (31 balls)",
      "Fastest ODI 150 (64 balls)",
      "Most ODI runs for South Africa (9,500+ runs)",
      "Most sixes in an ODI innings (16)",
      "ICC ODI Player of the Year 2015"
    ],
    bio: "South Africa's legendary batsman known as 'Mr. 360' for his ability to hit the ball to all parts of the ground. AB de Villiers revolutionized modern batting with his innovative shots and exceptional hand-eye coordination. He's considered one of the most complete batsmen in cricket history."
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
    records: [
      "ICC Test Player of the Year 2021",
      "ICC Cricketer of the Year 2023",
      "Most Test wickets for Australia in 2021 (51 wickets)",
      "Best bowling figures for Australia in T20Is (3/15)",
      "Fastest to 200 Test wickets for Australia"
    ],
    bio: "Australia's premier fast bowler and current Test captain, Pat Cummins is known for his pace, accuracy, and ability to extract bounce from any surface. He's considered one of the best fast bowlers in the world and has been instrumental in Australia's recent Test success."
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
    records: [
      "ICC All-rounder of the Year 2019",
      "Most wickets for Bangladesh in ODIs (300+ wickets)",
      "Most runs for Bangladesh in T20Is (2,000+ runs)",
      "First Bangladeshi to score 10,000+ runs and take 300+ wickets",
      "Most Player of the Match awards for Bangladesh"
    ],
    bio: "Bangladesh's greatest cricketer and premier all-rounder, Shakib Al Hasan is known for his consistency with both bat and ball. He's been the backbone of Bangladesh cricket for over a decade and is considered one of the best all-rounders in the world across all formats."
  },
];
  