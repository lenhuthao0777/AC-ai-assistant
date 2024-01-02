'use client';

import { ChevronsLeft } from 'lucide-react';
import { useMemo } from 'react';

import Logo from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Files } from '@/providers/review.provider';

export default function Sidebar({ files }: { files?: any }) {
  const fileList = useMemo(() => {
    let result: Array<any> = [];
    const f = files.filter((item: Files) => {
      if (!item.filename.includes('.tsx')) return;
      return item;
    });

    return f;
  }, [files]);

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
          {fileList?.map((file: Files) => (
            <li
              key={file.sha}
              className='py-2 flex items-centers space-x-2 border-b-2 border-gray-50 last:border-transparent'
            >
              <Checkbox
                onCheckedChange={(event) => {
                  console.log(event);
                }}
              />
              <Label className='text-xs text-nowrap text-gray-500 cursor-pointer hover:underline line-clamp-1'>
                {file.filename}
              </Label>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
