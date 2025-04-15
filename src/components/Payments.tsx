import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardHeader, CardContent, Input, Button } from './ui';

interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
  apiKey?: string;
  webhookSecret?: string;
}

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: 'stripe',
    name: 'Stripe',
    enabled: true,
    apiKey: 'pk_test_...',
    webhookSecret: 'whsec_...'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    enabled: false,
    apiKey: '',
    webhookSecret: ''
  },
  {
    id: 'square',
    name: 'Square',
    enabled: false,
    apiKey: '',
    webhookSecret: ''
  }
];

const PaymentMethodForm = ({
  method,
  onSave
}: {
  method: PaymentMethod;
  onSave: (method: PaymentMethod) => void;
}) => {
  const [formData, setFormData] = useState(method);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h3 className="text-lg font-medium text-gray-900">{method.name}</h3>
        </div>
        <div className="flex items-center">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.enabled}
              onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {formData.enabled && (
        <div className="space-y-4 mt-4">
          <Input
            label="API Key"
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
          />

          <Input
            label="Webhook Secret"
            type="password"
            value={formData.webhookSecret}
            onChange={(e) => setFormData({ ...formData, webhookSecret: e.target.value })}
          />

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);

  const handleSaveMethod = (updatedMethod: PaymentMethod) => {
    setPaymentMethods(methods =>
      methods.map(method =>
        method.id === updatedMethod.id ? updatedMethod : method
      )
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
        <h1 className="text-2xl font-bold">Payment Settings</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Payment Methods</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <PaymentMethodForm method={method} onSave={handleSaveMethod} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;