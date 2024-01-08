import { Octokit } from 'octokit';
import { getCookie } from './utils';

const token = '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';

const github_token = getCookie('github_token');

// TODO

const octokit = new Octokit({
  auth: github_token || token,
});

export default octokit;
