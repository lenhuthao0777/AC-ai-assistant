import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Logo from './logo';

const Footer = () => {
  const footerList = [
    {
      title: 'Products',
      data: [
        {
          title: 'Wikis',
        },
        {
          title: 'Projects',
        },
        {
          title: 'Docs',
        },
        {
          title: 'What is new',
        },
      ],
    },
    {
      title: 'Learn',
      data: [
        {
          title: 'Customer stories',
        },
        {
          title: 'Help center',
        },
        {
          title: 'Webinars',
        },
        {
          title: 'Blog',
        },
        {
          title: 'Community',
        },
      ],
    },
    {
      title: 'Download',
      data: [
        {
          title: 'IOS & Android',
        },
        {
          title: 'Mac & Window',
        },
        {
          title: 'Web Clipper',
        },
      ],
    },
  ];

  return (
    <footer className="w-full before:content-[''] before:border-t before:border-gray-200 before:block before:mx-5">
      <nav className='container flex flex-col md:flex-row py-16 gap-6'>
        <div className='flex flex-col w-1/4'>
          <Logo />
          <ul className='flex items-center space-x-3 mt-4'>
            <li className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-200 hover:text-blue-600 transition cursor-pointer'>
              <Facebook className='w-5 h-5' />
            </li>
            <li className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-200 hover:text-pink-600 transition cursor-pointer'>
              <Instagram className='w-5 h-5' />
            </li>
            <li className='w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-200 hover:text-sky-500 transition cursor-pointer'>
              <Linkedin className='w-5 h-5' />
            </li>
          </ul>
        </div>

        <div className='flex-1 w-9/12'>
          <div className='columns-1 sm:columns-2 md:columns-2 lg:columns-3 w-full gap-6'>
            {footerList.map((items) => (
              <ul
                key={items.title}
                role='list'
                className='p-0 mb-9 text-base flex flex-col w-full text-left space-y-1'
              >
                <li role='none' className='font-semibold'>
                  {items.title}
                </li>
                {items.data.map((item) => (
                  <li key={item.title} className='text-sm'>
                    {item.title}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <h3 className='text-xs text-gray-500 mt-10'>
            © 2024 Code Review AI Assistant by Johnny.dev
          </h3>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
