export interface GeocodeResult {
  latitude: number;
  longitude: number;
}

export async function geocodeAddress(city: string, country: string): Promise<GeocodeResult | null> {
  try {
    const query = encodeURIComponent(`${city}, ${country}`);
    const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY || 'demo_key';
    
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}