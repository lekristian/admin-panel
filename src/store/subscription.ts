import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Plan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

interface SubscriptionState {
  currentPlan: string | null;
  setPlan: (planId: string) => void;
  clearPlan: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      currentPlan: null,
      setPlan: (planId: string) => set({ currentPlan: planId }),
      clearPlan: () => set({ currentPlan: null }),
    }),
    {
      name: 'subscription-storage',
    }
  )
);

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29,
    interval: 'month',
    features: [
      'Up to 100 reservations/month',
      'Basic analytics',
      'Email support',
      '2 staff accounts',
      'Basic customization'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 79,
    interval: 'month',
    features: [
      'Up to 500 reservations/month',
      'Advanced analytics',
      'Priority email & chat support',
      '5 staff accounts',
      'Advanced customization',
      'Custom fields',
      'API access'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    interval: 'month',
    features: [
      'Unlimited reservations',
      'Enterprise analytics',
      '24/7 phone support',
      'Unlimited staff accounts',
      'Full customization',
      'Custom fields',
      'API access',
      'Dedicated account manager',
      'Custom integrations'
    ]
  }
];