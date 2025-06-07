export interface VendorFormData {
  // Step 1: Basic Information
  full_name: string;
  business_name: string;
  email: string;
  phone_number: string;

  // Step 2: Services & Style
  services: string[];
  main_style: string;
  special_services: string[];

  // Step 3: Experience & Pricing
  cultural_experience: string[];
  cultural_experience_other: string;
  years_experience: number | null;
  starting_price: number | null;
  max_price: number | null;

  // Step 4: Location & Portfolio
  city: string;
  country: string;
  charges_travel_fee: boolean;
  available_worldwide: boolean;
  portfolio_images: File[];
  cover_photo: File | null;
  intro_video: File | null;
  bio: string;
}

export interface VendorFormErrors {
  [key: string]: string;
}

export interface GeocodeResult {
  latitude: number;
  longitude: number;
}