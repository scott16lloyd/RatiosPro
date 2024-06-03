import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

// Define query options
type QueryResult = {
  isLoading: boolean;
  error: Error | null;
  data: any;
};

export async function POST(ticker: string, companyRatios: QueryResult) {
  console.log('Initiating chatbot request');
  console.log(companyRatios);

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: `Can you give me advice on the following comapny financial ratio calculations: ${companyRatios}`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  console.log(completion.choices[0]);

  return NextResponse.json({ content: completion.choices[0] }, { status: 200 });
}
