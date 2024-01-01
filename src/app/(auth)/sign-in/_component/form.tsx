'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
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
import { setCookie } from '@/lib/utils';

const SignInForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'admin@gmail.com',
      password: '123456',
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setIsLoading(true);
    try {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: true,
      });
    } catch (error) {
      console.log(error);
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
            <h2 className='text-xl font-semibold text-center'>Sign In</h2>
            <p className='text-xs text-center'>
              Already have an account?{' '}
              <span
                className='font-semibold cursor-pointer underline'
                onClick={() => router.push('/sign-up')}
              >
                Sign up in here
              </span>
            </p>
          </div>
          <FormField
            control={form.control}
            disabled={isLoading}
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
            disabled={isLoading}
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
            <Button type='submit' className='w-full mt-10' loading={isLoading}>
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
