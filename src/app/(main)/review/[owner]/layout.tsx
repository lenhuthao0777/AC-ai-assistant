import Header from '@/components/header';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='w-full h-full'>
      <Header />
      <div className='w-full h-full'>{children}</div>
    </main>
  );
}
