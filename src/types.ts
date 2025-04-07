export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'phone' | 'date';
  required: boolean;
}

export interface WhiteLabelConfig {
  logo: string;
  primaryColor: string;
  companyName: string;
  customFields: CustomField[];
}

export interface PaymentGateway {
  id: string;
  name: string;
  enabled: boolean;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingPeriod: 'monthly' | 'yearly';
}