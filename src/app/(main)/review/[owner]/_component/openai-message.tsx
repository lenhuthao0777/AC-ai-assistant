'use client';

import { ReactNode } from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const OpenAiMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex items-start flex-col space-y-1'>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-2'>
          <Avatar>
            <AvatarImage sizes='sm' src='/chatgpt-icon.svg' />
          </Avatar>
          <span className='text-xs text-zinc-400'>GPT 3.5-turbo</span>
        </div>
        <div className='ml-10 p-2'>{children}</div>
      </div>
    </div>
  );
};

export default OpenAiMessage;
