import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FrequencyAsked = () => {
  return (
    <div className="frequency-asked p-sec">
      <div className="container m-auto max-w-4xl">
        <h2 className="text-xl sm:text-3xl md:text-4xl">Frequently Asked Questions</h2>
        {/* FAQS */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="p-4">
            <AccordionTrigger className="font-bold text-xl">What products do you offer?</AccordionTrigger>
            <AccordionContent>We offer a variety of fresh fruits and vegetables, as well as farming equipment for rent.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="p-4">
            <AccordionTrigger className="font-bold text-xl">How can I join the community?</AccordionTrigger>
            <AccordionContent>Simply visit our community page and sign up to start connecting with other farmers.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="p-4">
            <AccordionTrigger className="font-bold text-xl">What are the benefits of renting equipment?</AccordionTrigger>
            <AccordionContent>Renting equipment allows you to access the latest farming technology without the high upfront costs.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FrequencyAsked;
