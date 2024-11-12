import { BaZiChart } from '../types';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheEntry<any>;
}

const cache: Cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedData<T>(key: string): T | null {
  const entry = cache[key];
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_DURATION) {
    delete cache[key];
    return null;
  }

  return entry.data;
}

export function setCachedData<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

export function clearCache(): void {
  Object.keys(cache).forEach(key => delete cache[key]);
}