import { Octokit } from 'octokit';
import { getCookie } from './utils';

const token = '';

const github_token = getCookie('github_token');

// TODO

const octokit = new Octokit({
  auth: github_token || token,
});

export default octokit;
