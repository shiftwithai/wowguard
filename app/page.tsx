"use client";

import { HeroSection } from '@/components/hero-section';
import { ProblemSolutionSection } from '@/components/problem-solution-section';
import { AlreadyBookedSection } from '@/components/already-booked-section';
import { WhyChooseSection } from '@/components/why-choose-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <HeroSection />
      <ProblemSolutionSection />
      <AlreadyBookedSection />
      <WhyChooseSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}