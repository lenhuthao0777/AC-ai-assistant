import { OpenAI } from 'openai';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { ChatGptMessage } from '@/lib/openai-stream';

// const config = {};

// const openai = new OpenAI();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ message: 'Authentication' }, { status: 401 });
    }

    const outboundMessages: ChatGptMessage[] = messages.map(
      (item: ChatGptMessage) => ({
        role: 'user',
        content: messages.message,
      })
    );

    console.log(messages);

    return NextResponse.json('test');
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
