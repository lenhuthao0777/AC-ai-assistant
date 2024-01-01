'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronsUpDown,
  FolderArchive,
  GitPullRequest,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface PropsType {
  item: any;
}

export default function PullRequest({ item }: PropsType) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleReview = (id: string) => {
    router.push(`/review/${id}`);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className='w-full'>
      <CollapsibleTrigger asChild className='py-3'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col'>
            <p className='flex items-center space-x-2'>
              <FolderArchive className='w-5 h-5' />
              <span className='text-sm flex transition hover:underline cursor-pointer'>
                {item}
              </span>
            </p>
            <span className='text-xs text-muted-foreground ml-7 mt-1'>12h</span>
          </div>

          <span className='p-2 hover:bg-gray-400 rounded-md'>
            <ChevronsUpDown className='w-5 h-5' />
          </span>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className='flex flex-col w-full bg-gray-100'>
          <li className='w-full px-3 py-2 border-t border-gray-400'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <GitPullRequest className='w-4 h-4' />
                <span className='text-sm text-slate-700'>pull request</span>
              </div>

              <Button className='text-xs bg-green-700' onClick={() => handleReview('string')}>
                Review change
              </Button>
            </div>
          </li>
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}
