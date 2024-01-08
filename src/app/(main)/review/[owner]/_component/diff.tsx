'use client';

import { FC, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { File } from 'gitdiff-parser';
import { Diff, Hunk } from 'react-diff-view';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import ReviewDialog from './reviewDialog';

import 'react-diff-view/style/index.css';

interface DiffProps {
  diff: File;
}

const DiffComponent: FC<DiffProps> = ({ diff }) => {
  const [open, setOpen] = useState(false);

  const renderFile = ({ oldRevision, newRevision, type, hunks }: any) => {
    return (
      <Diff
        key={oldRevision + '-' + newRevision}
        viewType='split'
        diffType={type}
        hunks={hunks}
        optimizeSelection={true}
      >
        {(hunks) =>
          hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
        }
      </Diff>
    );
  };

  return (
    <Collapsible
      open={open}
      className='bg-white border border-gray-400 rounded-md select-none'
    >
      <CollapsibleTrigger
        asChild
        className={cn(open ? 'border-b border-gray-400' : '')}
      >
        <div className='py-2 px-3 flex items-center justify-between transition'>
          <div className='flex items-center'>
            <ChevronDown
              className={cn(
                'w-4 h-4 mr-2 cursor-pointer rounded-md hover:bg-gray-300',
                open ? '-rotate-90' : ''
              )}
              onClick={() => setOpen(!open)}
            />
            <p className='font-semibold text-xs select-none hover:text-blue-700 hover:underline cursor-pointer'>
              {diff?.newPath}
            </p>
          </div>
          <ReviewDialog diff={diff} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className='p-2'>{renderFile(diff)}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default DiffComponent;
