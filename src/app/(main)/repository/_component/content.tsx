'use client';

import Pagination from '@/components/pagination';
import PullRequest from './pullrequest';

export default function Content() {
  const list = [
    'johnny/project-education1',
    'johnny/project-education2',
    'johnny/project-education3',
    'johnny/project-education4',
    'johnny/project-education5',
    'johnny/project-education6',
  ];

  const onChangePage = () => {
    console.log('test');
  };

  return (
    <div className='w-full h-full p-5 overflow-y-auto'>
      <div className='flex items-center w-full rounded-md shadow-sm space-x-2 border bg-background'>
        <ul className='flex flex-col w-full'>
          {list.map((item) => (
            <li
              key={item}
              className='px-3 py-2 border-b border-gray-300 last:border-0'
            >
              <PullRequest item={item} />
            </li>
          ))}
        </ul>
      </div>

      <Pagination currPage={1} totalPage={2} onChange={onChangePage} />
    </div>
  );
}
