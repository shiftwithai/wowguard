"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { VendorFormData, VendorFormErrors } from '@/types/vendor';

interface Step3Props {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onChange: (field: keyof VendorFormData, value: any) => void;
}

const culturalExperienceOptions = [
  { id: 'muslim', label: 'Muslim' },
  { id: 'indian', label: 'Indian' },
  { id: 'orthodox_jewish', label: 'Orthodox/Jewish' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'western', label: 'Western' },
  { id: 'other', label: 'Other' }
];

export function Step3Experience({ formData, errors, onChange }: Step3Props) {
  const handleCulturalExperienceChange = (experienceId: string, checked: boolean) => {
    const updatedExperience = checked
      ? [...formData.cultural_experience, experienceId]
      : formData.cultural_experience.filter(e => e !== experienceId);
    onChange('cultural_experience', updatedExperience);
    
    // Clear the "other" field if "other" is unchecked
    if (experienceId === 'other' && !checked) {
      onChange('cultural_experience_other', '');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience & Pricing</h2>
        <p className="text-gray-600">Share your experience and pricing information</p>
      </div>

      {/* Cultural Wedding Experience */}
      <div className="space-y-4">
        <Label className="text-lg font-semibold text-gray-900">Cultural Wedding Experience</Label>
        <div className="grid md:grid-cols-3 gap-4">
          {culturalExperienceOptions.map((experience) => (
            <div key={experience.id} className="flex items-center space-x-3">
              <Checkbox
                id={experience.id}
                checked={formData.cultural_experience.includes(experience.id)}
                onCheckedChange={(checked) => handleCulturalExperienceChange(experience.id, checked as boolean)}
                className="data-[state=checked]:bg-[#163300] data-[state=checked]:border-[#163300]"
              />
              <Label htmlFor={experience.id} className="text-sm font-medium text-gray-700 cursor-pointer">
                {experience.label}
              </Label>
            </div>
          ))}
        </div>
        
        {/* Other field */}
        {formData.cultural_experience.includes('other') && (
          <div className="mt-4">
            <Input
              type="text"
              value={formData.cultural_experience_other}
              onChange={(e) => onChange('cultural_experience_other', e.target.value)}
              placeholder="Please specify other cultural experience"
              className="focus:ring-[#163300] focus:border-[#163300] transition-all duration-300"
            />
          </div>
        )}
      </div>

      {/* Experience and Pricing */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="years_experience" className="text-sm font-medium text-gray-700">
            Years of Experience
          </Label>
          <Input
            id="years_experience"
            type="number"
            min="0"
            max="50"
            value={formData.years_experience || ''}
            onChange={(e) => onChange('years_experience', e.target.value ? parseInt(e.target.value) : null)}
            placeholder="e.g., 5"
            className="focus:ring-[#163300] focus:border-[#163300] transition-all duration-300"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="starting_price" className="text-sm font-medium text-gray-700">
            Starting Price (USD)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="starting_price"
              type="number"
              min="0"
              value={formData.starting_price || ''}
              onChange={(e) => onChange('starting_price', e.target.value ? parseInt(e.target.value) : null)}
              placeholder="1000"
              className="pl-8 focus:ring-[#163300] focus:border-[#163300] transition-all duration-300"
            />
          </div>
          {errors.starting_price && (
            <p className="text-sm text-red-500">{errors.starting_price}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="max_price" className="text-sm font-medium text-gray-700">
            Max Price (USD)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="max_price"
              type="number"
              min="0"
              value={formData.max_price || ''}
              onChange={(e) => onChange('max_price', e.target.value ? parseInt(e.target.value) : null)}
              placeholder="5000"
              className="pl-8 focus:ring-[#163300] focus:border-[#163300] transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}