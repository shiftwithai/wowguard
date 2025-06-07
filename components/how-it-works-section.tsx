"use client";

import { Search, Shield, Camera, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: "Browse Protected Photographers",
    description: "Find verified photographers with guaranteed protection"
  },
  {
    icon: Shield,
    title: "Book with Full Protection",
    description: "Your payment is protected against all potential issues"
  },
  {
    icon: Camera,
    title: "Photographer Delivers",
    description: "Enjoy your wedding knowing you're completely covered"
  }
];

export function HowItWorksSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, secure, and stress-free wedding photography booking
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative">
                <div className="w-20 h-20 bg-[#9FE870] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-[#163300]" />
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-8 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}