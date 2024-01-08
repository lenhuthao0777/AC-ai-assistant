'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import rehypeDomStringify from 'rehype-dom-stringify';
import rehypeFormat from 'rehype-format';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkToc from 'remark-toc';
import Markdown from 'react-markdown';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { File } from 'gitdiff-parser';
import { Send } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
const SyntaxHighlighter = dynamic(
  async () => (await import('react-syntax-highlighter')).default
);

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatService from '@/services/chat';

function CodeCopyBtn({ children }: React.PropsWithChildren) {
  const [copyOk, setCopyOk] = useState(false);

  const handleClick = () => {
    // @ts-ignore
    navigator.clipboard.writeText(children?.props?.children);

    setCopyOk(true);
    setTimeout(() => {
      setCopyOk(false);
    }, 500);
  };

  return (
    <button
      type='button'
      className='absolute right-3 top-3 z-10 rounded-md bg-slate-500 p-2 text-white hover:bg-slate-300'
      onClick={handleClick}
    >
      {copyOk ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-check'
        >
          <polyline points='20 6 9 17 4 12' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='lucide lucide-copy'
        >
          <rect width='14' height='14' x='8' y='8' rx='2' ry='2' />
          <path d='M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' />
        </svg>
      )}
    </button>
  );
}

function PreMarkdown({ children }: React.PropsWithChildren) {
  return (
    <pre className='relative'>
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  );
}

function CodeMarkdown({ children, className, node, ...rest }: any) {
  const match = /language-(\w+)/.exec(className || '');

  return match ? (
    <SyntaxHighlighter
      {...rest}
      style={oneDark}
      language={match[1]}
      PreTag='div'
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

const ReviewDialog = ({ diff }: { diff: File }) => {
  const [open, setOpen] = useState(false);

  const schema = z.object({
    message: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  });

  const chatService = new ChatService();

  const { mutate, data, error, isPending } = useMutation({
    mutationKey: ['message'],
    mutationFn: (messages: string[]) => chatService.chat(messages),
  });

  const onSubmit = async (value: z.infer<typeof schema>) => {
    // if (value.message) {
    //   await mutate([value.message]);
    //   form.setValue('message', '');
    // }
  };

  useEffect(() => {
    form.setValue('message', '');
  }, [open, form]);

  console.log(diff);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-green-700 hover:bg-green-700/90'>Review</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[60vw]'>
        <DialogHeader className='text-2xl font-semibold'>
          Review Form
        </DialogHeader>

        <div className='max-h-[70vh] overflow-y-auto border border-gray-200 rounded-md p-5 flex flex-col space-y-3'>
          <div className='flex items-start flex-col space-y-1'>
            <div className='flex flex-col'>
              <div className='flex items-center space-x-2'>
                <Avatar>
                  <AvatarImage sizes='sm' src='/chatgpt-icon.svg' />
                </Avatar>
                <span className='text-xs text-zinc-400'>GPT 3.5-turbo</span>
              </div>
              <p className='p-2 bg-zinc-200 rounded-md ml-12'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                necessitatibus ipsam eligendi placeat voluptate sequi porro
                sapiente vitae tenetur temporibus.
              </p>
            </div>
          </div>

          <div className='flex flex-col items-end space-y-1'>
            <div className='flex flex-col'>
              <div className='flex items-center space-x-2'>
                <Avatar>
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <span className='text-xs text-zinc-400'>You</span>
              </div>
              <p className='p-2 bg-sky-500 rounded-md text-white ml-12'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                necessitatibus ipsam eligendi placeat voluptate sequi porro
                sapiente vitae tenetur temporibus.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
              <div className='flex items-center space-x-2'>
                <FormField
                  name='message'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input
                          placeholder='Chat with Gpt 3.5-turbo'
                          className='peerw-full border-0 disabled:opacity-50 bg-zinc-200 text-gray-900 focus:ring-0 focus:ring-transparent text-sm sm:leading-6'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type='submit' disabled={isPending}>
                  <Send className='w-5 h-5' />
                </Button>
              </div>
            </form>
          </Form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
