import { createHmac } from 'crypto';

/**
 * Calculate hash from serialized block
 */
export function hash(serialized: string): string {
  return createHmac('sha256', '').update(serialized).digest('hex');
}
