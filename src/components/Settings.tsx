import React, { useState } from 'react';
import { Settings as SettingsIcon, Upload } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import type { WhiteLabelConfig } from '../types';
import { Card, CardHeader, CardContent, Button, Input } from './ui';

const initialConfig: WhiteLabelConfig = {
  logo: 'https://via.placeholder.com/200x60',
  primaryColor: '#3B82F6',
  companyName: 'Auto Service Pro',
  customFields: []
};

const Settings = () => {
  const [config, setConfig] = useState<WhiteLabelConfig>(initialConfig);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Save configuration
      console.log('Saving configuration:', config);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <SettingsIcon className="w-6 h-6 mr-2 text-blue-500" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">White Label Configuration</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Logo</label>
              <div className="flex items-center space-x-6">
                <div className="w-48 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={config.logo}
                    alt="Company logo"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    icon={Upload}
                  >
                    Upload New Logo
                  </Button>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended size: 200x60px. Max file size: 2MB.
                  </p>
                </div>
              </div>
            </div>

            <Input
              label="Company Name"
              value={config.companyName}
              onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
              <div className="relative">
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="w-10 h-10 rounded-lg border border-gray-300"
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <Input
                    value={config.primaryColor}
                    onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                    className="w-32"
                  />
                </div>
                {showColorPicker && (
                  <div className="absolute mt-2 z-10">
                    <HexColorPicker
                      color={config.primaryColor}
                      onChange={(color) => setConfig({ ...config, primaryColor: color })}
                    />
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Email Settings</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmation Email Template
                </label>
                <textarea
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your confirmation email template..."
                />
                <p className="mt-2 text-sm text-gray-500">
                  Available variables: {'{customer_name}'}, {'{service_name}'}, {'{date}'}, {'{time}'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Business Hours</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <div key={day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{day}</span>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="time"
                      className="w-32"
                      defaultValue="09:00"
                    />
                    <span>to</span>
                    <Input
                      type="time"
                      className="w-32"
                      defaultValue="17:00"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            loading={loading}
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;