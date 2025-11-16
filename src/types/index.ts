export interface DashboardData {
  traffic: {
    congestion: number;
    accidents: number;
    publicTransport: number;
  };
  environment: {
    airQuality: number;
    temperature: number;
    rainfall: number;
  };
  utilities: {
    powerStatus: number;
    waterSupply: number;
    internetStatus: number;
  };
  population: {
    density: number;
    activity: number;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
}