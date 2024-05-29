import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

export async function POST(res: Next, ticker?: string) {
  console.log('Initiating chatbot request');

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'Can you give me details about the stock TSLA?',
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);

  return NextResponse.json({ content: completion.choices[0].content });
}
