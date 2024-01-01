'use client';
import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronsUpDown, GitBranch, GitPullRequest } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function Repo({ pulls }: { pulls: any }) {
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  const pathName = usePathname();

  const searchParams = useSearchParams();

  const handleReview = (owner: string, repo: string, pullNumber: number) => {
    router.push(
      `/review/${owner}?repository=${repo}&pull_number=${pullNumber}`
    );
  };

  const tranformRepoName = useMemo(() => {
    let path, name;
    path = pathName.replace('/repository/', '');
    name = `${path}/${searchParams.get('repository')}`;
    return name;
  }, [pathName, searchParams]);

  console.log(pulls);
  

  return (
    <div className='container mt-5'>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className='w-full bg-white p-5 rounded-t-md'
      >
        <CollapsibleTrigger asChild className='py-3'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
              <p className='flex items-center space-x-2'>
                <GitBranch className='w-5 h-5' />
                <span className='text-sm font-semibold transition hover:underline cursor-pointer'>
                  {tranformRepoName}
                </span>
              </p>
              <span className='text-xs text-muted-foreground ml-7 mt-1'>
                12h
              </span>
            </div>

            <span className='p-2 hover:bg-gray-400 rounded-md'>
              <ChevronsUpDown className='w-5 h-5' />
            </span>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className='flex flex-col w-full bg-gray-100'>
            {pulls.map((pull: any) => (
              <li
                key={pull?.node_id}
                className='w-full px-3 py-2 border-t border-gray-400'
              >
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-2'>
                    <GitPullRequest className='w-4 h-4' />
                    <span className='text-sm text-slate-700'>
                      {pull?.title}
                    </span>
                  </div>

                  <Button
                    className='text-xs bg-green-700'
                    onClick={() =>
                      handleReview(
                        pull?.user?.login,
                        pull?.base?.repo?.name,
                        pull?.number
                      )
                    }
                  >
                    Review change
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
