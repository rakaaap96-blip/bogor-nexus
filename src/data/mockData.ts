import type { DashboardData } from '../types';

export const mockData: DashboardData = {
  traffic: { congestion: 65, accidents: 3, publicTransport: 78 },
  environment: { airQuality: 42, temperature: 26, rainfall: 85 },
  utilities: { powerStatus: 98, waterSupply: 92, internetStatus: 95 },
  population: { density: 74, activity: 68 }
};