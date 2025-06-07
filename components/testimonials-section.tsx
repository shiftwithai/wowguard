"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    text: "Our photographer got COVID two days before the wedding. VowGuard found us an amazing replacement within hours.",
    author: "Sarah & Mike",
    location: "Portland, OR"
  },
  {
    text: "When our photographer's car broke down, VowGuard's emergency network saved our day. The backup photographer was incredible.",
    author: "Jessica & David",
    location: "Austin, TX"
  },
  {
    text: "Our original photographer ghosted us completely. VowGuard refunded everything and found us someone even better.",
    author: "Emily & James",
    location: "Seattle, WA"
  },
  {
    text: "Equipment failure during our ceremony could have ruined everything. VowGuard's backup photographer captured every moment.",
    author: "Rachel & Chris",
    location: "Denver, CO"
  }
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAFA]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Peace of Mind Stories
          </h2>
          <p className="text-xl text-gray-600">
            Real couples, real protection, real results
          </p>
        </div>
        
        <div className="relative">
          <Card className="bg-white shadow-lg border-0 min-h-[200px]">
            <CardContent className="p-8 text-center">
              <Quote className="w-12 h-12 text-[#9FE870] mx-auto mb-6" />
              <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                "{testimonials[currentIndex].text}"
              </blockquote>
              <div className="text-[#163300] font-semibold">
                {testimonials[currentIndex].author}
              </div>
              <div className="text-gray-500 text-sm">
                {testimonials[currentIndex].location}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-[#163300]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-10 h-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}