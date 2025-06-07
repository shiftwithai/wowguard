"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { VendorFormData, VendorFormErrors } from '@/types/vendor';

interface Step1Props {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onChange: (field: keyof VendorFormData, value: any) => void;
}

export function Step1BasicInfo({ formData, errors, onChange }: Step1Props) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="full_name" className="text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="full_name"
            type="text"
            value={formData.full_name}
            onChange={(e) => onChange('full_name', e.target.value)}
            placeholder="Enter your full name"
            className={`transition-all duration-300 ${
              errors.full_name ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#163300] focus:border-[#163300]'
            }`}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500 mt-1">{errors.full_name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_name" className="text-sm font-medium text-gray-700">
            Business Name
          </Label>
          <Input
            id="business_name"
            type="text"
            value={formData.business_name}
            onChange={(e) => onChange('business_name', e.target.value)}
            placeholder="Enter your business name (optional)"
            className="focus:ring-[#163300] focus:border-[#163300] transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Enter your email address"
            className={`transition-all duration-300 ${
              errors.email ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#163300] focus:border-[#163300]'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phone_number"
            type="tel"
            value={formData.phone_number}
            onChange={(e) => onChange('phone_number', e.target.value)}
            placeholder="Enter your phone number (optional)"
            className="focus:ring-[#163300] focus:border-[#163300] transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}