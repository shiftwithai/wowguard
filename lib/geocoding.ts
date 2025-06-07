export interface GeocodeResult {
  latitude: number;
  longitude: number;
}

export async function getBrowserLocation(): Promise<GeocodeResult | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser');
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.warn('Error getting location:', error.message);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Fallback function that returns null - we'll rely on city/country text only
export async function geocodeAddress(city: string, country: string): Promise<GeocodeResult | null> {
  console.log(`Location entered: ${city}, ${country}`);
  // We'll store the city/country as text and not convert to coordinates
  // This removes the dependency on external geocoding services
  return null;
}