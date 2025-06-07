"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Shield, Headphones, Star } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Payment Protection Guarantee",
    description: "Full refund if photographer doesn't show or deliver as promised"
  },
  {
    icon: Headphones,
    title: "Dispute Resolution Support",
    description: "Dedicated support team available 24/7 for any issues or concerns"
  },
  {
    icon: Star,
    title: "Show-Up Score on Every Vendor",
    description: "Verified reliability ratings based on real wedding performance data"
  }
];

export function WhyChooseSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose VowGuard
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete protection and peace of mind for your wedding photography investment
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0"
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-[#9FE870]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#163300]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}