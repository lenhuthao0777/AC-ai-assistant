import octokit from '@/lib/octokit';

// 'https://api.github.com/repos/lenhuthao0777/education-pj/git/trees{/sha}'

class GithubService {
  static url = process.env.NEXT_PUBLIC_GITHUB_API;
  static test = '';
  static headers: any = {
    'X-GitHub-Api-Version': '2022-11-28',
  };

  static getRepo(owner: string, repo: string) {
    return octokit.request('GET /repos/{owner}/{repo}', {
      repo: repo,
      owner: owner,
      headers: this.headers,
    });
  }

  static getRepoPulls(owner: string, repo: string) {
    return octokit.request('GET /repos/{owner}/{repo}/pulls', {
      repo: repo,
      owner: owner,
      headers: this.headers,
    });
  }

  static getDiff(owner: string, repo: string, pullNumber: number) {
    return octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', {
      owner,
      repo,
      pull_number: pullNumber,
      mediaType: { format: 'diff' },
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        accept: 'application/vnd.github.v3.diff',
      },
    });
  }

  static getFiles(owner: string, repo: string, pullNumber: number) {
    return octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pull_number}/files',
      {
        owner,
        repo,
        pull_number: pullNumber,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
          // accept: 'application/vnd.github.v3.diff',
        },
      }
    );
  }

  // https://api.github.com/repos/$USER/$REPO/contents/$FILE_PATH?ref=pull/$PR_NUMBER

  static getFile(
    owner: string,
    repo: string,
    filePath: string
  ) {
    return octokit.request(
      `GET /repos/{owner}/{repo}/contents/{path}`,
      {
        owner,
        repo,
        path: filePath,
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      }
    );
  }
}

export default GithubService;
