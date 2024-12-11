import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import faq from "../../assets/images/faq.jpeg";
const FAQ = () => {
  return (
    <section className="p-sec">
      <div className="container flex items-center gap-10 flex-wrap md:flex-nowrap">
        {/* Image Section */}
        <div className="w-full md:w-[50%] h-[300px] md:h-[600px] overflow-hidden">
          <Image src={faq} alt="FAQ" className="w-full h-full object-cover rounded-2xl" />
        </div>
        {/* FAQ Section */}
        <div className="frequency-asked p-sec w-full md:w-[50%]">
          <h2 className="text-xl sm:text-3xl md:text-4xl mb-6">Frequently Asked Questions</h2>
          {/* FAQS */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="p-4">
              <AccordionTrigger className="font-bold text-xl">How do I place an order?</AccordionTrigger>
              <AccordionContent>Simply browse our shop, add items to your cart, and proceed to checkout.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="p-4">
              <AccordionTrigger className="font-bold text-xl">Can I rent equipment?</AccordionTrigger>
              <AccordionContent>Yes, we offer a variety of farming equipment for rent. Check out our Equipment Rentals section.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="p-4">
              <AccordionTrigger className="font-bold text-xl">How do I support local farmers?</AccordionTrigger>
              <AccordionContent>By shopping with us, you are directly supporting local farmers. You can also join our community for more ways to help.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
