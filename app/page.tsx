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
import priceHistoryScreenshot from '/public/price-history-ui.png';

export default function LandingPage() {
  const dummyContent = [
    {
      title: 'Ratios for all pubically traded companies',
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
    // {
    //   title: 'Ratio Breakdown',
    //   description: (
    //     <>
    //       <p>
    //         This tool takes you through the financial ratios of any publicly
    //         traded company, showing you the numbers that matter. You’ll see how
    //         ratios like earnings against stock prices or assets versus
    //         liabilities are calculated, with each step explained in
    //         straightforward terms. It’s your personal guide to understanding the
    //         financial health of companies without the jargon, making it perfect
    //         for both new learners and seasoned analysts.
    //       </p>
    //     </>
    //   ),
    //   image: ratioBreakdownScreenshot,
    // },
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

      image: priceHistoryScreenshot,
    },
    {
      title: 'Like your favorite stocks',
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
            <div className="flex flex-row gap-8">
              <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                  Sign Up
                </span>
              </Button>
              <Button className="w-32 h-12 flex items-center justify-center outline-none">
                <span className="text-white font-medium p-4 text-xl">
                  Login
                </span>
              </Button>
            </div>
            <Separator className="w-full" />
            <div className="flex flex-col w-full gap-8">
              <Link href="#">
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Pricing</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
            <div className="flex flex-col w-full gap-8">
              <Link href="#">
                <div className="flex flex-row w-full justify-between">
                  <span className="text-xl font-white">Contact</span>
                  <ChevronRight size={32} />
                </div>
              </Link>
            </div>
          </SheetContent>
          <div className="hidden md:flex flex-row gap-4 px-6">
            <Button className="relative inline-flex w-32 h-12 overflow-hidden p-[1px] outline-none">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl hover:bg-slate-900/90">
                Sign Up
              </span>
            </Button>
            <Button className="w-32 h-12 flex items-center justify-center outline-none">
              <span className="text-white font-medium p-4 text-xl">Login</span>
            </Button>
          </div>
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
      <div className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <Input
          className="w-72 md:w-96 text-lg xl:text-xl h-12"
          type="email"
          placeholder="Email"
        />
        <Button className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
            Join the Waitlist
          </span>
        </Button>
      </div>
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
                      height="241"
                      width="384"
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
      <div className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <Input
          className="w-72 md:w-96 text-lg xl:text-xl h-12"
          type="email"
          placeholder="Email"
        />
        <Button className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
            Join the Waitlist
          </span>
        </Button>
      </div>
    </div>
  );
}
