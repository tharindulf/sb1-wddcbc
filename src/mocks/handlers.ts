import { http, HttpResponse } from 'msw';
import type { KidData, DashboardStats, ReportData } from '../types';

const activeKids: KidData[] = [];
const kidsHistory: KidData[] = [];

export const handlers = [
  http.get('/api/stats', () => {
    return HttpResponse.json<DashboardStats>({
      activeKidsCount: activeKids.length,
      totalKidsToday: activeKids.length + kidsHistory.length,
      finishedKidsCount: kidsHistory.length
    });
  }),

  http.get('/api/kids/active', () => {
    return HttpResponse.json<KidData[]>(activeKids);
  }),

  http.get('/api/kids/history', () => {
    return HttpResponse.json<KidData[]>(kidsHistory);
  }),

  http.post('/api/kids', async ({ request }) => {
    const data = await request.json();
    const guardian = {
      id: crypto.randomUUID(),
      ...data.guardian
    };

    data.kids.forEach((kid: any) => {
      activeKids.push({
        id: crypto.randomUUID(),
        ...kid,
        guardianId: guardian.id,
        guardian,
        startTime: new Date().toISOString(),
        remainingTime: kid.duration * 60
      });
    });

    return new HttpResponse(null, { status: 201 });
  }),

  http.post('/api/kids/:kidId/stop', ({ params }) => {
    const { kidId } = params;
    const kidIndex = activeKids.findIndex(k => k.id === kidId);
    
    if (kidIndex !== -1) {
      const kid = activeKids[kidIndex];
      kidsHistory.push({
        ...kid,
        endTime: new Date().toISOString()
      });
      activeKids.splice(kidIndex, 1);
    }

    return new HttpResponse(null, { status: 200 });
  }),

  http.post('/api/kids/:kidId/extend', async ({ params, request }) => {
    const { kidId } = params;
    const { duration } = await request.json();
    const kid = activeKids.find(k => k.id === kidId);
    
    if (kid) {
      kid.duration += duration;
      kid.remainingTime += duration * 60;
    }

    return new HttpResponse(null, { status: 200 });
  }),

  http.get('/api/reports', ({ request }) => {
    const url = new URL(request.url);
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    const ageGroup = url.searchParams.get('ageGroup');

    const reports: ReportData[] = [{
      date: new Date().toISOString().split('T')[0],
      totalKids: kidsHistory.length,
      ageGroups: {
        '0-5': 2,
        '6-10': 3,
        '11-15': 1
      }
    }];

    return HttpResponse.json<ReportData[]>(reports);
  })
];