import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReports } from '../api/api';
import { FileText, Download } from 'lucide-react';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReportsModal({ isOpen, onClose }: ReportsModalProps) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [ageGroup, setAgeGroup] = useState('');

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports', startDate, endDate, ageGroup],
    queryFn: () => getReports(startDate, endDate, ageGroup),
    enabled: !!(startDate && endDate),
  });

  const downloadCSV = () => {
    if (!reports.length) return;

    const headers = ['Name', 'Age', 'Guardian', 'Type', 'Start Time', 'End Time', 'Duration (mins)', 'Status'];
    const csvContent = [
      headers.join(','),
      ...reports.map(record => [
        record.name,
        record.age,
        record.guardianName,
        record.guardianType,
        new Date(record.startTime).toLocaleString(),
        record.endTime ? new Date(record.endTime).toLocaleString() : 'Active',
        record.duration,
        record.status
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `kids-activity-report-${startDate}-to-${endDate}.csv`;
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-sage" />
            <h2 className="text-xl font-semibold text-gray-900">Activity Reports</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            ×
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring focus:ring-sage focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring focus:ring-sage focus:ring-opacity-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Age Group</label>
              <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage focus:ring focus:ring-sage focus:ring-opacity-50"
              >
                <option value="">All Ages</option>
                <option value="0-3">0-3 years</option>
                <option value="4-7">4-7 years</option>
                <option value="8-12">8-12 years</option>
              </select>
            </div>
          </div>

          {reports.length > 0 && (
            <button
              onClick={downloadCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-sage text-white rounded-md hover:bg-sage/90 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download CSV</span>
            </button>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-beige/20">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guardian</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.guardianName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.guardianType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.duration} mins</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          record.status === 'Completed'
                            ? 'bg-sage/20 text-sage'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {reports.length === 0 && startDate && endDate && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No records found for the selected period
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}