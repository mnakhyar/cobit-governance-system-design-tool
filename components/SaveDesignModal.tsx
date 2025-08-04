import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';

interface SaveDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description: string, isOverwrite?: boolean) => void;
  loading?: boolean;
  currentName?: string;
  currentDescription?: string;
  isUpdate?: boolean;
}

const SaveDesignModal: React.FC<SaveDesignModalProps> = ({
  isOpen,
  onClose,
  onSave,
  loading = false,
  currentName = '',
  currentDescription = '',
  isUpdate = false
}) => {
  const [name, setName] = useState(currentName);
  const [description, setDescription] = useState(currentDescription);
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({});

  const handleSave = (isOverwrite: boolean = false) => {
    // Validation
    const newErrors: { name?: string; description?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }
    
    if (description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onSave(name.trim(), description.trim(), isOverwrite);
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {isUpdate ? '💾 Save Design' : '💾 Save Design'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="design-name" className="block text-sm font-medium text-gray-700 mb-2">
                Design Name *
              </label>
              <input
                id="design-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter design name..."
                maxLength={100}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {name.length}/100 characters
              </p>
            </div>

            <div>
              <label htmlFor="design-description" className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                id="design-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter design description..."
                rows={3}
                maxLength={500}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
              <p className="text-gray-500 text-xs mt-1">
                {description.length}/500 characters
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <Button
              onClick={handleClose}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg"
              disabled={loading}
            >
              Cancel
            </Button>
            {isUpdate && (
              <Button
                onClick={() => handleSave(false)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save As New'
                )}
              </Button>
            )}
            <Button
              onClick={() => handleSave(isUpdate)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isUpdate ? 'Overwriting...' : 'Saving...'}
                </div>
              ) : (
                isUpdate ? 'Overwrite Design' : 'Save Design'
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SaveDesignModal; 