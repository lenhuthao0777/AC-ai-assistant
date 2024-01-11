import { Octokit } from 'octokit';
import { getCookie } from './utils';

const token = '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';

const github_token = getCookie('github_token');

// TODO

const octokit = new Octokit({
  auth: github_token || token,
});

export default octokit;
