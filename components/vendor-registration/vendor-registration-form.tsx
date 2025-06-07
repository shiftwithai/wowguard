"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { ProgressIndicator } from './progress-indicator';
import { Step1BasicInfo } from './step-1-basic-info';
import { Step2Services } from './step-2-services';
import { Step3Experience } from './step-3-experience';
import { Step4Portfolio } from './step-4-portfolio';
import { VendorFormData, VendorFormErrors } from '@/types/vendor';
import { supabase } from '@/lib/supabase';
import { uploadFile, uploadMultipleFiles } from '@/lib/storage';

const initialFormData: VendorFormData = {
  full_name: '',
  business_name: '',
  email: '',
  phone_number: '',
  services: [],
  main_style: '',
  special_services: [],
  cultural_experience: [],
  cultural_experience_other: '',
  years_experience: null,
  starting_price: null,
  max_price: null,
  city: '',
  country: '',
  latitude: null,
  longitude: null,
  charges_travel_fee: false,
  available_worldwide: false,
  portfolio_images: [],
  cover_photo: null,
  intro_video: null,
  bio: ''
};

export function VendorRegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<VendorFormData>(initialFormData);
  const [errors, setErrors] = useState<VendorFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSteps = 4;

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem('vendorRegistrationDraft', JSON.stringify(formData));
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('vendorRegistrationDraft');
    if (draft) {
      try {
        const parsedDraft = JSON.parse(draft);
        setFormData({ ...initialFormData, ...parsedDraft });
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  const handleFieldChange = (field: keyof VendorFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: VendorFormErrors = {};

    switch (step) {
      case 1:
        if (!formData.full_name.trim()) {
          newErrors.full_name = 'Full name is required';
        }
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
        }
        break;

      case 2:
        if (formData.services.length === 0) {
          newErrors.services = 'Please select at least one service';
        }
        break;

      case 3:
        // No required fields in step 3
        break;

      case 4:
        if (!formData.city.trim()) {
          newErrors.city = 'City is required';
        }
        if (!formData.country.trim()) {
          newErrors.country = 'Country is required';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Check for duplicate email
      const { data: existingVendor } = await supabase
        .from('vendors')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (existingVendor) {
        setErrors({ email: 'This email is already registered' });
        setIsSubmitting(false);
        return;
      }

      // Upload files
      const portfolioUrls = await uploadMultipleFiles(formData.portfolio_images, 'portfolio');
      const coverPhotoUrl = formData.cover_photo ? await uploadFile(formData.cover_photo, 'covers') : null;
      const introVideoUrl = formData.intro_video ? await uploadFile(formData.intro_video, 'videos') : null;


      // Prepare data for insertion
      const vendorData = {
        full_name: formData.full_name,
        business_name: formData.business_name || null,
        email: formData.email,
        phone_number: formData.phone_number || null,
        services: formData.services,
        main_style: formData.main_style || null,
        special_services: formData.special_services,
        cultural_experience: formData.cultural_experience,
        cultural_experience_other: formData.cultural_experience_other || null,
        years_experience: formData.years_experience,
        starting_price: formData.starting_price,
        max_price: formData.max_price,
        city: formData.city,
        country: formData.country,
        latitude: formData.latitude,
        longitude: formData.longitude,
        charges_travel_fee: formData.charges_travel_fee,
        available_worldwide: formData.available_worldwide,
        portfolio_images: portfolioUrls,
        intro_video_url: introVideoUrl,
        bio: formData.bio || null,
        cover_photo_url: coverPhotoUrl,
        profile_status: 'pending',
        show_up_score: null,
        is_verified: false,
        stripe_account_id: null
      };

      const { error } = await supabase
        .from('vendors')
        .insert([vendorData]);

      if (error) {
        throw error;
      }

      // Clear draft
      localStorage.removeItem('vendorRegistrationDraft');
      setIsSuccess(true);

    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'An error occurred while submitting your registration. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-[#9FE870] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#163300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h1>
            <p className="text-lg text-gray-600 mb-6">
              Thanks! We'll review your profile and publish it shortly.
            </p>
            <p className="text-sm text-gray-500">
              You'll receive an email confirmation once your profile is approved and live on VowGuard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo formData={formData} errors={errors} onChange={handleFieldChange} />;
      case 2:
        return <Step2Services formData={formData} errors={errors} onChange={handleFieldChange} />;
      case 3:
        return <Step3Experience formData={formData} errors={errors} onChange={handleFieldChange} />;
      case 4:
        return <Step4Portfolio formData={formData} errors={errors} onChange={handleFieldChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join VowGuard</h1>
          <p className="text-lg text-gray-600">Register as a protected vendor</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-8">
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} />
            
            {renderStep()}

            {errors.submit && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{errors.submit}</p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#163300] hover:bg-[#163300]/90 flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-[#163300] hover:bg-[#163300]/90 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}