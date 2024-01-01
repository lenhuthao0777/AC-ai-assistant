import Link from 'next/link';

const Logo = () => {
  return (
    <Link className='flex' href={'/'}>
      <div className='w-14 h-14 rounded-md bg-slate-900 relative'>
        <span className='text-white text-xl absolute bottom-1 right-1 font-extrabold'>
          AC
        </span>
      </div>
      <div className='ml-2 flex flex-col justify-end'>
        <span className='text-xs font-semibold'>AI</span>
        <span className='text-sm font-semibold'>Code Review</span>
      </div>
    </Link>
  );
};

export default Logo;
