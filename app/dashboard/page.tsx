// app/dashboard/page.tsx
'use client';

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useCall } from '@/hooks/useCall';
import { useCredits } from '@/hooks/useCredits';
import { DialPad } from '@/components/DialPad';
import { CallInterface } from '@/components/CallInterface';
import { CreditCard } from '@/components/CreditCard';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { LogOut, Settings, History } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout, loading: authLoading } = useAuth();
  const { callState, initiateCall, endCall, toggleMute, toggleSpeaker, error: callError } = useCall();
  const { credits, claimDailyBonus, loading: creditsLoading } = useCredits();
  const [isMuted, setIsMuted] = useState(false);
  const [isCallLoading, setIsCallLoading] = useState(false);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <Link href="/login">
          <Button>Please sign in</Button>
        </Link>
      </div>
    );
  }

  const handleCall = async (phoneNumber: string) => {
    try {
      setIsCallLoading(true);
      await initiateCall(phoneNumber);
    } catch (err) {
      console.error('Call error:', err);
    } finally {
      setIsCallLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="glass border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
              {user.firstName?.charAt(0) || user.email.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link href="/dashboard/history">
              <Button variant="ghost" size="sm">
                <History className="w-4 h-4 mr-2" />
                History
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </Link>
            <Button onClick={logout} variant="ghost" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Dial Pad */}
          <div className="lg:col-span-2 space-y-8">
            <Card glass>
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Make a Call</h2>
                  <p className="text-gray-400">Enter the phone number and click call</p>
                </div>

                {callError && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {callError}
                  </div>
                )}

                {callState.status === 'idle' ? (
                  <DialPad onCall={handleCall} isLoading={isCallLoading} />
                ) : (
                  <CallInterface
                    status={callState.status}
                    duration={callState.duration}
                    recipientNumber="Unknown"
                    isMuted={isMuted}
                    onMuteToggle={(muted) => {
                      setIsMuted(muted);
                      toggleMute(muted);
                    }}
                    onEndCall={endCall}
                    onSpeakerToggle={toggleSpeaker}
                  />
                )}
              </div>
            </Card>
          </div>

          {/* Right Column - Credits & Info */}
          <div className="space-y-6">
            {credits && (
              <CreditCard
                balance={credits.balance}
                onClaimBonus={claimDailyBonus}
                bonusAvailable={!credits.lastDailyBonus}
                isLoading={creditsLoading}
              />
            )}

            <Card glass>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Account Status</span>
                    <span className="text-green-400 text-sm font-semibold">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Country</span>
                    <span className="text-white font-semibold">{user.country}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white font-semibold">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card glass>
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Supported Regions</h3>
                <p className="text-sm text-gray-400">Call to 150+ countries with affordable rates</p>
                <Button variant="secondary" className="w-full">
                  View All Countries
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
