'use client';

import { FC, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { File } from 'gitdiff-parser';
import { Diff, Hunk } from 'react-diff-view';

const SyntaxHighlighter = dynamic(
  async () => (await import('react-syntax-highlighter')).default
);

import rehypeDomStringify from 'rehype-dom-stringify';
import rehypeFormat from 'rehype-format';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import Markdown from 'react-markdown';
import 'react-diff-view/style/index.css';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DiffProps {
  diff?: File;
}

function CodeCopyBtn({ children }: React.PropsWithChildren) {
  const [copyOk, setCopyOk] = useState(false);

  const handleClick = () => {
    // @ts-ignore
    navigator.clipboard.writeText(children?.props?.children);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <button
      type='button'
      className='absolute right-3 top-3 z-10 rounded-md bg-slate-500 p-2 text-white hover:bg-slate-300'
      onClick={handleClick}
    >
      {copyOk ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-check'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-copy'
        >
          <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
          <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
        </svg>
      )}
    </button>
  );
}

function PreMarkdown({ children }: React.PropsWithChildren) {
  return (
    <pre className='relative'>
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  );
}

function CodeMarkdown({ children, className, node, ...rest }: any) {
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    <SyntaxHighlighter
      {...rest}
      style={oneDark}
      language={match[1]}
      PreTag='div'
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
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
    <>
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
            <Button className='bg-green-700 hover:bg-green-700/90'>
              Review
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className='p-2'>{renderFile(diff)}</div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default DiffComponent;
