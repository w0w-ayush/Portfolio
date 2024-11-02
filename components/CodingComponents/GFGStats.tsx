import React from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Award, Users } from "lucide-react";
import { GFGData } from "@/lib/types";
import { SiGeeksforgeeks } from "react-icons/si";

interface GFGStatsProps {
  data: GFGData | null;
  className?: string;
}

const GFGStats: React.FC<GFGStatsProps> = ({ data }) => {
  // console.log("GFG", data);
  if (!data) {
    return (
      <p className="text-muted-foreground">Loading GeeksForGeeks stats...</p>
    );
  }

  return (
    <Card className="p-6 lg:p-8 bg-muted hover:bg-primary/5 hover:shadow-lg transition-all duration-300 h-full border border-slate-800">
      <div className="flex items-center mb-6">
        <SiGeeksforgeeks className="w-8 h-8 lg:w-10 lg:h-10 text-primary mr-3" />
        <h3 className="text-2xl lg:text-3xl font-semibold">GeeksForGeeks</h3>
      </div>

      <div className="space-y-8">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              Contest Rating
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {data.contests.rating}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              Total Solved
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {data.statistics.problemsSolved.total}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm lg:text-base text-muted-foreground">
              Global Rank
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {data.contests.globalRank}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between gap-10 w-full">
            <div className="space-y-2">
              <p className="text-sm lg:text-base text-muted-foreground">
                Institute Rank
              </p>
              <p className="text-3xl lg:text-4xl font-bold text-primary">
                {data.profile.rank} 🥇
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm lg:text-base text-muted-foreground">
                Institution
              </p>
              <p className="text-3xl lg:text-xl font-bold text-primary">
                {data.profile.institution}
              </p>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5">
            <Award className="w-6 h-6 text-yellow-500" />
            <p className="text-lg font-medium">
              Contests Attended: {data.contests.contestsAttended}
            </p>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <p className="text-lg font-medium">
              POTD Streak: {data.profile.currentPOTDStreak.current} 🔥
            </p>
          </div>

          {/* Current POTD */}
          {data.profile.globalRanking && (
            <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5">
              <Users className="w-6 h-6 text-green-500" />
              <p className="text-lg font-medium">
                Global Ranking: {data.profile.globalRanking}
              </p>
            </div>
          )}
        </div>

        {/* Problem Solving Stats */}
        <div className="flex flex-wrap justify-evenly gap-4 bg-primary/5 p-4 rounded-lg">
          <div>
            <p className="text-sm lg:text-base text-green-400">Easy</p>
            <p className="text-xl lg:text-2xl font-semibold">
              {data.statistics.problemsSolved.easy}
            </p>
          </div>
          <div>
            <p className="text-sm lg:text-base text-yellow-400">Medium</p>
            <p className="text-xl lg:text-2xl font-semibold">
              {data.statistics.problemsSolved.medium}
            </p>
          </div>
          <div>
            <p className="text-sm lg:text-base text-red-400">Hard</p>
            <p className="text-xl lg:text-2xl font-semibold">
              {data.statistics.problemsSolved.hard}
            </p>
          </div>
        </div>

        {/* Accuracy Stats (if available) */}
        {data.statistics.accuracy && (
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/5">
            <Award className="w-6 h-6 text-blue-500" />
            <p className="text-lg font-medium">
              Accuracy: {data.statistics.accuracy.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GFGStats;
