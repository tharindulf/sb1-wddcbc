import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '../api/api';
import { Users, Clock } from 'lucide-react';

export function Dashboard() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
    initialData: {
      activeKidsCount: 0,
      totalKidsToday: 0,
      finishedKidsCount: 0
    }
  });

  const cards = [
    {
      title: 'Active Kids',
      value: stats.activeKidsCount,
      icon: Users,
      color: 'bg-sage',
      textColor: 'text-dark-green'
    },
    {
      title: 'Total Kids Today',
      value: stats.totalKidsToday,
      icon: Clock,
      color: 'bg-peach',
      textColor: 'text-dark-green'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-xl p-6 shadow-sm transition-transform hover:scale-[1.02]`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-lg font-medium ${card.textColor}`}>{card.title}</p>
              <p className={`text-4xl font-bold mt-2 ${card.textColor}`}>{card.value}</p>
            </div>
            <card.icon className={`h-12 w-12 ${card.textColor} opacity-80`} />
          </div>
        </div>
      ))}
    </div>
  );
}