import debug from 'debug';
import { T_block } from '../../type/block';
import { hash_block } from './hash_block';

const _ = debug('chain');

/**
 * Verify a block
 */
export function verify(block: T_block, hash: string): boolean {
  const r = hash_block(block);
  _(`Calculated hash: %O`, r);
  return r === hash;
}
