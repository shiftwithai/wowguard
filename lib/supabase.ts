import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      vendors: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          full_name: string;
          business_name: string | null;
          email: string;
          phone_number: string | null;
          services: string[];
          main_style: string | null;
          special_services: string[];
          cultural_experience: string[];
          cultural_experience_other: string | null;
          starting_price: number | null;
          max_price: number | null;
          years_experience: number | null;
          city: string | null;
          country: string | null;
          latitude: number | null;
          longitude: number | null;
          charges_travel_fee: boolean;
          available_worldwide: boolean;
          portfolio_images: string[];
          intro_video_url: string | null;
          bio: string | null;
          cover_photo_url: string | null;
          profile_status: string;
          show_up_score: number | null;
          is_verified: boolean;
          stripe_account_id: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name: string;
          business_name?: string | null;
          email: string;
          phone_number?: string | null;
          services?: string[];
          main_style?: string | null;
          special_services?: string[];
          cultural_experience?: string[];
          cultural_experience_other?: string | null;
          starting_price?: number | null;
          max_price?: number | null;
          years_experience?: number | null;
          city?: string | null;
          country?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          charges_travel_fee?: boolean;
          available_worldwide?: boolean;
          portfolio_images?: string[];
          intro_video_url?: string | null;
          bio?: string | null;
          cover_photo_url?: string | null;
          profile_status?: string;
          show_up_score?: number | null;
          is_verified?: boolean;
          stripe_account_id?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          full_name?: string;
          business_name?: string | null;
          email?: string;
          phone_number?: string | null;
          services?: string[];
          main_style?: string | null;
          special_services?: string[];
          cultural_experience?: string[];
          cultural_experience_other?: string | null;
          starting_price?: number | null;
          max_price?: number | null;
          years_experience?: number | null;
          city?: string | null;
          country?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          charges_travel_fee?: boolean;
          available_worldwide?: boolean;
          portfolio_images?: string[];
          intro_video_url?: string | null;
          bio?: string | null;
          cover_photo_url?: string | null;
          profile_status?: string;
          show_up_score?: number | null;
          is_verified?: boolean;
          stripe_account_id?: string | null;
        };
      };
    };
  };
};