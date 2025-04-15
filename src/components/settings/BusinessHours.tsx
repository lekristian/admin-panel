import React from 'react';
import { Card, CardHeader, CardContent, Input } from '../ui';

const BusinessHours = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Business Hours</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {days.map((day) => (
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
  );
};

export default BusinessHours;