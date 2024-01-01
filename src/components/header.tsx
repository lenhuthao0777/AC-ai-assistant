import { useServerSession } from '@/lib/next-auth';
import UserAvatar from './user-avatar';
import Logo from './logo';
export default async function Header() {
  const session = await useServerSession();
  return (
    <header className='w-full bg-background shadow-sm'>
      <nav className='container h-20 flex items-center justify-between'>
        <Logo />
        <UserAvatar user={session?.user} />
      </nav>
    </header>
  );
}
