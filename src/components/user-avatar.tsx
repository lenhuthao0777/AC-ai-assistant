'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function UserAvatar({ user }: { user: any }) {
  return (
    <>
      {user?.email ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='shadow-sm'>
              <AvatarFallback className='cursor-pointer'>A</AvatarFallback>
              {/* <AvatarImage src='/cat.jpeg' className='cursor-pointer'/> */}
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  redirect: true,
                })
              }
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          className={cn(
            buttonVariants({
              variant: 'default',
            })
          )}
          href='/sign-in'
        >
          Sign In
        </Link>
      )}
    </>
  );
}
