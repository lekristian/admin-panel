import React from 'react';
import { Upload } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { Card, CardHeader, CardContent, Button, Input } from '../ui';
import type { WhiteLabelConfig as WhiteLabelConfigType } from '../../types';

interface WhiteLabelConfigProps {
  config: WhiteLabelConfigType;
  setConfig: (config: WhiteLabelConfigType) => void;
  showColorPicker: boolean;
  setShowColorPicker: (show: boolean) => void;
}

const WhiteLabelConfig: React.FC<WhiteLabelConfigProps> = ({
  config,
  setConfig,
  showColorPicker,
  setShowColorPicker
}) => {
  return (
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
  );
};

export default WhiteLabelConfig;