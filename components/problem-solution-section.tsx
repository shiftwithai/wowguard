"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { AlertTriangle, Shield, Check } from 'lucide-react';

export function ProblemSolutionSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-red-100">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                4 out of 10 couples face photographer issues
              </h3>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-lg leading-relaxed">
                Ghosting, no-shows, car breakdowns, sudden illness, or equipment failures 
                can ruin your wedding memories forever.
              </p>
            </CardContent>
          </Card>

          {/* Solution Card */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-green-100">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#163300]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                100% payment protection
              </h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#163300] flex-shrink-0" />
                <span className="text-gray-700">Full refund guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#163300] flex-shrink-0" />
                <span className="text-gray-700">Emergency backup photographer network</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#163300] flex-shrink-0" />
                <span className="text-gray-700">24/7 dispute resolution support</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}