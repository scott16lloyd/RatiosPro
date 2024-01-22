import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function DetailsPage() {
  return (
    <div className="w-full flex justify-start p-4">
      <Button size="icon" variant="secondary">
        <ArrowLeft />
      </Button>
    </div>
  );
}
