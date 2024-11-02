// Utility functions for API calls
export const GITHUB_USERNAME = "w0wayush";
export const LEETCODE_USERNAME = "ayupandey82";

export const fetchGitHubStats = async () => {
  try {
    const response = await fetch("/api/github");
    return response.json();
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};

export const fetchLeetCodeStats = async () => {
  try {
    const response = await fetch("/api/leetcode");
    return response.json();
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
};
