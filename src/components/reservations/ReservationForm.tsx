import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import type { Service } from '../../types';
import { Button, Input, Select } from '../ui';
import type { Reservation } from './types';

interface ReservationFormProps {
  onSubmit: (reservation: Omit<Reservation, 'id'>) => void;
  initialData?: Reservation | null;
  onCancel: () => void;
}

const services: Service[] = [
  { id: '1', name: 'Oil Change', description: '', duration: 60, price: 49.99 },
  { id: '2', name: 'Brake Service', description: '', duration: 120, price: 199.99 }
];

const ReservationForm: React.FC<ReservationFormProps> = ({
  onSubmit,
  initialData = null,
  onCancel
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

export default ReservationForm;