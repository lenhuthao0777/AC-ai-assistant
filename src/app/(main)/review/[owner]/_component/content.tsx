'use client';

import dynamic from 'next/dynamic';
import parse, { Change } from 'parse-diff';
import Diff from './diff';
import { useAppSelector } from '@/redux/hook';
import { File } from 'gitdiff-parser';
import { useMemo } from 'react';
import { parseDiff } from 'react-diff-view';

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

export default function Content({ diff }: { diff: any }) {
  const state = useAppSelector((state) => state.review);

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
    <div className='w-full flex flex-col space-y-3 mt-10'>
      {fileList.map((item: File) => (
        <Diff key={item.newPath} diff={item} />
      ))}
    </div>
  );
}
