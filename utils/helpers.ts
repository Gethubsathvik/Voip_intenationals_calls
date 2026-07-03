// utils/helpers.ts
import { parsePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';

export function formatPhoneNumber(phone: string): string {
  try {
    const parsed = parsePhoneNumber(phone);
    return parsed?.formatInternational() || phone;
  } catch {
    return phone;
  }
}

export function isValidPhone(phone: string): boolean {
  return isValidPhoneNumber(phone);
}

export function getCountryFromPhone(phone: string): string {
  try {
    const parsed = parsePhoneNumber(phone);
    return parsed?.country || 'US';
  } catch {
    return 'US';
  }
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}

export function calculateCreditsNeeded(durationSeconds: number, costPerMinute: number): number {
  const minutes = durationSeconds / 60;
  return Math.ceil(minutes * costPerMinute * 100) / 100;
}

export function generateDeviceId(): string {
  return `${navigator.userAgent}-${Date.now()}`.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0).toString(36);
}

export function getDeviceInfo(): { os: string; browser: string } {
  const ua = navigator.userAgent;
  let os = 'Unknown';
  let browser = 'Unknown';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone')) os = 'iOS';

  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';

  return { os, browser };
}

export function maskEmail(email: string): string {
  const [name, domain] = email.split('@');
  const masked = name.substring(0, 2) + '*'.repeat(Math.max(0, name.length - 4)) + name.substring(name.length - 2);
  return `${masked}@${domain}`;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
