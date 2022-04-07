import { T_block } from '../../type/block';
import { hash } from './hash';
import { serialize } from './serialize';

/**
 * Convert a block to hash
 */
export function hash_block(block: T_block): string {
  return hash(serialize(block));
}
