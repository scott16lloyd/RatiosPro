import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { createClient } from '@/utils/supabase/supabaseServerClient';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RatiosPro | Financial Ratio Calculator',
  description: 'A simple UI for calculating financial ratios.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  if (typeof window !== 'undefined') {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        // delete cookies on sign out
        const expires = new Date(0).toUTCString();
        document.cookie = `my-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`;
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `my-access-token=${
          session!.access_token
        }; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `my-refresh-token=${
          session!.refresh_token
        }; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      }
    });
  }
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <Head>
          <title>RatiosPro | Financial Ratio Calculator</title>
          <meta
            name="description"
            content="A simple UI for calculating financial ratios."
          />
          <meta
            property="og:title"
            content="RatiosPro | Financial Ratio Calculator"
          />
          <meta
            property="og:description"
            content="A simple UI for calculating financial ratios."
          />
          <meta property="og:image" content="/images/ratios-pro-desktop.png" />
          <meta property="og:url" content="https://ratiospro.com" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="og:type" content="website" />
        </Head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
