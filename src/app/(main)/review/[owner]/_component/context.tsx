'use client';

import { ChevronDown, MousePointerSquareDashed } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import parse, { Change } from 'parse-diff';
import {} from 'react-diff-viewer';
const ReactDiffViewer = dynamic(
  async () => (await import('react-diff-viewer')).default
);

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

enum DiffMethod {
  CHARS = 'diffChars',
  WORDS = 'diffWords',
  WORDS_WITH_SPACE = 'diffWordsWithSpace',
  LINES = 'diffLines',
  TRIMMED_LINES = 'diffTrimmedLines',
  SENTENCES = 'diffSentences',
  CSS = 'diffCss',
}

export type FileInfoWithDiff = {
  changeLine: { content: string; changes: Change[] }[];
  index?: string[];
  oldFile?: string;
  newFile?: string;
  rawString: string;
};

export default function Context({ diff }: { diff?: any }) {
  const [open, setOpen] = useState(false);

  const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')
 
if(a > 10) {
  console.log('bar')
}
 
console.log('done')
`;
  const newCode = `
const a = 10
const boo = 10
 
if(a === 10) {
  console.log('bar')
}
`;

  // const abc = useMemo(() => {
  //   const parseDiff = parse(String(diff.data));

  //   return parseDiff;
  // }, []);

  return (
    <div className='w-full p-5 overflow-y-auto'>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <div className='py-2 px-3 border border-gray-300 rounded-t-md flex items-center transition'>
            <ChevronDown
              className={cn('w-4 h-4 mr-2', open ? '-rotate-90' : '')}
            />
            <span className='font-semibold text-xs select-none hover:text-blue-700 hover:underline cursor-pointer'>
              index.html
            </span>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className='border border-gray-300 border-t-0'>
            <ReactDiffViewer
              newValue={newCode}
              oldValue={oldCode}
              splitView
              compareMethod={DiffMethod.CSS}
              hideLineNumbers={false}
              // renderContent={highlightSyntax}
            />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* <div className='w-full flex flex-col items-center justify-center'>
        <MousePointerSquareDashed className='w-20 h-20 text-muted-foreground' />
        <h3 className='text-muted-foreground text-xl'>Empty data...</h3>
      </div> */}
    </div>
  );
}
