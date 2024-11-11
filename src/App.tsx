import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/Dashboard';
import { ActiveKidsTable } from './components/ActiveKidsTable';
import { HistoryTable } from './components/HistoryTable';
import { AddKidsModal } from './components/AddKidsModal';
import { ExtendTimeModal } from './components/ExtendTimeModal';
import { ReportsModal } from './components/ReportsModal';
import { FileText } from 'lucide-react';

const queryClient = new QueryClient();

export default function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [extendTimeData, setExtendTimeData] = useState<{ kidId: string; name: string } | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-cream">
        <header className="bg-beige text-gray-800 py-4 px-6 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold">Kids Activity Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsReportsModalOpen(true)}
              className="px-4 py-2 bg-sage text-gray-700 rounded-lg hover:bg-sage/80 transition-colors flex items-center gap-2"
            >
              <FileText className="h-5 w-5" />
              Reports
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-dark-green text-white rounded-lg hover:bg-dark-green/90 transition-colors"
            >
              Add Kids
            </button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Dashboard />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ActiveKidsTable 
                onExtendTime={(kidId, name) => setExtendTimeData({ kidId, name })}
              />
            </div>
            <div className="lg:col-span-1">
              <HistoryTable />
            </div>
          </div>
        </main>

        <AddKidsModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
        />

        <ExtendTimeModal
          isOpen={!!extendTimeData}
          onClose={() => setExtendTimeData(null)}
          kidId={extendTimeData?.kidId ?? ''}
          kidName={extendTimeData?.name ?? ''}
        />

        <ReportsModal
          isOpen={isReportsModalOpen}
          onClose={() => setIsReportsModalOpen(false)}
        />
      </div>
    </QueryClientProvider>
  );
}