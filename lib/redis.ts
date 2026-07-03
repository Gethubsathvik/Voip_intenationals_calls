// lib/redis.ts
import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const client = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 50, 500),
  },
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('Redis Client Connected'));

export const redis = client;

export async function initRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
}

export async function getFromCache(key: string): Promise<string | null> {
  try {
    return await client.get(key);
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setInCache(key: string, value: string, ttl: number = 3600) {
  try {
    await client.setEx(key, ttl, value);
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function deleteFromCache(key: string) {
  try {
    await client.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function incrementCounter(key: string, ttl: number = 3600): Promise<number> {
  try {
    const value = await client.incr(key);
    if (value === 1) {
      await client.expire(key, ttl);
    }
    return value;
  } catch (error) {
    console.error('Counter increment error:', error);
    return 0;
  }
}
