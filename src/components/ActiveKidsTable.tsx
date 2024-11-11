import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getActiveKids, stopKidActivity } from '../api/api';
import { Search } from 'lucide-react';

interface ActiveKidsTableProps {
  onExtendTime: (kidId: string, name: string) => void;
}

export function ActiveKidsTable({ onExtendTime }: ActiveKidsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: activeKids = [] } = useQuery({
    queryKey: ['activeKids'],
    queryFn: getActiveKids,
    refetchInterval: 60000, // Refetch every minute
  });

  const stopActivityMutation = useMutation({
    mutationFn: stopKidActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeKids'] });
      queryClient.invalidateQueries({ queryKey: ['kidsHistory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });

  const filteredKids = activeKids.filter(kid =>
    kid.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-beige/20">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Left</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredKids.map((kid) => (
              <tr key={kid.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kid.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kid.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{kid.guardianName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kid.duration} mins</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{kid.timeLeft} mins</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button
                    onClick={() => onExtendTime(kid.id, kid.name)}
                    className="px-3 py-1 bg-soft-blue text-gray-700 rounded hover:bg-soft-blue/80 transition-colors"
                  >
                    Extend
                  </button>
                  <button
                    onClick={() => stopActivityMutation.mutate(kid.id)}
                    className="px-3 py-1 bg-pink text-gray-700 rounded hover:bg-pink/80 transition-colors"
                    disabled={stopActivityMutation.isPending}
                  >
                    Stop
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}