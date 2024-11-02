//GFG TYPES
export interface ProblemsSolved {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

export interface Contest {
  contestsAttended: number;
  globalRank: number;
  rating: number;
}

export interface GFGProfile {
  rank: number;
  contestRating: number;
  institution: string;
  currentPOTDStreak: {
    current: number;
    max?: number;
  };
  totalContests?: number;
  globalRanking?: number;
}

export interface GFGStatistics {
  problemsSolved: ProblemsSolved;
  accuracy?: number;
}

export interface GFGData {
  profile: GFGProfile;
  statistics: GFGStatistics;
  contests: Contest;
}

// LEETCODE TYPES
export interface Badge {
  name: string;
  icon: string;
}

export interface LeetCodeStats {
  stats: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
  };
  ranking: number;
  rating: number;
  contestsAttended: number;
  globalRanking: number;
  reputation: number;
  starRating: number;
  aboutMe: string;
  topBadges: Badge[];
  submissionCalendar: Record<string, number>;
}
