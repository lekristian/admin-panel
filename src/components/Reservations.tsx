import React, { useState } from 'react';
import { Calendar, Clock, Package, User, Phone, Mail, Plus } from 'lucide-react';
import { format, addDays, parseISO } from 'date-fns';
import type { Service } from '../types';
import { Card, CardHeader, CardContent, Button, Input, Select, Badge } from './ui';

interface Reservation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const initialReservations: Reservation[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '(555) 123-4567',
    serviceId: '1',
    date: '2025-03-20',
    time: '09:00',
    status: 'confirmed'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '(555) 987-6543',
    serviceId: '2',
    date: '2025-03-21',
    time: '14:30',
    status: 'pending'
  }
];

const services: Service[] = [
  { id: '1', name: 'Oil Change', description: '', duration: 60, price: 49.99 },
  { id: '2', name: 'Brake Service', description: '', duration: 120, price: 199.99 }
];

const ReservationForm = ({
  onSubmit,
  initialData = null,
  onCancel
}: {
  onSubmit: (reservation: Omit<Reservation, 'id'>) => void;
  initialData?: Reservation | null;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    customerName: initialData?.customerName || '',
    customerEmail: initialData?.customerEmail || '',
    customerPhone: initialData?.customerPhone || '',
    serviceId: initialData?.serviceId || '',
    date: initialData?.date || format(new Date(), 'yyyy-MM-dd'),
    time: initialData?.time || '09:00',
    status: initialData?.status || 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData as Omit<Reservation, 'id'>);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Customer Name"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          required
        />

        <Input
          label="Email"
          type="email"
          value={formData.customerEmail}
          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
          required
        />

        <Input
          label="Phone"
          type="tel"
          value={formData.customerPhone}
          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
          required
        />

        <Select
          label="Service"
          value={formData.serviceId}
          onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
          options={services.map(service => ({
            value: service.id,
            label: `${service.name} ($${service.price})`
          }))}
          required
        />

        <Input
          label="Date"
          type="date"
          value={formData.date}
          min={format(new Date(), 'yyyy-MM-dd')}
          max={format(addDays(new Date(), 30), 'yyyy-MM-dd')}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
        />

        <Input
          label="Time"
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
        />

        {initialData && (
          <Select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Reservation['status'] })}
            options={statusOptions}
          />
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={loading}
        >
          {initialData ? 'Update Reservation' : 'Create Reservation'}
        </Button>
      </div>
    </form>
  );
};

const StatusBadge = ({ status }: { status: Reservation['status'] }) => {
  const variants: Record<Reservation['status'], 'warning' | 'success' | 'info' | 'error'> = {
    pending: 'warning',
    confirmed: 'success',
    completed: 'info',
    cancelled: 'error'
  };

  return (
    <Badge variant={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const Reservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [showForm, setShowForm] = useState(false);
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

  const handleAddReservation = (reservationData: Omit<Reservation, 'id'>) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: Date.now().toString()
    };
    setReservations([...reservations, newReservation]);
    setShowForm(false);
  };

  const handleEditReservation = (reservationData: Omit<Reservation, 'id'>) => {
    if (editingReservation) {
      const updatedReservations = reservations.map(reservation =>
        reservation.id === editingReservation.id ? { ...reservationData, id: reservation.id } : reservation
      );
      setReservations(updatedReservations);
      setEditingReservation(null);
    }
  };

  const getServiceName = (serviceId: string) => {
    return services.find(service => service.id === serviceId)?.name || 'Unknown Service';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-500" />
          <h1 className="text-2xl font-bold">Reservations</h1>
        </div>
        <Button
          onClick={() => {
            setEditingReservation(null);
            setShowForm(true);
          }}
          variant="primary"
          icon={Plus}
        >
          New Reservation
        </Button>
      </div>

      {(showForm || editingReservation) && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {editingReservation ? 'Edit Reservation' : 'New Reservation'}
            </h2>
          </CardHeader>
          <CardContent>
            <ReservationForm
              onSubmit={editingReservation ? handleEditReservation : handleAddReservation}
              initialData={editingReservation}
              onCancel={() => {
                setShowForm(false);
                setEditingReservation(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reservation.customerName}</div>
                          <div className="text-sm text-gray-500">{reservation.customerEmail}</div>
                          <div className="text-sm text-gray-500">{reservation.customerPhone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getServiceName(reservation.serviceId)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(parseISO(reservation.date), 'MMM d, yyyy')}
                      </div>
                      <div className="text-sm text-gray-500">{reservation.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={reservation.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        onClick={() => setEditingReservation(reservation)}
                        variant="ghost"
                        size="sm"
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reservations;