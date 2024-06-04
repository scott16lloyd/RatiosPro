import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI();

// Define query options
type QueryResult = {
  isLoading: boolean;
  error: Error | null;
  data: any;
};

export async function POST(request: Request) {
  const body = await request.json();
  const { ticker, companyRatios } = body;

  // Fetch chatbot response from openAI
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful financial assitant that receives json arrays of a companies financial ratios, you must highlight the key ratio results and make an details educated financial observation based on these ratios but do not recommend or not recommend the user to buy or sell the stock, just make an observation. Just response with the detailed observation do not repeat the financial ratio numbers.',
      },
      {
        role: 'user',
        content: `Can you give me advice on the following company financial ratio calculations: ${JSON.stringify(
          companyRatios[0]
        )}`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  // Return chatbot response
  return NextResponse.json({ content: completion.choices[0] }, { status: 200 });
}
