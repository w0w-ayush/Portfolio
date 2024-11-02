import { Card } from "@/components/ui/card";
import { GITHUB_USERNAME } from "@/lib/api-utils";
import useSWR from "swr";
import GitHubCalendar from "react-github-calendar";
import { motion } from "framer-motion";
import {
  Github,
  GitPullRequest,
  GitFork,
  Star,
  Users,
  BookOpen,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const animationVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const getIntensityColor = (count: number): string => {
  if (count === 0) return "#1f2937";
  if (count <= 2) return "#064e3b";
  if (count <= 4) return "#047857";
  if (count <= 6) return "#10b981";
  return "#6ee7b7";
};

const theme = {
  light: [
    getIntensityColor(0),
    getIntensityColor(1),
    getIntensityColor(3),
    getIntensityColor(5),
    getIntensityColor(7),
  ],
  dark: [
    getIntensityColor(0),
    getIntensityColor(1),
    getIntensityColor(3),
    getIntensityColor(5),
    getIntensityColor(7),
  ],
};

export function GitHubStats() {
  const { data, error, isLoading } = useSWR("/api/github", fetcher, {
    refreshInterval: 300000,
    revalidateOnFocus: false,
  });

  console.log("Github data - ", data);

  const stats = [
    {
      icon: <Github />,
      label: "Contributions",
      value: data?.stats?.totalContributions,
    },
    {
      icon: <GitPullRequest />,
      label: "Merged PRs",
      value: data?.stats?.mergedPRs,
    },
    // { icon: <GitFork />, label: "Forks", value: data?.stats?.forkedRepos },
    { icon: <Star />, label: "Stars", value: data?.stats?.starredRepos },
    // { icon: <Users />, label: "Followers", value: data?.user?.followers },
    {
      icon: <BookOpen />,
      label: "Repositories",
      value: data?.user?.publicRepos,
    },
  ];

  if (error) {
    return (
      <section className="py-16">
        <div className="container px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error Loading Data</AlertTitle>
            <AlertDescription>
              Unable to load GitHub statistics. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" id="github">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {data?.user?.avatarUrl && (
            <img
              src={data.user.avatarUrl}
              alt={data.user.name || GITHUB_USERNAME}
              className="w-28 h-28 rounded-full mx-auto mb-4"
            />
          )}
          <h2 className="text-3xl font-bold">
            {data?.user?.name || GITHUB_USERNAME}
          </h2>
          {data?.user?.bio && (
            <p className="text-muted-foreground mt-2 text-lg">
              {data.user.bio}
            </p>
          )}
        </motion.div>

        {/* GitHub Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={animationVariants}>
              <Card className="p-4 h-full hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center">
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  ) : (
                    <>
                      <div className="text-primary mb-2">{stat.icon}</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </div>
                      <div className="text-2xl font-bold mt-1">
                        {stat.value?.toLocaleString() || "0"}
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Top Repositories */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animationVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                </Card>
              ))
            : data?.pinnedRepos?.map((repo: any) => (
                <motion.div key={repo.name} variants={animationVariants}>
                  <Card
                    className="p-6 hover:shadow-md transition-shadow cursor-pointer h-full"
                    onClick={() => window.open(repo.url, "_blank")}
                  >
                    <h3 className="font-semibold mb-2 line-clamp-1">
                      {repo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {repo.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        {repo.stars.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <GitFork className="w-4 h-4 mr-1" />
                        {repo.forks.toLocaleString()}
                      </span>
                      <span className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full ${
                            repo.language == "JavaScript"
                              ? "bg-yellow-500"
                              : "bg-primary"
                          } mr-1`}
                        ></span>
                        {repo.language}
                      </span>
                    </div>
                  </Card>
                </motion.div>
              ))}
        </motion.div>

        {/* Contribution Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-8 w-full flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-6">
              Contribution Activity
            </h3>
            <div className="w-full overflow-x-auto flex justify-center">
              <GitHubCalendar
                username={GITHUB_USERNAME}
                colorScheme="dark"
                fontSize={14}
                blockSize={16}
                blockMargin={5}
                theme={theme}
              />
            </div>
            {data?.meta?.lastUpdated && (
              <p className="text-sm text-muted-foreground mt-4">
                Last updated: {new Date(data.meta.lastUpdated).toLocaleString()}
              </p>
            )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default GitHubStats;
