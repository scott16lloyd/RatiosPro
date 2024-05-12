import { Database } from '@/types/supabase';

console.log('Hello from `database-webhook` function!');

type waitlisterRecord = Database['public']['Tables']['waitlisters']['Row'];

interface webhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: null | waitlisterRecord;
  schema: 'public';
  old_record: null | waitlisterRecord;
}

const RESEND_API_KEY = Deno.env.get('RESEND_WAITLISTER_EMAIL_KEY');

const handler = async (_request: Request): Promise<Response> => {
  const payload: webhookPayload = await _request.json();
  const user = payload.record;
  let data;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'RatiosPro <info@ratiospro.com>',
        to: user.email,
        subject: 'Thank you for joining RatiosPro waitlist!',
        html: `<div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="text-align: center; color: #2d3748;">Welcome to RatiosPro!</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #4a5568;">
          Thank you for joining our waitlist. We're excited to have you on board!
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #4a5568;">
          Stay tuned for updates.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #4a5568;">
          Best,<br/>
          The RatiosPro Team
        </p>
      </div>`,
      }),
    });
    if (!res.ok) {
      console.log('Failed to send email:', res.status, res.statusText);
    }

    data = await res.json();
    console.log('Email sent:', data);
  } catch (error) {
    console.error('Failed to send email:', error);
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

Deno.serve(handler);
