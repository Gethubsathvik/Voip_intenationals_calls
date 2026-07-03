// types/index.ts
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  country: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Call {
  id: string;
  userId: string;
  recipientNumber: string;
  recipientCountry: string;
  duration: number;
  creditsUsed: number;
  status: CallStatus;
  startedAt?: Date;
  endedAt?: Date;
  createdAt: Date;
}

export enum CallStatus {
  INITIATED = 'INITIATED',
  RINGING = 'RINGING',
  CONNECTED = 'CONNECTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  MISSED = 'MISSED',
  REJECTED = 'REJECTED',
  ENDED = 'ENDED',
}

export interface Credits {
  id: string;
  userId: string;
  balance: number;
  lastDailyBonus?: Date;
  bonusAmount: number;
}

export interface AuthToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export interface CallMetrics {
  totalCalls: number;
  totalDuration: number;
  totalCost: number;
  averageCallDuration: number;
  monthlyTrend: Array<{ date: string; calls: number }>;
}

export interface UserDevice {
  id: string;
  deviceName: string;
  os: string;
  browser: string;
  lastUsed: Date;
  isTrusted: boolean;
}

export interface CountryInfo {
  code: string;
  name: string;
  flag: string;
  costPerMinute: number;
}
