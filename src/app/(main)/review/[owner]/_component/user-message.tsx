'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ReactNode } from 'react';

const UserMessage = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex flex-col items-start space-y-1'>
      <div className='flex flex-col'>
        <div className='flex items-center space-x-2'>
          <Avatar>
            <AvatarFallback>Y</AvatarFallback>
          </Avatar>
          <span className='text-xs text-zinc-400'>You</span>
        </div>
        <div className='p-2 ml-10'>{children}</div>
      </div>
    </div>
  );
};

export default UserMessage;
