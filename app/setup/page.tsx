"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Check, AlertCircle, Key, Database, MapPin, Camera } from 'lucide-react';

interface ApiKeys {
  supabaseUrl: string;
  supabaseAnonKey: string;
  opencageApiKey: string;
}

interface ConnectionStatus {
  supabase: 'checking' | 'connected' | 'error' | 'not-configured';
  geocoding: 'checking' | 'connected' | 'error' | 'not-configured';
}

export default function SetupPage() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({
    supabaseUrl: '',
    supabaseAnonKey: '',
    opencageApiKey: ''
  });
  
  const [status, setStatus] = useState<ConnectionStatus>({
    supabase: 'not-configured',
    geocoding: 'not-configured'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Load existing keys on mount
  useEffect(() => {
    const savedKeys = localStorage.getItem('vowguard-api-keys');
    if (savedKeys) {
      try {
        const parsed = JSON.parse(savedKeys);
        setApiKeys(parsed);
        testConnections(parsed);
      } catch (error) {
        console.error('Error loading saved keys:', error);
      }
    }
  }, []);

  const testSupabaseConnection = async (url: string, key: string) => {
    if (!url || !key) return 'not-configured';
    
    try {
      const response = await fetch(`${url}/rest/v1/vendors?select=id&limit=1`, {
        headers: {
          'apikey': key,
          'Authorization': `Bearer ${key}`
        }
      });
      
      return response.ok ? 'connected' : 'error';
    } catch (error) {
      return 'error';
    }
  };

  const testGeocodingConnection = async (key: string) => {
    if (!key) return 'not-configured';
    
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=test&key=${key}&limit=1`
      );
      
      const data = await response.json();
      return response.ok && !data.error ? 'connected' : 'error';
    } catch (error) {
      return 'error';
    }
  };

  const testConnections = async (keys: ApiKeys) => {
    setStatus({
      supabase: 'checking',
      geocoding: 'checking'
    });

    const [supabaseStatus, geocodingStatus] = await Promise.all([
      testSupabaseConnection(keys.supabaseUrl, keys.supabaseAnonKey),
      testGeocodingConnection(keys.opencageApiKey)
    ]);

    setStatus({
      supabase: supabaseStatus,
      geocoding: geocodingStatus
    });
  };

  const handleInputChange = (field: keyof ApiKeys, value: string) => {
    setApiKeys(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      // Save to localStorage
      localStorage.setItem('vowguard-api-keys', JSON.stringify(apiKeys));
      
      // Test connections
      await testConnections(apiKeys);
      
      setSaveMessage('API keys saved successfully!');
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving API keys. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestConnections = () => {
    testConnections(apiKeys);
  };

  const getStatusIcon = (connectionStatus: ConnectionStatus[keyof ConnectionStatus]) => {
    switch (connectionStatus) {
      case 'connected':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'checking':
        return <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />;
      default:
        return <div className="w-4 h-4 bg-gray-300 rounded-full" />;
    }
  };

  const getStatusBadge = (connectionStatus: ConnectionStatus[keyof ConnectionStatus]) => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'checking':
        return <Badge variant="secondary">Checking...</Badge>;
      default:
        return <Badge variant="outline">Not Configured</Badge>;
    }
  };

  const allConnected = status.supabase === 'connected' && status.geocoding === 'connected';

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VowGuard Setup</h1>
          <p className="text-lg text-gray-600">Configure your API keys to get started</p>
        </div>

        {allConnected && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              All services are connected! Your VowGuard application is ready to use.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6">
          {/* Supabase Configuration */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Database className="w-6 h-6 text-[#163300]" />
                Supabase Configuration
                {getStatusBadge(status.supabase)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="supabase-url">Supabase URL</Label>
                <Input
                  id="supabase-url"
                  type="url"
                  placeholder="https://your-project.supabase.co"
                  value={apiKeys.supabaseUrl}
                  onChange={(e) => handleInputChange('supabaseUrl', e.target.value)}
                  className="focus:ring-[#163300] focus:border-[#163300]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={apiKeys.supabaseAnonKey}
                  onChange={(e) => handleInputChange('supabaseAnonKey', e.target.value)}
                  className="focus:ring-[#163300] focus:border-[#163300]"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Find these in your Supabase project dashboard under Settings → API</p>
              </div>
            </CardContent>
          </Card>

          {/* Geocoding Configuration */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-[#163300]" />
                Geocoding Service (OpenCage)
                {getStatusBadge(status.geocoding)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="opencage-key">OpenCage API Key</Label>
                <Input
                  id="opencage-key"
                  type="password"
                  placeholder="your-opencage-api-key"
                  value={apiKeys.opencageApiKey}
                  onChange={(e) => handleInputChange('opencageApiKey', e.target.value)}
                  className="focus:ring-[#163300] focus:border-[#163300]"
                />
              </div>
              <div className="text-sm text-gray-600">
                <p>Get a free API key at <a href="https://opencagedata.com" target="_blank" rel="noopener noreferrer" className="text-[#163300] hover:underline">opencagedata.com</a></p>
                <p>Free tier includes 2,500 requests per day</p>
              </div>
            </CardContent>
          </Card>

          {/* Connection Status */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Key className="w-6 h-6 text-[#163300]" />
                Connection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status.supabase)}
                    <span className="font-medium">Supabase Database</span>
                  </div>
                  {getStatusBadge(status.supabase)}
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(status.geocoding)}
                    <span className="font-medium">Geocoding Service</span>
                  </div>
                  {getStatusBadge(status.geocoding)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={handleTestConnections}
              variant="outline"
              className="flex-1"
              disabled={!apiKeys.supabaseUrl || !apiKeys.supabaseAnonKey}
            >
              Test Connections
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-[#163300] hover:bg-[#163300]/90"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Configuration'
              )}
            </Button>
          </div>

          {saveMessage && (
            <Alert className={saveMessage.includes('Error') ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <AlertDescription className={saveMessage.includes('Error') ? 'text-red-800' : 'text-green-800'}>
                {saveMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Next Steps */}
          {allConnected && (
            <Card className="shadow-lg border-0 bg-[#9FE870]/10 border-[#9FE870]/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Camera className="w-6 h-6 text-[#163300]" />
                  Ready to Go!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Your VowGuard application is now configured and ready to use. Here's what you can do next:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Visit the <a href="/vendor-registration" className="text-[#163300] hover:underline font-medium">vendor registration page</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Test the complete registration flow
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    Check your Supabase dashboard for new vendor entries
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}