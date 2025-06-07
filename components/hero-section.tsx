"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            <Badge 
              variant="secondary" 
              className="bg-white/80 text-[#163300] border-[#163300]/20 hover:bg-white/90 transition-colors duration-300"
            >
              <Check className="w-4 h-4 mr-2" />
              Payment Protected
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Secure Your Dream
                <span className="block text-[#163300]">Wedding Photography</span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl">
                100% payment protection against photographer ghosting, 
                no-shows, and emergencies. Book with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#163300] hover:bg-[#163300]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Find Photographers
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#9FE870] text-[#163300] hover:bg-[#9FE870] hover:text-[#163300] px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                Secure Existing Booking
              </Button>
            </div>
          </div>
          
          {/* Right Image - 40% */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Couple at sunset beach wedding"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}