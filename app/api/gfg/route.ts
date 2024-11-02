import { NextResponse } from "next/server";
import { load } from "cheerio";

const GFG_USERNAME = process.env.GFG_USERNAME || "";

interface ProblemsSolved {
  total: number;
  school: number;
  basic: number;
  easy: number;
  medium: number;
  hard: number;
}

interface ProfileData {
  profile: {
    username: string;
    institution: string;
    languages: string[];
    streak: number;
    rank: string;
    starRating: number;
    currentPOTDStreak: {
      current: number;
      total: number;
    };
    profilePicture: string;
  };
  statistics: {
    codingScore: number;
    problemsSolved: ProblemsSolved;
    contestRating: number;
  };
  contests: {
    rating: number;
    globalRank: number;
    contestsAttended: number;
  };
  meta: {
    lastUpdated: string;
    scrapedUrl: string;
  };
}

async function scrapeGFGProfile(username: string): Promise<ProfileData> {
  try {
    const response = await fetch(
      `https://auth.geeksforgeeks.org/user/${username}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    // console.log("HTML - ", html);
    const $ = load(html);

    // Extract profile data
    const profilePicture = $(
      ".profilePicSection_head_profilePic__pic > img"
    ).attr("src");
    const name = $(".profile_name").text().trim();
    const institution = $(
      ".educationDetails_head_left--institute__MgUR0 + a .educationDetails_head_left--text__tgi9I"
    )
      .text()
      .trim();
    const starRating = $(".profilePicSection_head_stars__JrrGz").find(
      "i.material-icons"
    ).length;

    // Extract POTD streak
    const streakText = $(".circularProgressBar_head_mid_streakCnt__MFOF1")
      .text()
      .trim();
    const [currentStreak, totalStreak] = streakText
      .split("/")
      .map((num) => parseInt(num, 10));

    // Extract coding stats
    const codingScore = $("div:contains('Coding Score') + div").text().trim();
    const problemsSolved = $("div:contains('Problem Solved') + div")
      .text()
      .trim();
    const contestRating = $("div:contains('Contest Rating') + div")
      .text()
      .trim();

    const globalRank = $("div:contains('Global Rank') + div").text().trim();

    const contestAttended = $("div:contains('Contest Attended') + div")
      .text()
      .trim();

    const extractProblemCount = ($: any, difficulty: string): number => {
      try {
        const selector = `.problemNavbar_head_nav--text__UaGCx:contains("${difficulty}")`;
        const text = $(selector).text().trim();
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1], 10) : 0;
      } catch (error) {
        console.warn(`Could not extract ${difficulty} problem count`);
        return 0;
      }
    };

    const school = extractProblemCount($, "SCHOOL");
    const basic = extractProblemCount($, "BASIC");
    const easy = extractProblemCount($, "EASY");
    const medium = extractProblemCount($, "MEDIUM");
    const hard = extractProblemCount($, "HARD");

    return {
      profile: {
        username,
        institution,
        languages: ["C++", "Java"],
        // instituteName: "Sinhgad Institute of Technology and Science(SITS) Pune",
        streak: currentStreak,
        rank: "1",
        starRating,
        currentPOTDStreak: {
          current: currentStreak,
          total: totalStreak,
        },
        profilePicture: profilePicture || "", // Include profile picture URL
      },
      statistics: {
        codingScore: parseInt(codingScore.replace(/,/g, ""), 10) || 0,
        problemsSolved: {
          total: parseInt(problemsSolved.replace(/,/g, ""), 10) || 0,
          easy,
          medium,
          hard,
          basic,
          school,
        },
        contestRating: parseInt(contestRating.replace(/,/g, ""), 10) || 0,
      },
      contests: {
        rating: parseInt(contestRating),
        globalRank: parseInt(globalRank) || 4014,
        contestsAttended: parseInt(contestAttended) || 5,
      },
      meta: {
        lastUpdated: new Date().toISOString(),
        scrapedUrl: `https://auth.geeksforgeeks.org/user/${username}`,
      },
    };
  } catch (error) {
    console.error("Scraping error:", error);
    throw error;
  }
}

export async function GET() {
  if (!GFG_USERNAME) {
    return NextResponse.json(
      { error: "GeeksForGeeks username not configured" },
      { status: 400 }
    );
  }

  try {
    const data = await scrapeGFGProfile(GFG_USERNAME);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch GeeksForGeeks data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GeeksForGeeks data" },
      { status: 500 }
    );
  }
}
