import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { extendKidTime } from '../api/api';

interface ExtendTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  kidId: string;
  kidName: string;
}

export function ExtendTimeModal({ isOpen, onClose, kidId, kidName }: ExtendTimeModalProps) {
  const queryClient = useQueryClient();
  const extendTimeMutation = useMutation({
    mutationFn: ({ kidId, duration }: { kidId: string; duration: number }) =>
      extendKidTime(kidId, duration),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeKids'] });
      onClose();
    },
  });

  const handleExtend = async (duration: number) => {
    try {
      await extendTimeMutation.mutateAsync({ kidId, duration });
    } catch (error) {
      console.error('Failed to extend time:', error);
      alert('Failed to extend time. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Extend Time</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-600 mb-4">
            Extend play time for <span className="font-medium">{kidName}</span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[15, 30, 45, 60].map((duration) => (
              <button
                key={duration}
                onClick={() => handleExtend(duration)}
                disabled={extendTimeMutation.isPending}
                className="btn btn-extend disabled:opacity-50"
              >
                {duration} minutes
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}