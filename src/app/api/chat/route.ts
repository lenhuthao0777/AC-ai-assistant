import OpenAI from 'openai';

import { NextResponse } from 'next/server';
import {
  ChatGptMessage,
  OpenAIStreamPayload,
  StreamData,
} from '@/lib/openai-stream';

// export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    let arrayMessages: any = [];

    const payload: OpenAIStreamPayload = {
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: messages,
      temperature: 0.4,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 150,
      n: 1,
    };

    const stream = await StreamData(payload);

    // arrayMessages = messages.map((message: any) => ({
    //   role: message.role,
    //   content: message.content,
    // }));

    return new Response(stream);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
