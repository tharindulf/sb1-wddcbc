import type { KidData, DashboardStats, ReportData } from '../types';

const BASE_URL = '/api';

export async function getDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${BASE_URL}/stats`);
  if (!response.ok) throw new Error('Failed to fetch dashboard stats');
  return response.json();
}

export async function getActiveKids(): Promise<KidData[]> {
  const response = await fetch(`${BASE_URL}/kids/active`);
  if (!response.ok) throw new Error('Failed to fetch active kids');
  return response.json();
}

export async function getKidsHistory(): Promise<KidData[]> {
  const response = await fetch(`${BASE_URL}/kids/history`);
  if (!response.ok) throw new Error('Failed to fetch kids history');
  return response.json();
}

export async function addKids(data: {
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
}): Promise<void> {
  const response = await fetch(`${BASE_URL}/kids`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add kids');
}

export async function stopKidActivity(kidId: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/kids/${kidId}/stop`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to stop kid activity');
}

export async function extendKidTime(kidId: string, duration: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/kids/${kidId}/extend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ duration }),
  });
  if (!response.ok) throw new Error('Failed to extend kid time');
}

export async function getReports(
  startDate: string,
  endDate: string,
  ageGroup: string
): Promise<ReportData[]> {
  const params = new URLSearchParams({
    startDate,
    endDate,
    ageGroup,
  });
  const response = await fetch(`${BASE_URL}/reports?${params}`);
  if (!response.ok) throw new Error('Failed to fetch reports');
  return response.json();
}