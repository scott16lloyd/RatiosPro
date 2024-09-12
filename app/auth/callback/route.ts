import { NextResponse } from 'next/server';
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/supabaseServerClient';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/home';

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Determine the origin (ratiospro.com or localhost)
      const origin =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:3000'
          : process.env.NEXT_PUBLIC_SITE_URL || 'https://ratiospro.com'; // Fallback to hardcoded production URL if env var is missing

      // Redirect to '/home' by default, unless 'next' is provided
      return NextResponse.redirect(`${origin}${next}`);
    }

    // Handle error: redirect to auth error page
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/auth/auth-code-error`
    );
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
