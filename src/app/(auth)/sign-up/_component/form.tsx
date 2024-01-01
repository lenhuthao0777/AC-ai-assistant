'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';

import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AuthService from '@/services/auth';

const auth_service = new AuthService();

export default function SignUpForm() {
  const router = useRouter();

  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'example@gmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await auth_service.signUp(values);

      if (response?.data) {
        toast({
          title: 'Sign up',
          description: response?.data as string,
        });

        setTimeout(() => {
          router.push('/sign-in');
        }, 1000);
      }
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center mt-10'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-2 w-96 p-5 bg-background shadow rounded-md'
        >
          <div className='space-y-5'>
            <h2 className='text-xl font-semibold text-center'>Sign Up</h2>
            <p className='text-xs text-center'>
              Already have an account?{' '}
              <span
                className='font-semibold cursor-pointer underline'
                onClick={() => router.push('/sign-in')}
              >
                Sign in in here
              </span>
            </p>
          </div>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block text-gray-400 text-xs font-medium'>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    className='px-3 py-2'
                    type='email'
                    placeholder='enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='block text-gray-400 text-xs font-medium'>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className='px-3 py-2'
                    placeholder='enter your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button loading={isLoading} type='submit' className='w-full mt-10'>
              Sign Up
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
