import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import { createLocalClient } from '@/utils/supabase/supabaseClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RatiosPro | Financial Ratio Calculator',
  description: 'A simple UI for calculating financial ratios.',
};

const supabase = createLocalClient();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log(error);
  }
  return (
    <ReactQueryClientProvider>
      <html lang="en">
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
