// hooks/useCredits.ts
'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface CreditInfo {
  balance: number;
  lastDailyBonus?: Date;
  bonusAmount: number;
}

export function useCredits() {
  const [credits, setCredits] = useState<CreditInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const fetchCredits = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/credits', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCredits(response.data.data);
    } catch (err) {
      setError('Failed to fetch credits');
    } finally {
      setLoading(false);
    }
  };

  const claimDailyBonus = async () => {
    try {
      const response = await axios.post(
        '/api/credits/daily-bonus',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCredits(response.data.data);
      return response.data.data;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to claim bonus');
      throw err;
    }
  };

  useEffect(() => {
    if (token) {
      fetchCredits();
    }
  }, [token]);

  return { credits, loading, error, claimDailyBonus, refetch: fetchCredits };
}
