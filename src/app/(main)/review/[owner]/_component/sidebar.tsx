'use client';

import { ChevronsLeft } from 'lucide-react';
import { useMemo } from 'react';
import { File } from 'gitdiff-parser';
import { useDispatch } from 'react-redux';
import { parseDiff, Diff, Hunk } from 'react-diff-view';

import Logo from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { setFile } from '@/redux/feature/review.feature';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/redux/hook';

export default function Sidebar({ diff }: { diff: any }) {
  const dispatch = useDispatch();

  const fileList = useMemo(() => {
    let result;

    const arrDiff = parseDiff(String(diff));

    result = arrDiff.reduce((arr: Array<File>, item: File, index: number) => {
      if (/\.(ts|tsx|js|jsx|html|css|scss)$/.test(item.newPath as string)) {
        arr.push({
          ...item,
        });
      }
      return arr;
    }, []);

    return result;
  }, [diff]);

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
          {fileList?.map((file: File) => (
            <li
              key={file.newPath}
              className='py-2 flex items-centers space-x-2 border-b-2 border-gray-50 last:border-transparent'
            >
              <Checkbox
                onCheckedChange={(event) => {
                  dispatch(
                    setFile({
                      type: 'any',
                      file: file,
                      status: event,
                    })
                  );
                }}
              />
              <Label className='text-xs text-nowrap text-gray-500 cursor-pointer hover:underline line-clamp-1'>
                {file.newPath}
              </Label>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
