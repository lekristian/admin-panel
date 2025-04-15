import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import type { WhiteLabelConfig as WhiteLabelConfigType } from '../../types';
import { Button } from '../ui';
import WhiteLabelConfig from './WhiteLabelConfig';
import EmailSettings from './EmailSettings';
import BusinessHours from './BusinessHours';

const initialConfig: WhiteLabelConfigType = {
  logo: 'https://via.placeholder.com/200x60',
  primaryColor: '#3B82F6',
  companyName: 'Auto Service Pro',
  customFields: []
};

const Settings = () => {
  const [config, setConfig] = useState<WhiteLabelConfigType>(initialConfig);
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
        <WhiteLabelConfig
          config={config}
          setConfig={setConfig}
          showColorPicker={showColorPicker}
          setShowColorPicker={setShowColorPicker}
        />
        <EmailSettings />
        <BusinessHours />

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