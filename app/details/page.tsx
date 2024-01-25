import { Button } from '@/components/ui/button';
import { PriceHistory } from '@/components/ui/price-history';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DetailsPage() {
  return (
    <>
      <div className="w-full flex justify-start p-4">
        <Button size="icon" variant="secondary">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
      </div>
      <div className="h-screen flex justify-center">
        <PriceHistory />
      </div>
    </>
  );
}
