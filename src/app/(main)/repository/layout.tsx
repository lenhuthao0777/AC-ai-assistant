import Header from '@/components/header';
import { useServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await useServerSession();

  if (!session) {
    redirect('/sign-in');
  }

  return (
    <main className='w-full h-full'>
      <Header />
      <div className='w-full h-full'>{children}</div>
    </main>
  );
}
