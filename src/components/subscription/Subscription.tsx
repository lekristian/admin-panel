import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { useSubscriptionStore, plans } from '../../store/subscription';
import { useAuthStore } from '../../store/auth';

const Subscription = () => {
  const navigate = useNavigate();
  const { setPlan } = useSubscriptionStore();
  const user = useAuthStore((state) => state.user);

  const handleSubscribe = async (planId: string) => {
    try {
      // Initialize Stripe
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Set the selected plan
      setPlan(planId);

      // TODO: Create checkout session on the backend
      // For now, just redirect to dashboard
      navigate('/');
    } catch (error) {
      console.error('Subscription failed:', error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose your plan
        </h1>
        <p className="text-lg text-gray-600">
          Select the perfect plan for {user?.companyName || 'your auto service business'}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-sm font-medium">
                Popular
              </div>
            )}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
              <div className="mt-4 flex items-baseline text-gray-900">
                <span className="text-5xl font-extrabold tracking-tight">${plan.price}</span>
                <span className="ml-1 text-xl font-semibold">/{plan.interval}</span>
              </div>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`mt-8 w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                Subscribe to {plan.name}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-gray-600">
        <p>All plans include:</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center justify-center">
            <Star className="h-5 w-5 text-blue-500 mr-2" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center justify-center">
            <Star className="h-5 w-5 text-blue-500 mr-2" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center justify-center">
            <Star className="h-5 w-5 text-blue-500 mr-2" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center justify-center">
            <Star className="h-5 w-5 text-blue-500 mr-2" />
            <span>All core features</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;