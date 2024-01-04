'use client';

import { ChevronsLeft } from 'lucide-react';
import { useMemo } from 'react';
import gitDiffParser from 'gitdiff-parser';
import { useDispatch } from 'react-redux';
import { parseDiff as parseDi, Diff, Hunk } from 'react-diff-view';
import parseDiff, { File } from 'parse-diff';

import Logo from '@/components/logo';
import { Checkbox } from '@/components/ui/checkbox';
import { Files, setFile } from '@/redux/feature/review.feature';
import { Label } from '@/components/ui/label';
import { useAppSelector } from '@/redux/hook';

export default function Sidebar({ files, diff }: { files?: any; diff: any }) {
  const dispatch = useDispatch();

  const state = useAppSelector((state) => state.review);

  const fileList = useMemo(() => {
    let result;

    // const arrDiff = parseDiff(String(diff));

    // const rawString = String(diff)
    //   .split('diff ')
    //   .filter((item) => item !== '');

    // result = arrDiff.reduce(
    //   (arr: Array<File | any>, item: File, index: number) => {
    //     if (/\.(ts|tsx|js|jsx|html|css|scss)$/.test(item.to as string)) {
    //       arr.push({
    //         ...item,
    //       });
    //     }
    //     return arr;
    //   },
    //   []
    // );

    result = gitDiffParser.parse(diff);

    return result;
  }, [diff]);

  console.log(fileList);

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
          {/* {fileList?.map((file: File, index) => (
            <li
              key={index}
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
                {file.to}
              </Label>
            </li>
          ))} */}
        </ul>
      </nav>
    </aside>
  );
}
