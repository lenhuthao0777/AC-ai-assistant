'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { setLocal } from '@/lib/utils';
import GithubService from '@/services/github';

const FormRepo = () => {
  const [isLoading, setIsLoading] = useState(false);

  const session = useSession();

  const router = useRouter();

  const { toast } = useToast();

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
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      repository: '',
    },
  });

  const handleFormatLinkRepo = (link: string): string => {
    link = link.replace('https://github.com/', '').replace(/\.git$/, '');
    return link;
  };

  const handleStartReview = async (value: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      if (!session.data?.user) {
        setLocal('repository', value.repository);
        router.push('/sign-in');
      }
      const link = handleFormatLinkRepo(value.repository).split('/');
      const repo = await GithubService.getRepo(link[0], link[1]);
      if (repo) {
        router.push(`/repository/${link[0]}?repository=${link[1]}`);
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleStartReview)}>
            <div className='flex h-8'>
              <FormField
                name='repository'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          className='w-96 mr-2 bg-white'
                          placeholder='https://github.com/{{username}}/{{project}}.git'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button loading={isLoading} type='submit'>
                Start review 🚀
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormRepo;
