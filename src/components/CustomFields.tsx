import React, { useState } from 'react';
import { FormInput, Plus, Edit2, Trash2 } from 'lucide-react';
import type { CustomField } from '../types';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Field Label</label>
        <input
          type="text"
          value={formData.label}
          onChange={(e) => setFormData({ ...formData, label: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Field Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as CustomField['type'] })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="date">Date</option>
        </select>
      </div>
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
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          {initialData ? 'Update Field' : 'Add Field'}
        </button>
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
        <button
          onClick={() => {
            setEditingField(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Field
        </button>
      </div>

      {(showForm || editingField) && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">
            {editingField ? 'Edit Custom Field' : 'Add New Custom Field'}
          </h2>
          <FieldForm
            onSubmit={editingField ? handleEditField : handleAddField}
            initialData={editingField}
            onCancel={() => {
              setShowForm(false);
              setEditingField(null);
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fields.map((field) => (
          <div key={field.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{field.label}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingField(field)}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteField(field.id)}
                  className="text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomFields;