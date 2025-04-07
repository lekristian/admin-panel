import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Calendar, DollarSign, Clock } from 'lucide-react';

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
  return (
    <div className="p-6">
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
    </div>
  );
};

export default Dashboard;