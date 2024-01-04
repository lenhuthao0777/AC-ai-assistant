'use client';

import dynamic from 'next/dynamic';
import parse, { Change } from 'parse-diff';
import Diff from './diff';
import { useAppSelector } from '@/redux/hook';

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

export default function Content() {
  const state = useAppSelector((state) => state.review);

  console.log(state);

  return (
    <div className='w-full p-5 overflow-y-auto'>
      <div className='w-full flex flex-col space-y-3'>
        <Diff />
      </div>
    </div>
  );
}
