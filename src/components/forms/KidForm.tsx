import React from 'react';
import { Baby, Plus, Minus } from 'lucide-react';

interface KidInput {
  name: string;
  age: string;
  duration: string;
}

interface KidFormProps {
  kids: KidInput[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof KidInput, value: string) => void;
}

export function KidForm({ kids, onAdd, onRemove, onChange }: KidFormProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-lg font-semibold text-gray-800">
          <Baby className="h-5 w-5" />
          <h3>Kids Information</h3>
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center space-x-1"
        >
          <Plus className="h-4 w-4" />
          <span>Add Kid</span>
        </button>
      </div>

      <div className="space-y-4">
        {kids.map((kid, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-gray-50 p-4 rounded-lg"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kid's Name
              </label>
              <input
                type="text"
                value={kid.name}
                onChange={(e) => onChange(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter kid's name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={kid.age}
                onChange={(e) => onChange(index, 'age', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Age"
                required
                min="1"
                max="15"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                value={kid.duration}
                onChange={(e) => onChange(index, 'duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
                <option value="90">90 minutes</option>
              </select>
            </div>
            {kids.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="h-10 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
              >
                <Minus className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}