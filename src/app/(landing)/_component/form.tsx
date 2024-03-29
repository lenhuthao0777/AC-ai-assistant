'use client';

import Image from 'next/image';
import { Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { setCookie } from '@/lib/utils';
import { useEffect } from 'react';

const FormRepo = () => {
  const session = useSession();

  const router = useRouter();

  const schema = z.object({
    repository: z.string().superRefine((value, ctx) => {
      if (!value) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Repository is required.',
        });
        return;
      }

      if (
        !(
          value.startsWith('https://github.com') ||
          value.startsWith('github.com')
        )
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid GitHub repository.',
        });
        return;
      }

      const formattedLink = value
        .replace('https://github.com/', '')
        .replace('github.com/', '');

      if (formattedLink.split('/').length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please enter a valid GitHub repository.',
        });
      }
    }),
    githubToken: z.string().min(6),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      repository: '',
      githubToken: '',
    },
  });

  const handleFormatLinkRepo = (link: string): string => {
    link = link.replace('https://github.com/', '').replace(/\.git$/, '');
    return link;
  };

  const handleStartReview = async (values: z.infer<typeof schema>) => {
    const link = handleFormatLinkRepo(values.repository).split('/');
    setCookie('github_token', values.githubToken);
    router.push(`/repository/${link[0]}?repository=${link[1]}`);
  };

  return (
    <div className='relative flex w-full h-[60dvh] flex-col items-center justify-center'>
      <Image
        src={'/thumb.jpg'}
        fill
        priority
        quality={100}
        alt=''
        className='-z-10 object-cover'
      />

      <div className='flex flex-col items-center space-y-5'>
        <h2 className='text-2xl text-gray-50'>Make your code stop stinking!</h2>
        <h3 className='text-sm text-gray-200'>
          Automate code review for github repository 🍏!
        </h3>
        <Github className='w-10 h-10 text-white' />

        <Dialog
          onOpenChange={() => {
            form.setValue('repository', '');
            form.setValue('githubToken', '');
          }}
        >
          <DialogTrigger asChild>
            <Button>Start now 🚀</Button>
          </DialogTrigger>
          <DialogContent className='min-w-[600px]'>
            <DialogHeader>
              <DialogTitle>Repository Form</DialogTitle>
            </DialogHeader>
            {session?.data?.user ? (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleStartReview)}
                  className='w-full space-y-5'
                >
                  <FormField
                    name='repository'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Repository:</FormLabel>
                          <FormControl>
                            <Input
                              placeholder='https://github.com/{{username}}/{{project}}.git'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    name='githubToken'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Github Token:</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              placeholder='Enter your github token!'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <div className='flex justify-end'>
                    <Button type='submit'>Start review 🚀</Button>
                  </div>
                </form>
              </Form>
            ) : (
              <DialogDescription>
                You are not logged!,{' '}
                <Link href='/sign-in' className='text-sky-500 underline'>
                  Login in here!
                </Link>
              </DialogDescription>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FormRepo;
