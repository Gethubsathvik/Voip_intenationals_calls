// utils/constants.ts
export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸', costPerMinute: 0.01 },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', costPerMinute: 0.015 },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', costPerMinute: 0.012 },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', costPerMinute: 0.02 },
  { code: 'IN', name: 'India', flag: '🇮🇳', costPerMinute: 0.005 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', costPerMinute: 0.018 },
  { code: 'FR', name: 'France', flag: '🇫🇷', costPerMinute: 0.018 },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', costPerMinute: 0.025 },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', costPerMinute: 0.015 },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', costPerMinute: 0.01 },
];

export const DEFAULT_DAILY_BONUS = 5.0;
export const MIN_CALL_DURATION = 1; // in seconds
export const MAX_CALL_DURATION = 3600; // 1 hour in seconds

export const RATE_LIMITS = {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
  CALLS_PER_HOUR: 50,
  API_REQUESTS_PER_MINUTE: 100,
};

export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Login successful',
    REGISTER: 'Registration successful',
    CALL_INITIATED: 'Call initiated',
    CALL_ENDED: 'Call ended',
    CREDIT_UPDATED: 'Credits updated',
  },
  ERROR: {
    INVALID_CREDENTIALS: 'Invalid email or password',
    EMAIL_EXISTS: 'Email already registered',
    USER_NOT_FOUND: 'User not found',
    INSUFFICIENT_CREDITS: 'Insufficient credits',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
    INVALID_PHONE: 'Invalid phone number',
    CALL_FAILED: 'Call failed',
    UNAUTHORIZED: 'Unauthorized access',
  },
};
