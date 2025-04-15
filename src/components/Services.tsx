import React, { useState } from 'react';
import { Package, Plus, Edit2, Trash2, Clock, DollarSign } from 'lucide-react';
import type { Service } from '../types';
import { Card, CardHeader, CardContent, Button, Input } from './ui';

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Oil Change',
    description: 'Complete oil change service with filter replacement',
    duration: 60,
    price: 49.99
  },
  {
    id: '2',
    name: 'Brake Service',
    description: 'Brake pad replacement and rotor inspection',
    duration: 120,
    price: 199.99
  },
  {
    id: '3',
    name: 'Tire Rotation',
    description: 'Rotate and balance all tires',
    duration: 45,
    price: 29.99
  }
];

const ServiceForm = ({ 
  onSubmit, 
  initialData = null,
  onCancel
}: { 
  onSubmit: (service: Omit<Service, 'id'>) => void;
  initialData?: Service | null;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    duration: initialData?.duration || 30,
    price: initialData?.price || 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Service Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Duration (minutes)"
          type="number"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          min="1"
          required
        />
        
        <Input
          label="Price ($)"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          min="0"
          step="0.01"
          required
        />
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
          {initialData ? 'Update Service' : 'Add Service'}
        </Button>
      </div>
    </form>
  );
};

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const handleAddService = (serviceData: Omit<Service, 'id'>) => {
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString()
    };
    setServices([...services, newService]);
    setShowForm(false);
  };

  const handleEditService = (serviceData: Omit<Service, 'id'>) => {
    if (editingService) {
      const updatedServices = services.map(service => 
        service.id === editingService.id ? { ...serviceData, id: service.id } : service
      );
      setServices(updatedServices);
      setEditingService(null);
    }
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Package className="w-6 h-6 mr-2 text-blue-500" />
          <h1 className="text-2xl font-bold">Services</h1>
        </div>
        <Button
          onClick={() => {
            setEditingService(null);
            setShowForm(true);
          }}
          variant="primary"
          icon={Plus}
        >
          Add Service
        </Button>
      </div>

      {(showForm || editingService) && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
          </CardHeader>
          <CardContent>
            <ServiceForm
              onSubmit={editingService ? handleEditService : handleAddService}
              initialData={editingService}
              onCancel={() => {
                setShowForm(false);
                setEditingService(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditingService(service)}
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                  />
                  <Button
                    onClick={() => handleDeleteService(service.id)}
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  />
                </div>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>${service.price.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Services;