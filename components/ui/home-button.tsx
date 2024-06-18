'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HomeButton() {
  return (
    <Link href="/">
      <Button className="text-3xl md:text-4xl lg:text-5xl font-bold text-start text-gradient px-2 lg:p-6">
        Ratios Pro
      </Button>
    </Link>
  );
}
