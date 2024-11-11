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
  type: 'parent' | 'nanny';
  visitCount: number;
}

export interface DashboardStats {
  activeKidsCount: number;
  totalKidsToday: number;
  finishedKidsCount: number;
}

export interface AddKidsRequest {
  guardian: {
    name: string;
    mobile: string;
    type: 'parent' | 'nanny';
  };
  kids: {
    name: string;
    age: number;
    duration: number;
  }[];
}