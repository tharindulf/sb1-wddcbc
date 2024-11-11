import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addKids } from '../api/api';
import { User, Clock, X, Plus } from 'lucide-react';

interface AddKidsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface KidFormData {
  name: string;
  age: string;
  duration: string;
}

interface FormData {
  guardianName: string;
  guardianMobile: string;
  guardianType: string;
  kids: KidFormData[];
}

export function AddKidsModal({ isOpen, onClose }: AddKidsModalProps) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<FormData>({
    guardianName: '',
    guardianMobile: '',
    guardianType: 'Parent',
    kids: [{ name: '', age: '', duration: '30' }]
  });

  const addKidsMutation = useMutation({
    mutationFn: async (data: {
      guardian: {
        name: string;
        mobile: string;
        type: 'Parent' | 'Nanny';
      };
      kids: {
        name: string;
        age: number;
        duration: number;
      }[];
    }) => {
      try {
        await addKids(data);
      } catch (error) {
        throw new Error('Failed to add kids');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeKids'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      onClose();
      setFormData({
        guardianName: '',
        guardianMobile: '',
        guardianType: 'Parent',
        kids: [{ name: '', age: '', duration: '30' }]
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const data = {
        guardian: {
          name: formData.guardianName.trim(),
          mobile: formData.guardianMobile.trim(),
          type: formData.guardianType as 'Parent' | 'Nanny'
        },
        kids: formData.kids.map(kid => ({
          name: kid.name.trim(),
          age: parseInt(kid.age) || 0,
          duration: parseInt(kid.duration)
        }))
      };

      addKidsMutation.mutate(data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const addNewKid = () => {
    setFormData(prev => ({
      ...prev,
      kids: [...prev.kids, { name: '', age: '', duration: '30' }]
    }));
  };

  const updateKidData = (index: number, field: keyof KidFormData, value: string) => {
    const newKids = [...formData.kids];
    newKids[index] = { ...newKids[index], [field]: value };
    setFormData(prev => ({ ...prev, kids: newKids }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-xl font-semibold">Add Kids</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <h3 className="text-lg font-medium">Guardian Information</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Guardian Name</label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={e => setFormData(prev => ({ ...prev, guardianName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={formData.guardianMobile}
                  onChange={e => setFormData(prev => ({ ...prev, guardianMobile: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Guardian Type</label>
              <select
                value={formData.guardianType}
                onChange={e => setFormData(prev => ({ ...prev, guardianType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
              >
                <option value="Parent">Parent</option>
                <option value="Nanny">Nanny</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <h3 className="text-lg font-medium">Kids Information</h3>
              </div>
              <button
                type="button"
                onClick={addNewKid}
                className="text-sage hover:text-sage/80 flex items-center gap-1"
              >
                <Plus className="h-4 w-4" />
                Add Kid
              </button>
            </div>

            {formData.kids.map((kid, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                <div>
                  <label className="block text-sm mb-1">Kid's Name</label>
                  <input
                    type="text"
                    value={kid.name}
                    onChange={e => updateKidData(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Age</label>
                  <input
                    type="number"
                    value={kid.age}
                    onChange={e => updateKidData(index, 'age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Duration</label>
                  <select
                    value={kid.duration}
                    onChange={e => updateKidData(index, 'duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-dark-green rounded-lg hover:bg-dark-green/90"
              disabled={addKidsMutation.isPending}
            >
              {addKidsMutation.isPending ? 'Adding...' : 'Add Kids'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}