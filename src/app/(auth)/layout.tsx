import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='w-full h-full'>
      <div className='w-full h-full'>{children}</div>
    </main>
  );
}
