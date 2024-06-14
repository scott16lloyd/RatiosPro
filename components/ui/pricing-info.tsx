import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function PricingInfo() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>How does auto-renewal work?</AccordionTrigger>
        <AccordionContent>
          Your subscription is automatically renewed at the end of each billing
          cycle. You don’t need to take any action unless you want to cancel.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Can I cancel my subscription anytime?
        </AccordionTrigger>
        <AccordionContent>
          Yes, you can cancel your subscription at any time. Just visit your
          account settings and follow the cancellation process.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What happens if I cancel during the billing cycle?
        </AccordionTrigger>
        <AccordionContent>
          If you cancel during the current billing cycle, you’ll continue to
          enjoy the subscription benefits until the start of the next billing
          cycle.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
