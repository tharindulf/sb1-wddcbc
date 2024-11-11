import React from 'react';
import { Users } from 'lucide-react';

interface GuardianFormProps {
  guardian: {
    name: string;
    mobile: string;
    type: 'parent' | 'nanny';
  };
  onChange: (field: string, value: string) => void;
}

export function GuardianForm({ guardian, onChange }: GuardianFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
        <Users className="h-5 w-5" />
        <h3>Guardian Information</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Guardian Name
          </label>
          <input
            type="text"
            value={guardian.name}
            onChange={e => onChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter guardian's name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            value={guardian.mobile}
            onChange={e => onChange('mobile', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter mobile number"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Guardian Type
        </label>
        <select
          value={guardian.type}
          onChange={e => onChange('type', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="parent">Parent</option>
          <option value="nanny">Nanny</option>
        </select>
      </div>
    </div>
  );
}