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

  return (
    <>{pulls.data ? <Repo pulls={pulls?.data} /> : <div>Empty repo!</div>}</>
  );
};

export default Page;
