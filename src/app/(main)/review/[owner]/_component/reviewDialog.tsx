'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { File } from 'gitdiff-parser';
import { Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { nanoid } from 'nanoid';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import UserMessage from './user-message';
import MarkDown from '@/components/mardown';
import OpenAiMessage from './openai-message';
import { Messages } from '@/redux/feature/review.feature';
import { ChatGptMessage, RoleService } from '@/lib/openai-stream';
import { getReviewPrompt } from '@/lib/prompt';

const ReviewDialog = ({ diff }: { diff: File }) => {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Messages[]>([
    {
      id: nanoid(),
      role: RoleService.USER,
      content: 'Hello, how are you today?',
    },
  ]);

  const schema = z.object({
    message: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['chat'],
    mutationFn: async (messages: ChatGptMessage[]) => {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({ messages: messages }),
      });
      return resp?.body;
    },
    async onSuccess(stream) {
      if (!stream) throw new Error('No stream found!');

      const reader = stream.getReader();
      const decoder = new TextDecoder();

      let done = false;

      const id = nanoid();
      const respMessage: Messages = {
        id,
        role: RoleService.SYSTEM,
        content: '',
      };

      setMessages((prev) => [...prev, respMessage]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        setMessages((prev) =>
          prev.map((message) => {
            if (message.id === id) {
              return { ...message, content: message.content + chunk };
            }
            return message;
          })
        );
      }
    },
  });

  const handleSubmit = async (values: z.infer<typeof schema>) => {
    await mutate([
      {
        role: 'user',
        content: values.message,
      },
    ]);

    setMessages((prev) => [
      ...prev,
      { id: nanoid(), role: RoleService.USER, content: values.message },
    ]);

    form.setValue('message', '');
  };

  useEffect(() => {
    form.setValue('message', '');
  }, [open, form]);

  const handleReview = () => {
    let content = '';
    for (const hunk of diff.hunks) {
      for (const change of hunk.changes) {
        content += change.content;
      }
    }

    const prompt = getReviewPrompt(content);
    handleSubmit({
      message: `Review this code 
                \`\`\`
                ${content}
                \`\`\``,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleReview}
          className='bg-green-700 hover:bg-green-700/90'
        >
          Review
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-[60vw]'>
        <DialogHeader className='text-2xl font-semibold'>
          Review Form
        </DialogHeader>

        <div className='max-h-[70vh] overflow-y-auto border border-gray-200 rounded-md p-5 flex flex-col space-y-3'>
          {messages.length ? (
            <>
              {messages.map((message: any) => (
                <div key={message.id} className='whitespace-pre-wrap'>
                  {message.role === RoleService.USER ? (
                    <UserMessage>
                      <MarkDown content={message.content} />
                    </UserMessage>
                  ) : (
                    <OpenAiMessage>
                      <MarkDown content={message.content} />
                    </OpenAiMessage>
                  )}
                </div>
              ))}
            </>
          ) : null}
        </div>
        <DialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className='w-full'>
              <div className='flex items-center space-x-2'>
                <FormField
                  name='message'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormControl>
                        <Input
                          placeholder='Chat with Gpt 3.5-turbo'
                          className='peer w-full border-0 disabled:opacity-50 bg-zinc-200 text-gray-900 focus:ring-0 focus:ring-transparent text-sm sm:leading-6'
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type='submit'>
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
