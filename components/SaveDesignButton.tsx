import React, { useState } from 'react';
import Button from './common/Button';
import SaveDesignModal from './SaveDesignModal';
import { apiService, Design } from '../services/apiService';

interface SaveDesignButtonProps {
  designData: any;
  currentDesignId?: string;
  onSaveSuccess?: (design: Design) => void;
  className?: string;
}

const SaveDesignButton: React.FC<SaveDesignButtonProps> = ({
  designData,
  currentDesignId,
  onSaveSuccess,
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (name: string, description: string, isOverwrite: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      let designToSave: Design;
      
      if (isOverwrite && currentDesignId) {
        // Overwrite existing design
        designToSave = {
          name,
          description,
          ...designData,
          _id: currentDesignId
        };
      } else {
        // Create new design (Save As)
        designToSave = {
          name,
          description,
          ...designData
        };
      }

      const savedDesign = await apiService.saveDesign(designToSave);
      
      setIsModalOpen(false);
      onSaveSuccess?.(savedDesign);
      
      // Show success message
      const message = isOverwrite 
        ? `Design "${name}" overwritten successfully!`
        : `Design "${name}" saved as new design!`;
      alert(message);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save design');
      console.error('Save design error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setError(null);
    setIsModalOpen(true);
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${className}`}
      >
        <span>💾</span>
        <span>Save to Database</span>
      </Button>

      {error && (
        <div className="mt-2 text-red-600 text-sm">
          {error}
        </div>
      )}

      <SaveDesignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        loading={loading}
        isUpdate={!!currentDesignId}
        currentName={currentDesignId ? 'Current Design' : ''}
        currentDescription={currentDesignId ? 'Updating existing design' : ''}
      />
    </>
  );
};

export default SaveDesignButton; 