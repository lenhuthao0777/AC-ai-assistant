import { redirect } from 'next/navigation';

import GithubService from '@/services/github';
import Content from './_component/content';

export default async function Page({
  params: { owner },
  searchParams: { repository, pull_number },
}: {
  params: { owner: string };
  searchParams: { repository: string; pull_number: string };
}) {
  const [diff] = await Promise.all([
    GithubService.getDiff(owner, repository, +pull_number),
  ]);

  if (!diff?.data) {
    redirect('/');
  }

  return (
    <div className='container'>
      <Content diff={diff.data} />
    </div>
  );
}
