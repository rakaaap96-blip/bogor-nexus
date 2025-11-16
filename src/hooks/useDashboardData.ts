import { useState, useEffect } from 'react';
import type { DashboardData } from '../types';
import { mockData } from '../data/mockData';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};