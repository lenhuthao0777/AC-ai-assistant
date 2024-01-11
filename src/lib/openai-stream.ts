import { OpenAI } from 'openai';
import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';

export type ChatGptAgent = 'user' | 'system';

export const RoleService = {
  USER: 'user',
  SYSTEM: 'system',
};

export interface ChatGptMessage {
  role: ChatGptAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  stream: true;
  messages: ChatGptMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  n: number;
}

const config = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
};

export const StreamData = async (payload: OpenAIStreamPayload) => {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  if (!config.apiKey) {
    throw Error('Missing api key!');
  }

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  // const stream = new ReadableStream({
  //   async start(controller) {
  //     function onParse(event: ParsedEvent | ReconnectInterval) {
  //       if (event.type === 'event') {
  //         const data = event.data;
  //         console.log('data:::', data);

  //         if (data === '[DONE]') {
  //           controller.close();
  //           return;
  //         }

  //         try {
  //           const json = JSON.parse(data);
  //           const text = json.choices[0].delta?.content || '';

  //           if (count < 2 && (text.match(/\n/) || []).length) {
  //             return;
  //           }
  //           const queue = encoder.encode(text);
  //           controller.enqueue(queue);
  //           count++;
  //         } catch (error) {
  //           controller.error(error);
  //         }
  //       }
  //     }
  //     const parser = createParser(onParse);

  //     for await (const chunk of resp as any) {
  //       parser.feed(decoder.decode(chunk));
  //     }
  //   },
  // });

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === 'event') {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta?.content || '';
            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error
            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of resp.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  return stream;
};
