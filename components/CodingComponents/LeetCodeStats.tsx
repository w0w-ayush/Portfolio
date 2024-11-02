import React from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Brain, Award, Users } from "lucide-react";
import { Badge } from "@/lib/types";
import type { LeetCodeStats } from "@/lib/types";
import { SiLeetcode } from "react-icons/si";

const Badges: React.FC<{ badges: Badge[] }> = ({ badges }) => {
  const BadgeIcons = {
    contest: Trophy,
    problem: Brain,
    other: Award,
  };

  return (
    <div className="mt-6">
      <p className="text-sm text-muted-foreground mb-4">Recent Achievements</p>
      <div className="grid grid-cols-3 gap-4">
        {badges?.map((badge, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm font-medium text-center line-clamp-2">
              {badge.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeetCodeStats: React.FC<{ data: LeetCodeStats | null }> = ({ data }) => {
  if (!data)
    return <p className="text-muted-foreground">Loading LeetCode stats...</p>;

  return (
    <Card className="p-6 lg:p-8 bg-muted hover:bg-primary/5 hover:shadow-lg transition-all duration-300 h-full border border-slate-800">
      <div className="flex items-center mb-6">
        <SiLeetcode className="w-8 h-8 lg:w-10 lg:h-10 text-primary mr-3" />
        <h3 className="text-2xl lg:text-3xl font-semibold">LeetCode</h3>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">Rating</p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {data.rating?.toFixed(0)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              Total Solved
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {data.stats?.totalSolved}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              Ranking
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {data.ranking}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5">
            <Award className="w-6 h-6 text-yellow-500" />
            <p className="text-lg font-medium">
              Contests Attended: {data.contestsAttended}
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5">
            <Users className="w-6 h-6 text-green-500" />
            <p className="text-lg font-medium">
              Global Ranking: {data.globalRanking}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-evenly gap-4 bg-primary/5 p-4 rounded-lg">
          <div>
            <p className="text-sm lg:text-base text-green-400">Easy</p>
            <p className="text-xl lg:text-2xl font-semibold">
              {data.stats?.easySolved || 0}
            </p>
          </div>
          <div>
            <p className="text-sm lg:text-base text-yellow-400">Medium</p>
            <p className="text-xl lg:text-2xl font-semibold">
              {data.stats?.mediumSolved || 0}
            </p>
          </div>
          <div>
            <p className="text-sm lg:text-base text-red-400">Hard</p>
            <p className="text-xl lg:text-2xl font-semibold">
              {data.stats?.hardSolved || 0}
            </p>
          </div>
        </div>

        <Badges badges={data.topBadges} />
      </div>
    </Card>
  );
};

export default LeetCodeStats;
