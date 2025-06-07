"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { FileUpload } from './file-upload';
import { VendorFormData, VendorFormErrors } from '@/types/vendor';

interface Step4Props {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onChange: (field: keyof VendorFormData, value: any) => void;
}

export function Step4Portfolio({ formData, errors, onChange }: Step4Props) {
  const bioCharacterCount = formData.bio.length;
  const maxBioLength = 800;

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Portfolio</h2>
        <p className="text-gray-600">Complete your profile with location and portfolio</p>
      </div>

      {/* Location */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Enter your city"
            className={`transition-all duration-300 ${
              errors.city ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#163300] focus:border-[#163300]'
            }`}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium text-gray-700">
            Country <span className="text-red-500">*</span>
          </Label>
          <Input
            id="country"
            type="text"
            value={formData.country}
            onChange={(e) => onChange('country', e.target.value)}
            placeholder="Enter your country"
            className={`transition-all duration-300 ${
              errors.country ? 'border-red-500 focus:ring-red-500' : 'focus:ring-[#163300] focus:border-[#163300]'
            }`}
          />
          {errors.country && (
            <p className="text-sm text-red-500 mt-1">{errors.country}</p>
          )}
        </div>
      </div>

      {/* Travel Options */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="charges_travel_fee"
            checked={formData.charges_travel_fee}
            onCheckedChange={(checked) => onChange('charges_travel_fee', checked as boolean)}
            className="data-[state=checked]:bg-[#163300] data-[state=checked]:border-[#163300]"
          />
          <Label htmlFor="charges_travel_fee" className="text-sm font-medium text-gray-700 cursor-pointer">
            Do you charge a travel fee outside this location?
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="available_worldwide"
            checked={formData.available_worldwide}
            onCheckedChange={(checked) => onChange('available_worldwide', checked as boolean)}
            className="data-[state=checked]:bg-[#163300] data-[state=checked]:border-[#163300]"
          />
          <Label htmlFor="available_worldwide" className="text-sm font-medium text-gray-700 cursor-pointer">
            Are you available worldwide?
          </Label>
        </div>
      </div>

      {/* Portfolio Images */}
      <FileUpload
        files={formData.portfolio_images}
        onChange={(files) => onChange('portfolio_images', files)}
        multiple={true}
        accept="image/*"
        maxFiles={10}
        label="Portfolio Images"
        description="Upload up to 10 images showcasing your best work"
      />

      {/* Cover Photo */}
      <FileUpload
        files={formData.cover_photo ? [formData.cover_photo] : []}
        onChange={(files) => onChange('cover_photo', files[0] || null)}
        multiple={false}
        accept="image/*"
        maxFiles={1}
        label="Cover Photo"
        description="Upload a cover photo for your profile"
      />

      {/* Intro Video */}
      <FileUpload
        files={formData.intro_video ? [formData.intro_video] : []}
        onChange={(files) => onChange('intro_video', files[0] || null)}
        multiple={false}
        accept="video/*"
        maxFiles={1}
        label="Intro Video (Optional)"
        description="Upload a short introduction video"
      />

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
          Bio
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => onChange('bio', e.target.value)}
          placeholder="Tell us about yourself and your photography style..."
          maxLength={maxBioLength}
          rows={6}
          className="focus:ring-[#163300] focus:border-[#163300] transition-all duration-300 resize-none"
        />
        <div className="flex justify-between items-center">
          <span className={`text-xs ${
            bioCharacterCount > maxBioLength * 0.9 ? 'text-red-500' : 'text-gray-500'
          }`}>
            {bioCharacterCount}/{maxBioLength} characters
          </span>
        </div>
      </div>
    </div>
  );
}