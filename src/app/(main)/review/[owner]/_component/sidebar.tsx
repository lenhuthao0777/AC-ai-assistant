'use client';
import { ChevronsLeft, FileCode2 } from 'lucide-react';
import parse, { Change } from 'parse-diff';
import { useMemo } from 'react';

import Logo from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';

export default function Sidebar({ diff }: { diff: any }) {
  const files = useMemo(() => {
    let result: Array<any> = [];
    result = parse(String(diff.data));

    const files = result.reduce((arr: Array<any> = [], item: any) => {
      if (item.from.includes('lock.json')) return;
      arr.push({
        newFile: item.to,
      });
      return arr;
    }, []);

    return files;
  }, []);

  return (
    <aside className='group/sidebar w-60 h-screen bg-gray-200 shadow-md'>
      <div className='px-3 py-2 flex items-center justify-between border-b border-gray-300'>
        <Logo />
        <div className='text-muted-foreground rounded-sm hover:bg-neutral-400 dark:hover:bg-neutral-600 cursor-pointer opacity-0 transition group-hover/sidebar:opacity-100 '>
          <ChevronsLeft className='w-5 h-5' />
        </div>
      </div>
      <nav className='px-3 py-2 overflow-y-auto'>
        <ul className='flex flex-col'>
          {files?.map((file) => (
            <li
              key={file.newFile}
              className='py-2 flex items-centers space-x-2'
            >
              <Checkbox
                onCheckedChange={(value) => {
                  console.log(value);
                }}
              />
              <p className='flex items-center space-x-2'>
                <FileCode2 className='w-5 h-5' />
                <span className='text-xs max-w-32 text-gray-500 cursor-pointer hover:underline line-clamp-1'>
                  {file.newFile}
                </span>
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
