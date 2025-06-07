"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can I add protection to a photographer I've already booked?",
    answer: "Yes! We'll contact your photographer and handle the transition to protected payments. There's no hassle for you or your photographer - we simply become the payment processor with added protection."
  },
  {
    question: "What if my photographer refuses to work with VowGuard?",
    answer: "Most photographers are happy to work with us since it provides them protection too. If they refuse, we can help you find an equally qualified photographer from our verified network."
  },
  {
    question: "How quickly can you find a replacement photographer?",
    answer: "Our emergency network can typically provide a replacement within 24-48 hours, depending on your location and wedding date. We maintain relationships with photographers in all major cities."
  },
  {
    question: "What does 'payment protection' actually cover?",
    answer: "Full coverage includes: photographer no-shows, illness, equipment failure, car breakdowns, family emergencies, and any other reason they can't fulfill their contract. You get a full refund or replacement photographer."
  },
  {
    question: "Is there an additional cost for adding protection?",
    answer: "There's a small protection fee (typically 3-5% of the total cost) that provides comprehensive coverage. This is far less than the risk of losing your entire photography investment."
  },
  {
    question: "How do I know the replacement photographer will be good?",
    answer: "All photographers in our network are pre-vetted with verified portfolios, references, and show-up scores. Many couples tell us their replacement photographer exceeded expectations."
  }
];

export function FAQSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to know
          </h2>
          <p className="text-xl text-gray-600">
            About VowGuard protection and how it works
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-[#163300] transition-colors duration-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pt-2 pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}