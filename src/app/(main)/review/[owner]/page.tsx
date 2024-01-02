import { redirect } from 'next/navigation';

import GithubService from '@/services/github';
import Context from './_component/context';
import Sidebar from './_component/sidebar';

export default async function Page({
  params: { owner },
  searchParams: { repository, pull_number },
}: {
  params: { owner: string };
  searchParams: { repository: string; pull_number: string };
}) {
  const [repo, diff, files] = await Promise.all([
    GithubService.getRepo(owner, repository),
    GithubService.getDiff(owner, repository, +pull_number),
    GithubService.getFiles(owner, repository, +pull_number),
  ]);

  if (repo.status !== 200) {
    redirect('/');
  }

  return (
    <div className='flex'>
      <Sidebar files={files.data} />
      <Context />
    </div>
  );
}
