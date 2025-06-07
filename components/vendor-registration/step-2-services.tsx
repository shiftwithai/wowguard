"use client";

import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { VendorFormData, VendorFormErrors } from '@/types/vendor';

interface Step2Props {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onChange: (field: keyof VendorFormData, value: any) => void;
}

const serviceOptions = [
  { id: 'photography', label: 'Photography' },
  { id: 'videography', label: 'Videography' }
];

const styleOptions = [
  { id: 'cinematic', label: 'Cinematic' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'documentary', label: 'Documentary' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'moody', label: 'Moody' },
  { id: 'bright_airy', label: 'Bright & Airy' }
];

const specialServiceOptions = [
  { id: 'drone', label: 'Drone Photography/Videography' },
  { id: 'raw_footage', label: 'Raw Footage' },
  { id: 'same_day_edit', label: 'Same-Day Edit' },
  { id: 'second_shooter', label: 'Second Shooter' },
  { id: 'live_streaming', label: 'Live Streaming' }
];

export function Step2Services({ formData, errors, onChange }: Step2Props) {
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    const updatedServices = checked
      ? [...formData.services, serviceId]
      : formData.services.filter(s => s !== serviceId);
    onChange('services', updatedServices);
  };

  const handleSpecialServiceChange = (serviceId: string, checked: boolean) => {
    const updatedServices = checked
      ? [...formData.special_services, serviceId]
      : formData.special_services.filter(s => s !== serviceId);
    onChange('special_services', updatedServices);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Services & Style</h2>
        <p className="text-gray-600">Tell us about the services you offer</p>
      </div>

      {/* Services */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">
          Services Offered <span className="text-red-500">*</span>
        </Label>
        <div className="grid md:grid-cols-2 gap-4">
          {serviceOptions.map((service) => (
            <div key={service.id} className="flex items-center space-x-3">
              <Checkbox
                id={service.id}
                checked={formData.services.includes(service.id)}
                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                className="data-[state=checked]:bg-[#163300] data-[state=checked]:border-[#163300]"
              />
              <Label htmlFor={service.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                {service.label}
              </Label>
            </div>
          ))}
        </div>
        {errors.services && (
          <p className="text-sm text-red-500">{errors.services}</p>
        )}
      </div>

      {/* Main Style */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">Main Style</Label>
        <div className="grid md:grid-cols-3 gap-4">
          {styleOptions.map((style) => (
            <div key={style.id} className="flex items-center space-x-3">
              <input
                type="radio"
                id={style.id}
                name="main_style"
                value={style.id}
                checked={formData.main_style === style.id}
                onChange={(e) => onChange('main_style', e.target.value)}
                className="w-4 h-4 text-[#163300] border-gray-300 focus:ring-[#163300]"
              />
              <Label htmlFor={style.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                {style.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Special Services */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">Special Services</Label>
        <div className="grid md:grid-cols-2 gap-4">
          {specialServiceOptions.map((service) => (
            <div key={service.id} className="flex items-center space-x-3">
              <Checkbox
                id={service.id}
                checked={formData.special_services.includes(service.id)}
                onCheckedChange={(checked) => handleSpecialServiceChange(service.id, checked as boolean)}
                className="data-[state=checked]:bg-[#163300] data-[state=checked]:border-[#163300]"
              />
              <Label htmlFor={service.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                {service.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}