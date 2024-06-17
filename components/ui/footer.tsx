import Link from 'next/link';
import { JSX, SVGProps } from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 dark:bg-background w-full">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="flex items-center gap-2">
          <RPIcon className="h-6 w-6" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Ratios Pro
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
          <Link
            className="hover:text-gray-900 dark:hover:text-gray-200"
            href="#"
          >
            Home
          </Link>
          <Link
            className="hover:text-gray-900 dark:hover:text-gray-200"
            href="#"
            onClick={() =>
              (window.location.href = 'mailto:scott16lloyd@gmail.com')
            }
          >
            Contact
          </Link>
          <Link
            className="hover:text-gray-900 dark:hover:text-gray-200"
            href="/pricing"
          >
            Pricing
          </Link>
        </nav>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © 2024 Ratios Pro. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function RPIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="50"
      height="17"
      viewBox="0 0 80 47"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.960227 47V0.454544H20.1875C23.6723 0.454544 26.6799 1.08333 29.2102 2.34091C31.7557 3.58333 33.7178 5.37121 35.0966 7.70454C36.4754 10.0227 37.1648 12.7727 37.1648 15.9545C37.1648 19.1818 36.4602 21.9242 35.0511 24.1818C33.642 26.4242 31.642 28.1364 29.0511 29.3182C26.4602 30.4848 23.392 31.0682 19.8466 31.0682H7.6875V22.2045H17.7557C19.4527 22.2045 20.8693 21.9848 22.0057 21.5455C23.1572 21.0909 24.0284 20.4091 24.6193 19.5C25.2102 18.5758 25.5057 17.3939 25.5057 15.9545C25.5057 14.5151 25.2102 13.3258 24.6193 12.3864C24.0284 11.4318 23.1572 10.7197 22.0057 10.25C20.8542 9.76515 19.4375 9.52273 17.7557 9.52273H12.2102V47H0.960227ZM27.1648 25.7273L38.7557 47H26.483L15.1193 25.7273H27.1648ZM43.3352 47V0.454544H62.5625C66.0473 0.454544 69.0549 1.13636 71.5852 2.5C74.1307 3.84848 76.0928 5.73485 77.4716 8.15909C78.8504 10.5682 79.5398 13.3712 79.5398 16.5682C79.5398 19.7803 78.8352 22.5909 77.4261 25C76.0322 27.3939 74.0398 29.25 71.4489 30.5682C68.858 31.8864 65.7822 32.5455 62.2216 32.5455H50.358V23.6818H60.1307C61.8277 23.6818 63.2443 23.3864 64.3807 22.7955C65.5322 22.2045 66.4034 21.3788 66.9943 20.3182C67.5852 19.2424 67.8807 17.9924 67.8807 16.5682C67.8807 15.1288 67.5852 13.8864 66.9943 12.8409C66.4034 11.7803 65.5322 10.9621 64.3807 10.3864C63.2292 9.81061 61.8125 9.52273 60.1307 9.52273H54.5852V47H43.3352Z"
        fill="white"
      />
    </svg>
  );
}
