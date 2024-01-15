'use client';

import { Change } from 'parse-diff';
import Diff from './diff';
import { File } from 'gitdiff-parser';
import { useMemo } from 'react';
import { parseDiff } from 'react-diff-view';

export type FileInfoWithDiff = {
  changeLine: { content: string; changes: Change[] }[];
  index?: string[];
  oldFile?: string;
  newFile?: string;
  rawString: string;
};

export default function Content({ diff }: { diff: any }) {
  const fileList = useMemo(() => {
    let result;

    const rawStrings = String(diff)
      .split('diff ')
      .filter((item) => item !== '');

    const arrDiff = parseDiff(String(diff));

    result = arrDiff
      .map((diff, index) => ({
        ...diff,
        rawString: rawStrings[index],
      }))
      .reduce((arr: Array<File>, item: File) => {
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
    <div className='w-full flex flex-col space-y-3 mt-10'>
      {fileList.map((item: File) => (
        <Diff key={item.newPath} diff={item} />
      ))}
    </div>
  );
}
