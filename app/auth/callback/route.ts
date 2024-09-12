import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/supabaseServerClient';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Fallback to NEXT_PUBLIC_SITE_URL in production
      const origin =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : process.env.NEXT_PUBLIC_SITE_URL + '/home';

      return NextResponse.redirect(`${origin}${next}/home`);
    }

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/auth/auth-code-error`
    );
  }

  // // return the user to an error page with instructions
  // return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
