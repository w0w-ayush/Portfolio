import { Octokit } from "@octokit/rest";
import { NextResponse } from "next/server";
import { GITHUB_USERNAME } from "@/lib/api-utils";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// GraphQL query to fetch pinned repositories
const GET_PINNED_REPOS = `
  query($username: String!) {
    user(login: $username) {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            description
            url
            stargazerCount
            forkCount
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const [
      userResponse,
      contributionsResponse,
      pullRequestsResponse,
      forksResponse,
      starredResponse,
    ] = await Promise.all([
      // Basic user info
      octokit.rest.users.getByUsername({ username: GITHUB_USERNAME }),

      // Contributions (commits)
      octokit.rest.search.commits({
        q: `author:${GITHUB_USERNAME}`,
      }),

      // Merged Pull Requests
      octokit.rest.search.issuesAndPullRequests({
        q: `author:${GITHUB_USERNAME} is:pr is:merged`,
      }),

      // Forked Repositories
      octokit.rest.repos.listForUser({
        username: GITHUB_USERNAME,
        type: "all",
      }),

      // Starred Repositories
      octokit.rest.activity.listReposStarredByUser({
        username: GITHUB_USERNAME,
      }),
    ]);

    // Fetch pinned repositories using GraphQL
    const pinnedReposResponse = await octokit.graphql(GET_PINNED_REPOS, {
      username: GITHUB_USERNAME,
    });

    // Transform pinned repos data
    //@ts-ignore
    const pinnedRepos = pinnedReposResponse.user.pinnedItems.nodes.map(
      (repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        language: repo.primaryLanguage?.name,
        url: repo.url,
      })
    );

    return NextResponse.json({
      user: {
        name: userResponse.data.name,
        bio: userResponse.data.bio,
        followers: userResponse.data.followers,
        following: userResponse.data.following,
        publicRepos: userResponse.data.public_repos,
        avatarUrl: userResponse.data.avatar_url,
      },
      pinnedRepos: pinnedRepos,
      stats: {
        totalContributions: contributionsResponse.data.total_count,
        mergedPRs: pullRequestsResponse.data.total_count,
        forkedRepos: forksResponse.data.length,
        starredRepos: starredResponse.data.length,
      },
      meta: {
        lastUpdated: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
