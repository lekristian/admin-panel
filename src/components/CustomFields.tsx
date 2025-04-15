import React, { useState } from 'react';
import { FormInput, Plus, Edit2, Trash2 } from 'lucide-react';
import type { CustomField } from '../types';
import { Card, CardHeader, CardContent, Button, Input, Select } from './ui';

const initialFields: CustomField[] = [
  {
    id: '1',
    label: 'Vehicle Make',
    type: 'text',
    required: true
  },
  {
    id: '2',
    label: 'Vehicle Model',
    type: 'text',
    required: true
  },
  {
    id: '3',
    label: 'Vehicle Year',
    type: 'number',
    required: true
  }
];

const FieldForm = ({
  onSubmit,
  initialData = null,
  onCancel
}: {
  onSubmit: (field: Omit<CustomField, 'id'>) => void;
  initialData?: CustomField | null;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    label: initialData?.label || '',
    type: initialData?.type || 'text',
    required: initialData?.required || false
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

  const fieldTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'date', label: 'Date' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Field Label"
        value={formData.label}
        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
        required
      />

      <Select
        label="Field Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as CustomField['type'] })}
        options={fieldTypes}
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={formData.required}
          onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="required" className="ml-2 block text-sm text-gray-700">
          Required field
        </label>
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
          {initialData ? 'Update Field' : 'Add Field'}
        </Button>
      </div>
    </form>
  );
};

const CustomFields = () => {
  const [fields, setFields] = useState<CustomField[]>(initialFields);
  const [showForm, setShowForm] = useState(false);
  const [editingField, setEditingField] = useState<CustomField | null>(null);

  const handleAddField = (fieldData: Omit<CustomField, 'id'>) => {
    const newField: CustomField = {
      ...fieldData,
      id: Date.now().toString()
    };
    setFields([...fields, newField]);
    setShowForm(false);
  };

  const handleEditField = (fieldData: Omit<CustomField, 'id'>) => {
    if (editingField) {
      const updatedFields = fields.map(field =>
        field.id === editingField.id ? { ...fieldData, id: field.id } : field
      );
      setFields(updatedFields);
      setEditingField(null);
    }
  };

  const handleDeleteField = (id: string) => {
    if (window.confirm('Are you sure you want to delete this field?')) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FormInput className="w-6 h-6 mr-2 text-blue-500" />
          <h1 className="text-2xl font-bold">Custom Fields</h1>
        </div>
        <Button
          onClick={() => {
            setEditingField(null);
            setShowForm(true);
          }}
          variant="primary"
          icon={Plus}
        >
          Add Field
        </Button>
      </div>

      {(showForm || editingField) && (
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {editingField ? 'Edit Custom Field' : 'Add New Custom Field'}
            </h2>
          </CardHeader>
          <CardContent>
            <FieldForm
              onSubmit={editingField ? handleEditField : handleAddField}
              initialData={editingField}
              onCancel={() => {
                setShowForm(false);
                setEditingField(null);
              }}
            />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <Card key={field.id}>
            <CardContent>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{field.label}</h3>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setEditingField(field)}
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                  />
                  <Button
                    onClick={() => handleDeleteField(field.id)}
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Type:</span>
                  <span className="capitalize">{field.type}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium mr-2">Required:</span>
                  <span>{field.required ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomFields;