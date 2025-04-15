import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, DollarSign, Clock, Check, Star } from 'lucide-react';
import { useSubscriptionStore, plans } from '../store/subscription';
import { useSearchParams } from 'react-router-dom';

const data = [
  { name: 'Mon', reservations: 4 },
  { name: 'Tue', reservations: 3 },
  { name: 'Wed', reservations: 6 },
  { name: 'Thu', reservations: 8 },
  { name: 'Fri', reservations: 7 },
  { name: 'Sat', reservations: 9 },
  { name: 'Sun', reservations: 3 },
];

const StatCard = ({ icon: Icon, title, value, change }: { icon: any, title: string, value: string, change: string }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
      <div className="bg-blue-50 p-3 rounded-full">
        <Icon className="w-6 h-6 text-blue-500" />
      </div>
    </div>
    <p className="text-sm mt-4">
      <span className={`${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </span>
      {' '}vs last week
    </p>
  </div>
);

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'overview' | 'subscription'>(
    searchParams.get('tab') === 'subscription' ? 'subscription' : 'overview'
  );
  const { currentPlan, setPlan } = useSubscriptionStore();

  useEffect(() => {
    setSearchParams(activeTab === 'subscription' ? { tab: 'subscription' } : {});
  }, [activeTab, setSearchParams]);

  const handleSubscribe = async (planId: string) => {
    try {
      setPlan(planId);
    } catch (error) {
      console.error('Subscription change failed:', error);
    }
  };

  const getCurrentPlan = () => plans.find(plan => plan.id === currentPlan);

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'overview'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('subscription')}
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            activeTab === 'subscription'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Subscription
        </button>
      </div>

      {activeTab === 'overview' ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={Users} title="Total Customers" value="1,234" change="+5.3%" />
            <StatCard icon={Calendar} title="Reservations" value="156" change="+2.4%" />
            <StatCard icon={DollarSign} title="Revenue" value="$12,345" change="+8.1%" />
            <StatCard icon={Clock} title="Avg. Service Time" value="2.5h" change="-1.2%" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Weekly Reservations</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="reservations" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Current Plan</h2>
            {getCurrentPlan() && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold text-gray-900">{getCurrentPlan()?.name}</p>
                  <p className="text-sm text-gray-500">
                    ${getCurrentPlan()?.price}/{getCurrentPlan()?.interval}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                  Active
                </span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-lg shadow-sm overflow-hidden ${
                  plan.popular ? 'ring-2 ring-blue-500' : ''
                } ${currentPlan === plan.id ? 'ring-2 ring-green-500' : ''}`}
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
                    disabled={currentPlan === plan.id}
                    className={`mt-8 w-full py-3 px-4 rounded-md shadow-sm text-sm font-medium ${
                      currentPlan === plan.id
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : plan.popular
                        ? 'text-white bg-blue-600 hover:bg-blue-700'
                        : 'text-white bg-gray-800 hover:bg-gray-900'
                    }`}
                  >
                    {currentPlan === plan.id ? 'Current Plan' : `Switch to ${plan.name}`}
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
      )}
    </div>
  );
};

export default Dashboard;