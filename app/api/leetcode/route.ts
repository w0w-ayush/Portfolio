import { NextResponse } from "next/server";
import { LEETCODE_USERNAME } from "@/lib/api-utils";

const LEETCODE_API = "https://leetcode.com/graphql";

const query = `
  query userProfile($username: String!) {
    matchedUser(username: $username) {
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        reputation
        starRating
        aboutMe
      }
      badges {
        id
        name
        icon
        displayName
        creationDate
      }
      submissionCalendar
      problemsSolvedBeatsStats {
        difficulty
        percentage
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      totalParticipants
      topPercentage
    }
  }
`;

export async function GET() {
  try {
    const response = await fetch(LEETCODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const { matchedUser, userContestRanking } = data.data;

    // Transform the data into a more usable format
    const problemsSolved = matchedUser.submitStats.acSubmissionNum.reduce(
      (acc: any, curr: any) => {
        acc[curr.difficulty.toLowerCase()] = curr.count;
        return acc;
      },
      {}
    );

    const targetBadges = [
      "200 Days Badge 2024",
      "Annual Badge 2024",
      "100 Days Badge 2024",
      // "50 Days Badge 2024",
    ];

    const topBadges = matchedUser.badges
      .filter((badge: any) => targetBadges.includes(badge.displayName))
      .sort(
        (a: any, b: any) =>
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
      )
      .map((badge: any) => ({
        name: badge.displayName,
        icon: badge.icon,
      }));

    // Parse submission calendar
    const submissionCalendar = JSON.parse(
      matchedUser.submissionCalendar || "{}"
    );

    return NextResponse.json({
      stats: {
        totalSolved: problemsSolved.all || 0,
        easySolved: problemsSolved.easy || 0,
        mediumSolved: problemsSolved.medium || 0,
        hardSolved: problemsSolved.hard || 0,
      },
      ranking: matchedUser.profile.ranking,
      rating: userContestRanking?.rating || 0,
      contestsAttended: userContestRanking?.attendedContestsCount || 0,
      globalRanking: userContestRanking?.globalRanking || 0,
      reputation: matchedUser.profile.reputation,
      starRating: matchedUser.profile.starRating,
      aboutMe: matchedUser.profile.aboutMe,
      topBadges,
      submissionCalendar,
    });
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
