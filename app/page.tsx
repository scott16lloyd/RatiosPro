import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { twMerge } from 'tailwind-merge';

export default function LandingPage() {
  const dummyContent = [
    {
      title: 'Lorem Ipsum Dolor Sit Amet',
      description: (
        <>
          <p>
            Sit duis est minim proident non nisi velit non consectetur. Esse
            adipisicing laboris consectetur enim ipsum reprehenderit eu deserunt
            Lorem ut aliqua anim do. Duis cupidatat qui irure cupidatat
            incididunt incididunt enim magna id est qui sunt fugiat. Laboris do
            duis pariatur fugiat Lorem aute sit ullamco. Qui deserunt non
            reprehenderit dolore nisi velit exercitation Lorem qui do enim
            culpa. Aliqua eiusmod in occaecat reprehenderit laborum nostrud
            fugiat voluptate do Lorem culpa officia sint labore. Tempor
            consectetur excepteur ut fugiat veniam commodo et labore dolore
            commodo pariatur.
          </p>
          <p>
            Dolor minim irure ut Lorem proident. Ipsum do pariatur est ad ad
            veniam in commodo id reprehenderit adipisicing. Proident duis
            exercitation ad quis ex cupidatat cupidatat occaecat adipisicing.
          </p>
          <p>
            Tempor quis dolor veniam quis dolor. Sit reprehenderit eiusmod
            reprehenderit deserunt amet laborum consequat adipisicing officia
            qui irure id sint adipisicing. Adipisicing fugiat aliqua nulla
            nostrud. Amet culpa officia aliquip deserunt veniam deserunt officia
            adipisicing aliquip proident officia sunt.
          </p>
        </>
      ),
      badge: 'React',
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Lorem Ipsum Dolor Sit Amet',
      description: (
        <>
          <p>
            Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
            deserunt cupidatat aute. Enim cillum dolor et nulla sunt
            exercitation non voluptate qui aliquip esse tempor. Ullamco ut sunt
            consectetur sint qui qui do do qui do. Labore laborum culpa magna
            reprehenderit ea velit id esse adipisicing deserunt amet dolore.
            Ipsum occaecat veniam commodo proident aliqua id ad deserunt dolor
            aliquip duis veniam sunt.
          </p>
          <p>
            In dolore veniam excepteur eu est et sunt velit. Ipsum sint esse
            veniam fugiat esse qui sint ad sunt reprehenderit do qui proident
            reprehenderit. Laborum exercitation aliqua reprehenderit ea sint
            cillum ut mollit.
          </p>
        </>
      ),
      badge: 'Changelog',
      image:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=3540&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: 'Lorem Ipsum Dolor Sit Amet',
      description: (
        <>
          <p>
            Ex irure dolore veniam ex velit non aute nisi labore ipsum occaecat
            deserunt cupidatat aute. Enim cillum dolor et nulla sunt
            exercitation non voluptate qui aliquip esse tempor. Ullamco ut sunt
            consectetur sint qui qui do do qui do. Labore laborum culpa magna
            reprehenderit ea velit id esse adipisicing deserunt amet dolore.
            Ipsum occaecat veniam commodo proident aliqua id ad deserunt dolor
            aliquip duis veniam sunt.
          </p>
        </>
      ),
      badge: 'Launch Week',
      image:
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=3506&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
          <span className="text-4xl lg:text-5xl xl:text-7xl font-bold text-center md:text-left tracking-wide xl:leading-tight">
            Empowering Investors with{' '}
            <span className="text-gradient tracking-wide xl:leading-tight">
              Essential Financial Ratios
            </span>
          </span>
          <span className="text-center font md:text-left lg:text-xl xl:text-3xl leading-relaxed">
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
      <div className="w-full flex flex-row justify-center items-center">
        <Button className="relative inline-flex w-max h-12 overflow-hidden p-[1px] outline-none md:self-center">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full rounded-md overflow-hidden cursor-pointer items-center justify-center bg-secondary p-4 font-medium text-white backdrop-blur-3xl text-xl xl:text-2xl hover:bg-slate-900/90">
            Join the Waitlist
          </span>
        </Button>
      </div>
      <div className="h-min w-full items-center">
        <TracingBeam className="px-6">
          <div className="max-w-2xl mx-auto antialiased pt-4 px-2 relative">
            {dummyContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-10">
                <h2 className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                  {item.badge}
                </h2>

                <p className={twMerge('text-xl mb-4')}>{item.title}</p>

                <div className="text-sm prose prose-sm dark:prose-invert">
                  {item?.image && (
                    <Image
                      src={item.image}
                      alt="blog thumbnail"
                      height="1000"
                      width="1000"
                      className="rounded-lg mb-10 object-cover"
                    />
                  )}
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
}
