import { ReactNode } from 'react';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className='w-full h-full'>
      <Header />
      <div className='w-full h-full'>{children}</div>
      <Footer />
    </main>
  );
}
