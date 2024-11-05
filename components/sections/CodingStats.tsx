"use client";

import { motion } from "framer-motion";
import useSWR from "swr";
import LeetCodeStats from "../CodingComponents/LeetCodeStats";
import GFGStats from "../CodingComponents/GFGStats";
import CalendarHeatmap from "../CodingComponents/CalendarHeatmap";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CodingStats() {
  const { data: leetcode } = useSWR("/api/leetcode", fetcher);
  const { data: gfg } = useSWR("/api/gfg", fetcher);

  // console.log("Leetcode - ", leetcode);
  // console.log("Geeksforgeeks - ", gfg);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <section className="py-20 bg-secondary/50" id="coding">
      <div className="container max-w-7xl px-4 mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12"
          {...fadeIn}
        >
          Competitive Coding Journey
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 ">
          {/* LeetCode Stats */}
          <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
            <LeetCodeStats data={leetcode} />
          </motion.div>

          {/* GeeksforGeeks Stats */}
          <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
            <GFGStats data={gfg} />
          </motion.div>

          {/* GitHub Stats */}
          {/* <motion.div {...fadeIn} transition={{ delay: 0.6 }}>
            <Card className="p-6 bg-card hover:shadow-lg transition-all">
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-primary mr-3" />
                <h3 className="text-xl font-semibold">GitHub</h3>
              </div>
              {github && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Contributions
                    </p>
                    <p className="text-2xl font-bold">{github.contributions}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        PRs Merged
                      </p>
                      <p className="font-semibold">{github.mergedPRs}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Repositories
                      </p>
                      <p className="font-semibold">
                        {github.topRepos?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div> */}
        </div>
        <CalendarHeatmap data={leetcode?.submissionCalendar} />
      </div>
    </section>
  );
}
