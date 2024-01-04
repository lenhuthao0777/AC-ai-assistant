import { redirect } from 'next/navigation';

import GithubService from '@/services/github';
import Content from './_component/content';
import Sidebar from './_component/sidebar';

export default async function Page({
  params: { owner },
  searchParams: { repository, pull_number },
}: {
  params: { owner: string };
  searchParams: { repository: string; pull_number: string };
}) {
  const [diff, files] = await Promise.all([
    GithubService.getDiff(owner, repository, +pull_number),
    GithubService.getFiles(owner, repository, +pull_number),
  ]);

  if (!diff?.data) {
    redirect('/');
  }

  return (
    <div className='flex'>
      <Sidebar files={files.data} diff={diff.data} />
      <Content />
    </div>
  );
}
