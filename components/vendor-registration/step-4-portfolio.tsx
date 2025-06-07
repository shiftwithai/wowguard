"use client";

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MapPin, Loader2 } from 'lucide-react';
import { FileUpload } from './file-upload';
import { VendorFormData, VendorFormErrors } from '@/types/vendor';
import { getBrowserLocation } from '@/lib/geocoding';

interface Step4Props {
  formData: VendorFormData;
  errors: VendorFormErrors;
  onChange: (field: keyof VendorFormData, value: any) => void;
}

export function Step4Portfolio({ formData, errors, onChange }: Step4Props) {
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  
  const bioCharacterCount = formData.bio.length;
  const maxBioLength = 800;

  const handleGetCurrentLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      const location = await getBrowserLocation();
      if (location) {
        // Store the coordinates for later use
        onChange('latitude', location.latitude);
        onChange('longitude', location.longitude);
        
        // Optionally, you could use reverse geocoding here to fill city/country
        // For now, we'll just show a success message
        alert('Location captured successfully! Please still fill in your city and country.');
      } else {
        alert('Unable to get your location. Please enter your city and country manually.');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Error getting location. Please enter your city and country manually.');
    } finally {
      setIsGettingLocation(false);
    }
  };
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Location & Portfolio</h2>
        <p className="text-gray-600">Complete your profile with location and portfolio</p>
      </div>

      {/* Location */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Location Information</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGetCurrentLocation}
            disabled={isGettingLocation}
            className="flex items-center gap-2"
          >
            {isGettingLocation ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <MapPin className="w-4 h-4" />
            )}
            {isGettingLocation ? 'Getting Location...' : 'Use Current Location'}
          </Button>
        </div>
        
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