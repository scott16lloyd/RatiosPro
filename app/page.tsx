'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { twMerge } from 'tailwind-merge';
import { Input } from '@/components/ui/input';
import ratioUiScreenshot from '/public/ratio-ui-screenshot.png';
import Footer from '@/components/ui/footer';
import { ReloadIcon } from '@radix-ui/react-icons';
import { addWaitlister } from '@/utils/supabase/dbFunctions';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlisted, setWaitlisted] = useState(false);

  const handleJoinWaitlist = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    // Clear the error message when the form is submitted
    setError(null);

    try {
      if (!email) {
        setError('Email is required');
        return;
      }
      if (!email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      } else {
        const response = await addWaitlister(email);
        if (response.error) {
          if (
            response.error.includes('DUPLICATE_ENTRY') ||
            response.error.includes(
              'duplicate key value violates unique constraint'
            )
          ) {
            setError('Sorry, you are already on the waitlist');
          } else {
            console.log(response.error);
          }
        } else {
          setWaitlisted(true);
        }
      }
    } catch (error: any) {
      console.log(error);
      setError('An error occurred, please try again later');
    } finally {
      setIsLoading(false);
    }
  };

  const dummyContent = [
    {
      title: 'Ratios for all publicly traded companies',
      description: (
        <>
          <p>
            Designed for both novice investors and seasoned financial analysts,
            this feature provides a comprehensive suite of key financial ratios
            for all publicly traded companies. With just a few taps, gain
            insights into a company’s profitability, liquidity, leverage, and
            efficiency. Our intuitive interface presents these crucial metrics
            in an easy-to-digest format, simplifying decision-making and
            empowering you to make informed investment choices. Whether you’re
            conducting a quick comparison or a deep dive into financial health,
            our app ensures that the vital data you need is always at your
            fingertips, presented in clear, concise, and actionable terms.
          </p>
        </>
      ),
      badge: 'Features',
      image: ratioUiScreenshot,
    },
    {
      title: 'Search public companies',
      description: (
        <>
          <p>
            Simply search for any publicly traded company by name or ticker
            symbol, and instantly access a wealth of information including
            current stock prices and historical performance charts. This
            intuitive search tool is designed to provide investors, analysts,
            and the curious with quick insights into the financial health and
            status of companies across global markets.
          </p>
        </>
      ),
      video: 'SearchBar UI Video.mp4',
    },
    {
      title: 'Calculation breakdown',
      description: (
        <>
          <p>
            Provides users with a clear breakdown of the calculations used in
            stock analysis, explaining how each figure is derived and its
            relevance in evaluating a company’s performance. This transparency
            helps users understand the financial metrics better, ensuring they
            can make well-informed investment decisions based on solid data
            analysis. It’s a valuable tool for demystifying complex financial
            concepts and empowering users with actionable insights.
          </p>
        </>
      ),
      video: 'Description UI Video.mp4',
    },
    {
      title: 'Full price history',
      description: (
        <>
          <p>
            Easily access the entire price history of any stock, from the very
            latest data to information that goes back five years. It provides a
            comprehensive view of how the stock has performed over time,
            offering insights into trends and patterns that can help inform your
            investment decisions. The data is updated live, ensuring you have
            the most current information at your fingertips.
          </p>
        </>
      ),

      video: 'Price History UI Video.mp4',
    },
    {
      title: 'AI-powered insights',
      description: (
        <>
          <p>
            Our AI-powered financial ratio insight tool harnesses the power of
            advanced analytics to evaluate stocks with precision. The AI
            compares these ratios against industry benchmarks and historical
            data to identify undervalued stocks or those with strong growth
            potential. Users receive actionable insights, enabling them to make
            informed investment decisions based on solid financial metrics. This
            tool is designed to simplify the complex world of stock analysis,
            providing a clear and concise overview that empowers both novice and
            experienced investors alike.
          </p>
        </>
      ),
      video: 'Chatbot UI Video.mp4',
    },
    {
      title: 'Like your favourite stocks',
      description: (
        <>
          <p>
            With a simple tap, add any stock to your favourites list and keep
            all your top picks in one convenient location. This tailored
            watchlist ensures you never miss a beat on the stocks that matter
            most to you. Monitor their performance, receive updates, and manage
            your investments with ease, all from a single, user-friendly
            dashboard designed to streamline your investment journey.
          </p>
        </>
      ),

      video: 'like-button-video.mp4',
    },
  ];
  return (
    <div className="h-screen w-full flex flex-col items-center md:items-start">
      <Sheet>
        <div className="w-full py-6 flex flex-row justify-between items-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gradient px-6">
            Ratios Pro
          </h1>
          <SheetTrigger asChild>
            <AlignJustify className="md:hidden mx-6" size={32} />
          </SheetTrigger>
          <SheetContent className="bg-background flex flex-col items-center gap-6">
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-start text-gradient">
                Ratios Pro
              </h1>
            </div>
            {/* Commented out until signup is available */}
            {/* <div className="flex flex-row gap-8">
              <Link href={'/sign-in'}>
                <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                    Sign Up
                  </span>
                </Button>
              </Link>
              <Link href={'/sign-in'}>
                <Button className="w-32 h-12 flex items-center justify-center outline-none">
                  <span className="text-white font-medium p-4 text-xl">
                    Login
                  </span>
                </Button>
              </Link>
            </div> */}
            <Separator className="w-full" />
            <div className="flex flex-col w-full gap-8">
              <Link href="/pricing">
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Pricing</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
            <div className="flex flex-col w-full gap-8">
              <Link
                href="#"
                onClick={() =>
                  (window.location.href = 'mailto:scott16lloyd@gmail.com')
                }
              >
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Contact</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
          </SheetContent>
          {/* Commented out until signup is available */}
          {/* <div className="hidden md:flex flex-row gap-4 px-6">
            <Link
              href={{
                pathname: '/sign-in',
                query: {
                  signup: true,
                },
              }}
            >
              <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                  Sign Up
                </span>
              </Button>
            </Link>
            <Link href={'/sign-in'}>
              <Button className="w-32 h-12 flex items-center justify-center outline-none">
                <span className="text-white font-medium p-4 text-xl">
                  Login
                </span>
              </Button>
            </Link>
          </div> */}
        </div>
      </Sheet>
      <div className="w-full flex flex-row items-center md:pt-4 justify-between pb-6 md:pb-10">
        <div className="flex flex-col px-6 gap-4 md:w-1/2">
          <span className="text-4xl lg:text-5xl xl:text-6xl font-bold text-center md:text-left tracking-wide xl:leading-tight">
            Empowering Investors with{' '}
            <span className="text-gradient tracking-wide xl:leading-tight">
              Essential Financial Ratios
            </span>
          </span>
          <span className="text-center font md:text-left lg:text-xl xl:text-xl leading-relaxed">
            Designed to assist in analyzing stocks by providing essential
            financial ratios. Users can effortlessly access key metrics for any
            publicly traded company.
          </span>
        </div>
        <div className="hidden md:flex w-1/2 max-w-[800px] aspect-4/3 h-full relative items-end">
          <Image
            src={'/landing-image.webp'}
            alt="Image of RatiosPro software running on iPhone"
            fill={true}
            unoptimized={true}
          />
        </div>
      </div>
      <form className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <span className="text-2xl md:text-3xl font-medium text-center">
          Become a waitlister today.
        </span>
        {!waitlisted ? (
          <>
            <Input
              className="w-72 md:w-96 text-lg xl:text-xl h-12"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <div className="error-message text-red-500">{error}</div>}
            {isLoading ? (
              <Button
                disabled
                className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="cursor-wait inline-flex h-full w-full rounded-md overflow-hidden items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-white" />
                  Please wait
                </span>
              </Button>
            ) : (
              <Button
                className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center"
                onClick={handleJoinWaitlist}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
                  Join the Waitlist
                </span>
              </Button>
            )}
          </>
        ) : (
          <p className="text-xl text-center px-8">
            🎉 Thank you for joining the waitlist, an email will be sent to you
            soon. 🎉
          </p>
        )}
      </form>

      <div className="h-min w-full items-center">
        <TracingBeam className="px-6 h-min">
          <div className="max-w-2xl mx-auto antialiased pt-4 px-2 relative">
            {dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                {item.badge != null && (
                  <h2 className="bg-black text-white rounded-full text-md md:text-lg w-fit px-4 py-1 mb-4">
                    {item.badge}
                  </h2>
                )}

                <p
                  className={twMerge('text-xl md:text-2xl font-semibold mb-4')}
                >
                  {item.title}
                </p>

                <div className="text-md md:text-lg prose prose-sm dark:prose-invert flex flex-col">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt="blog thumbnail"
                      height="1000"
                      width="1000"
                      className="rounded-lg mb-10 object-cover"
                    />
                  )}
                  {item?.video && (
                    <video
                      height="1000"
                      width="1000"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-lg mb-10 self-center"
                    >
                      <source src={item.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>

      <form className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <span className="text-2xl md:text-3xl font-medium text-center">
          Become a waitlister today.
        </span>
        {!waitlisted ? (
          <>
            <Input
              className="w-72 md:w-96 text-lg xl:text-xl h-12"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <div className="error-message text-red-500">{error}</div>}
            {isLoading ? (
              <Button
                disabled
                className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="cursor-wait inline-flex h-full w-full rounded-md overflow-hidden items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin text-white" />
                  Please wait
                </span>
              </Button>
            ) : (
              <Button
                className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center"
                onClick={handleJoinWaitlist}
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
                  Join the Waitlist
                </span>
              </Button>
            )}
          </>
        ) : (
          <p className="text-xl text-center px-8">
            🎉 Thank you for joining the waitlist, an email will be sent to you
            soon. 🎉
          </p>
        )}
      </form>
      <Footer />
    </div>
  );
}
