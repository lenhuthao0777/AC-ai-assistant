'use client';

import { FC, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
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

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import axios from 'axios';

interface DiffProps {
  diff?: any;
  filename: string;
  blobUrl: string;
  fileUrl: string;
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

const Diff: FC = () => {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(
    `
    function CodeMarkdown({
      children, className, node, ...rest
    }: any) {
      const match = /language-(\w+)/.exec(className || '');
    
      return match ? (
        <SyntaxHighlighter
          {...rest}
          style={oneDark}
          language={match[1]}
          PreTag="div"
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    }
    `
  );

  return (
    <>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <div className='py-2 px-3 border border-gray-300 rounded-t-md flex items-center transition'>
            <ChevronDown
              className={cn('w-4 h-4 mr-2', open ? '-rotate-90' : '')}
            />
            <p className='font-semibold text-xs select-none hover:text-blue-700 hover:underline cursor-pointer'>
              {/* {filename} */}test
            </p>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className='border border-gray-300 border-t-0'>test</div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
};

export default Diff;
