// app/dashboard/history/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { PhoneOff, Phone, Clock } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

interface Call {
  id: string;
  recipientNumber: string;
  recipientCountry: string;
  duration: number;
  creditsUsed: number;
  status: string;
  createdAt: string;
}

export default function HistoryPage() {
  const { user } = useAuth();
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        const response = await axios.get('/api/calls/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCalls(response.data.data.calls);
      } catch (error) {
        console.error('Failed to fetch call history:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCallHistory();
    }
  }, [token]);

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Link href="/login">
          <Button>Please sign in</Button>
        </Link>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="glass border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Call History</h1>
          <Link href="/dashboard">
            <Button variant="ghost">Back to Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* History Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading call history...</p>
          </div>
        ) : calls.length === 0 ? (
          <Card glass>
            <div className="text-center py-12 space-y-4">
              <Phone className="w-12 h-12 text-gray-500 mx-auto" />
              <p className="text-gray-400">No calls yet</p>
              <Link href="/dashboard">
                <Button>Make Your First Call</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="space-y-4">
            {calls.map((call) => (
              <Card key={call.id} glass hover>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      {call.status === 'COMPLETED' ? (
                        <Phone className="w-6 h-6 text-blue-400" />
                      ) : (
                        <PhoneOff className="w-6 h-6 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{call.recipientNumber}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{call.recipientCountry}</span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {formatDate(call.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-semibold text-white">
                      {formatDuration(call.duration)}
                    </p>
                    <p className="text-blue-400">-${call.creditsUsed.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
