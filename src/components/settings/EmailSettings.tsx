import React from 'react';
import { Card, CardHeader, CardContent } from '../ui';

const EmailSettings = () => {
  return (
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
  );
};

export default EmailSettings;