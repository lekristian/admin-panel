import React, { useState } from 'react';
import { CreditCard, DollarSign, Settings } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
          <div>
            <label className="block text-sm font-medium text-gray-700">API Key</label>
            <input
              type="password"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Webhook Secret</label>
            <input
              type="password"
              value={formData.webhookSecret}
              onChange={(e) => setFormData({ ...formData, webhookSecret: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-6">Payment Methods</h2>
          <div className="space-y-6">
            {paymentMethods.map((method) => (
              <div key={method.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                <PaymentMethodForm method={method} onSave={handleSaveMethod} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;