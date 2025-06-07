"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function AlreadyBookedSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#9FE870] relative overflow-hidden">
      {/* Decorative circular images */}
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full overflow-hidden opacity-30 hidden lg:block">
        <img
          src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-12 left-12 w-12 h-12 rounded-full overflow-hidden opacity-30 hidden lg:block">
        <img
          src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-20 left-1/4 w-10 h-10 rounded-full overflow-hidden opacity-20 hidden xl:block">
        <img
          src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=200"
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Badge 
          variant="secondary" 
          className="bg-white/90 text-[#163300] border-[#163300]/20 mb-6"
        >
          Already Booked?
        </Badge>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#163300] mb-6">
          Already booked your photographer?
          <span className="block">Add protection now</span>
        </h2>
        
        <p className="text-lg lg:text-xl text-[#163300]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
          We contact your photographer and handle the transition to protected 
          payments with us. No hassle, just peace of mind.
        </p>
        
        <Button 
          size="lg" 
          className="bg-[#163300] hover:bg-[#163300]/90 text-white px-10 py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          Switch to Protected Payment
        </Button>
      </div>
    </section>
  );
}