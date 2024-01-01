import { Octokit } from 'octokit';

const octokit = new Octokit({
  // auth: process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN,
});

export default octokit;
