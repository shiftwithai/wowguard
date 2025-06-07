"use client";

import { HeroSection } from '@/components/hero-section';
import { ProblemSolutionSection } from '@/components/problem-solution-section';
import { AlreadyBookedSection } from '@/components/already-booked-section';
import { WhyChooseSection } from '@/components/why-choose-section';
import { HowItWorksSection } from '@/components/how-it-works-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Setup Banner */}
      <div className="bg-[#163300] text-white py-2 px-4 text-center">
        <p className="text-sm">
          🔧 Need to configure API keys? 
          <Link href="/setup" className="ml-2 underline hover:text-[#9FE870]">
            Go to Setup Page
          </Link>
        </p>
      </div>
      
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