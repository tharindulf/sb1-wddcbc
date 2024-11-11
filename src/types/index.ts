export interface Kid {
  id: string;
  name: string;
  age: number;
  duration: number;
  startTime: string;
  endTime?: string;
  guardianId: string;
}

export interface Guardian {
  id: string;
  name: string;
  mobile: string;
  type: 'Parent' | 'Nanny';
}

export interface KidData extends Kid {
  guardian: Guardian;
  remainingTime: number;
}

export interface DashboardStats {
  activeKidsCount: number;
  totalKidsToday: number;
  finishedKidsCount: number;
}

export interface ReportData {
  date: string;
  totalKids: number;
  ageGroups: {
    [key: string]: number;
  };
}