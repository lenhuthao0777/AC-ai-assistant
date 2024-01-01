'use client';
import { FC, useLayoutEffect, useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import { cn } from '../lib/utils';
import { Button } from './ui/button';

interface PaginationProps {
  currPage: number;
  totalPage: number | null;
  onChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currPage, totalPage, onChange }) => {
  const [page, setPage] = useState<number>(() => currPage);

  const pages = [...(Array(totalPage).keys() as any)].map((x) => x + 1);

  const onChangePage = (number: number) => {
    if (number !== page) {
      setPage(number);
      onChange(number);
    }
  };

  const nextPage = () => {
    setPage((curr) => {
      onChange(curr + 1);
      return curr + 1;
    });
  };
  const prePage = () => {
    setPage((curr) => {
      onChange(curr - 1);
      return curr - 1;
    });
  };

  useLayoutEffect(() => {
    setPage(currPage);
  }, [currPage]);

  if (!totalPage) return null;

  return (
    <div className='flex justify-end w-full mt-5'>
      <ul className='flex items-center space-x-2'>
        <li>
          <Button
            variant='outline'
            onClick={prePage}
            disabled={page === 1}
            className={cn(
              'leading-6 border border-transparent flex items-center justify-center',
              page === 1 && 'disabled:cursor-no-drop disabled:text-gray-400'
            )}
          >
            <ChevronLeft className='w-5 h-5' />
            <span>Previous</span>
          </Button>
        </li>

        {pages.map((item: number) => (
          <li key={item}>
            <Button
              size='icon'
              variant='outline'
              className={cn(
                'p-3 text-sm leading-6 border border-transparent flex items-center justify-center',
                (page === item || currPage === item) && 'border-gray-500'
              )}
              onClick={() => onChangePage(item)}
            >
              {item}
            </Button>
          </li>
        ))}

        <li>
          <Button
            variant='outline'
            onClick={nextPage}
            disabled={page === totalPage}
            className={cn(
              'leading-6 border border-transparent flex items-center justify-center',
              page === totalPage &&
                'disabled:cursor-no-drop disabled:text-gray-400 dark:disabled:text-gray-400'
            )}
          >
            <span>Next</span>
            <ChevronRight className='w-5 h-5' />
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
