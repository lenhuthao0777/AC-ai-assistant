import GithubService from '@/services/github';
import Repo from './_component/repo';

export const Page = async ({
  params: { owner },
  searchParams: { repository },
}: {
  params: { owner: string };
  searchParams: {
    repository: string;
  };
}) => {
  const pulls = await GithubService.getRepoPulls(owner, repository);

  if (pulls.status !== 200) {
    return null;
  }

  return <Repo pulls={pulls?.data} />;
};

export default Page;
