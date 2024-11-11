export interface KidData {
  id: string;
  name: string;
  age: number;
  guardianId: string;
  guardianName?: string;
  guardianType?: string;
  duration: number;
  startTime: string;
  endTime: string | null;
  timeLeft?: number;
}

export interface Guardian {
  id: string;
  name: string;
  mobile: string;
  type: 'Parent' | 'Nanny';
  lastVisit: string;
}

export interface DashboardStats {
  activeKidsCount: number;
  totalKidsToday: number;
  finishedKidsCount: number;
}

export interface ReportData {
  id: string;
  name: string;
  age: number;
  guardianName: string;
  guardianType: string;
  startTime: string;
  endTime: string | null;
  duration: number;
  status: 'Active' | 'Completed';
}