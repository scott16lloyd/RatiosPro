import { openai } from '@ai-sdk/openai';
import { StreamingTextResponse, streamText } from 'ai';

export async function POST(ticker?: string) {
  console.log('Initiating chatbot request');

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    prompt: 'Give me details about the company with ticker symbol TSLA',
  });

  return new StreamingTextResponse(result.toAIStream());
}
